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

    public async sendMessage(data: SendMessageInput): Promise<[]> {
        if (data.agent === "WALLET") {
            const res = await this.walletAgent.chat(data.msg);
            this.logger.info("Response: "+ res)
            return res;
        }

        const res = await this.twitterAgent.chat(data.msg);
        return res;
    }
    public async getMessages(data: { userId: string }): Promise<[]> {
        return [];
    }
    public async getEmployees(): Promise<[]> {
        return [];
    }
}
