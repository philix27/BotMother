import { Injectable } from "@nestjs/common";
import { SendMessageInput } from "../model";
import { AgentKitService } from "./agentkit.service";
import { LoggerService } from "../../common";

@Injectable()
export class EmployeeService {
    public constructor(
        private readonly walletAgent: AgentKitService,
        private readonly twitterAgent: AgentKitService,
        private readonly logger: LoggerService
    ) {
        this.walletAgent = new AgentKitService("WALLET");
        this.twitterAgent = new AgentKitService("TWITTER");
    }

    public async sendMessage(data: SendMessageInput): Promise<string> {
        this.logger.info("Employee Service: Send Message to agent");
        try {
            const res = await this._selectAndSendMessage(data);
            return res;
        } catch (error) {
            return "Sorry, I could not process message";
        }
    }

    public async getMessages(data: { userId: string }): Promise<[]> {
        return [];
    }
    public async getEmployees(): Promise<[]> {
        return [];
    }

    private async _selectAndSendMessage(
        data: SendMessageInput
    ): Promise<string> {
        switch (data.agent) {
            case "WALLET": {
                const res = await this.walletAgent.chat(data.msg);
                return res;
            }

            case "TWITTER": {
                const res = await this.twitterAgent.chat(data.msg);
                return res;
            }

            default: {
                const res = await this.walletAgent.chat(data.msg);
                return res;
            }
        }
    }
}
