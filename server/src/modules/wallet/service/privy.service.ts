import { Injectable } from "@nestjs/common";
import { PrivyClient } from "@privy-io/server-auth";
import { LoggerService } from "../../common";

@Injectable()
export class PrivyAuthService {
    client: PrivyClient;

    public constructor(private readonly logger: LoggerService) {
        this.init();
    }

    private async init() {
        this.client = new PrivyClient(
            "insert_your_privy_app_id",
            "insert_your_privy_app_secret"
        );
    }

    async createWallet() {
        const walletInfo = await this.client.walletApi.create({
            chainType: "ethereum",
        });
        return walletInfo;
    }

    async signMsg(id: string) {
        const res = await this.client.walletApi.rpc({
            walletId: id,
            method: "personal_sign",
            params: {
                message: "Hello server wallets!",
            },
        });
        return res.data;
    }

    async sendFunds(id: string) {
        const res = await this.client.walletApi.rpc({
            // Your wallet ID (not address), returned during creation
            walletId: id,
            method: "eth_sendTransaction",
            caip2: "eip155:11155111",
            params: {
                transaction: {
                    // Be sure to replace this with your recipient address
                    to: "0xyourRecipientAddress",
                    value: 100000,
                    chainId: 11155111,
                },
            },
        });

        return res.data;
    }
}
