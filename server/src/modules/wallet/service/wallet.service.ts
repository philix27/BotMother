import { Injectable } from "@nestjs/common";
import { SendMessageInput } from "../model";
import { LoggerService } from "../../common";
import { PrivyAuthService } from "./privy.service";

@Injectable()
export class WalletService {
    public constructor(
        private readonly logger: LoggerService,
        private readonly provider: PrivyAuthService
    ) {
        this.provider = new PrivyAuthService(this.logger);
    }

    public async sendMessage(data: SendMessageInput): Promise<[]> {
        return [];
    }
    public async getMessages(data: { userId: string }): Promise<[]> {
        return [];
    }
    public async getEmployees(): Promise<[]> {
        return [];
    }
}
