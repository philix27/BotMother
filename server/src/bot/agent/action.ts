import { erc721ActionProvider, pythActionProvider, walletActionProvider, cdpApiActionProvider, AgentKit } from "@coinbase/agentkit";

export async function addAction() {
        const erc721 = erc721ActionProvider();
    const pyth = pythActionProvider();
    const wallet = walletActionProvider(); // default action package: get native balance, transfer, sign message, get wallet details
    const cdp = cdpApiActionProvider({ // for providers that require API keys include them in their instantiation
      apiKeyName: process.env.CDP_API_KEY_NAME,
      apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    });

    const agentKit = await AgentKit.from({
    // !  walletProvider,
      actionProviders: [erc721, pyth, wallet, cdp],
    });
}