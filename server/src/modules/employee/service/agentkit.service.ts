import { HumanMessage } from "@langchain/core/messages";
import {
    AgentKit,
    CdpWalletProvider,
    wethActionProvider,
    walletActionProvider,
    erc20ActionProvider,
    pythActionProvider,
    cdpApiActionProvider,
    cdpWalletActionProvider,
    twitterActionProvider,
    ActionProvider,
    WalletProvider,
} from "@coinbase/agentkit";

import { getLangChainTools } from "@coinbase/agentkit-langchain";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import * as fs from "fs";
import { messageModifier as walletModifier, modifierTweet } from "./modifiers";

// Configure a file to persist the agent's CDP MPC Wallet Data
const WALLET_DATA_FILE = "wallet_data.txt";
// import { LoggerService } from "../../../common";

export class AgentKitService {
    agent: any;
    config: {
        configurable: {
            thread_id: string;
        };
    };

    constructor(agent: "TWITTER" | "WALLET") {
        console.info("Starting Agent...");
        if (agent === "WALLET") {
            this.initializeWalletAgent();
        } else {
            this.initializeWalletAgent();
            // this.initializeTwitter();
        }
    }

    private async _initialize(
        thread_id: string,
        messageModifier: string,
        providers: ActionProvider<WalletProvider>[]
    ) {
        try {
            // Initialize LLM
            const llm = new ChatOpenAI({
                model: "gpt-4o-mini",
                apiKey: process.env.OPENAI_API_KEY,
            });

            let walletDataStr: string | null = null;

            // Read existing wallet data if available
            if (fs.existsSync(WALLET_DATA_FILE)) {
                try {
                    console.log("Read existing wallet data if available");
                    walletDataStr = fs.readFileSync(WALLET_DATA_FILE, "utf8");
                } catch (error) {
                    console.error("Error reading wallet data:", error);
                    // Continue without wallet data
                }
            }

            // Configure CDP Wallet Provider
            console.log("Before CDP wallet init");
            const walletProvider = await CdpWalletProvider.configureWithWallet({
                apiKeyName: process.env.CDP_API_KEY_NAME,
                apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(
                    /\\n/g,
                    "\n"
                ),
                cdpWalletData: walletDataStr || undefined,
                networkId: process.env.NETWORK_ID || "base-sepolia",
            });

            console.log("After CDP wallet init");

            const agentkit = await AgentKit.from({
                walletProvider,
                actionProviders: providers,
            });

            const tools = await getLangChainTools(agentkit);

            // Store buffered conversation history in memory
            const memory = new MemorySaver();

            // Create React Agent using the LLM and CDP AgentKit tools
            const agent = createReactAgent({
                llm,
                tools,
                checkpointSaver: memory,
                messageModifier: messageModifier,
            });

            // Save wallet data
            const exportedWallet = await walletProvider.exportWallet();
            fs.writeFileSync(WALLET_DATA_FILE, JSON.stringify(exportedWallet));

            this.agent = agent;
            this.config = {
                configurable: {
                    thread_id,
                },
            };
        } catch (error) {
            console.error("Failed to initialize agent:", error.message);
            throw error; // Re-throw to be handled by caller
        }
    }

    async initializeWalletAgent() {
        this._initialize("Wallet Manager!", walletModifier, [
            wethActionProvider(),
            pythActionProvider(),
            walletActionProvider(),
            erc20ActionProvider(),
            cdpApiActionProvider({
                apiKeyName: process.env.CDP_API_KEY_NAME,
                apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(
                    /\\n/g,
                    "\n"
                ),
            }),
            cdpWalletActionProvider({
                apiKeyName: process.env.CDP_API_KEY_NAME,
                apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(
                    /\\n/g,
                    "\n"
                ),
            }),
        ]);
    }

    async initializeTwitter() {
        this._initialize("Twitter Agentkit Manager", modifierTweet, [
            twitterActionProvider(),
        ]);
    }

    async chat(userInput: string) {
        try {
            const stream = await this.agent.stream(
                { messages: [new HumanMessage(userInput)] },
                this.config
            );

            for await (const chunk of stream) {
                if ("agent" in chunk) {
                    return chunk.agent.messages[0].content;
                } else if ("tools" in chunk) {
                    return chunk.tools.messages[0].content;
                }
            }
        } catch (error) {
            console.error(error.message);
        }
    }
}
