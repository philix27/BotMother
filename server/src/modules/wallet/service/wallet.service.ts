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

    public async create(): Promise<any> {
        const res = this.provider.createWallet();
        return "create";
    }
    public async getAllUserWallets(): Promise<any> {
        return "getAllUserWallets";
    }
    public async transferFunds(): Promise<any> {
        const res = this.provider.transferFunds({
            id: "",
            to: "",
            value: 0,
            chainId: 0,
        });
        return "transferFunds";
    }
    public async signMsg(): Promise<any> {
        const res = this.provider.signMsg({
            id: "",
            msg: "",
            method: "",
        });
        return "signMsg";
    }
}
