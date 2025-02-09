import { Injectable } from "@nestjs/common";
import { LoggerService, PrismaService } from "../../common";
import { PrivyAuthService } from "./privy.service";
import { CreateWalletInput, TransferFundsInput } from "../model";

@Injectable()
export class WalletService {
    public constructor(
        private readonly logger: LoggerService,
        private readonly provider: PrivyAuthService,
        private readonly prismaService: PrismaService
    ) {
        this.provider = new PrivyAuthService(this.logger);
    }

    public async create(props: CreateWalletInput): Promise<any> {
        const res = await this.provider.createWallet();

        await this.prismaService.wallet.create({
            data: {
                user_id: 1,
                walletId: res.id,
                address: res.address,
                chainType: res.chainType,
            },
        });
        this.logger.info("Wallet service - create user");
        return res;
    }
    public async getAllUserWallets(): Promise<any> {
        return "getAllUserWallets";
    }
    public async transferFunds(props: TransferFundsInput): Promise<any> {
        this.provider.transferFunds(props);
        return "transferFunds";
    }
    public async signMsg(): Promise<any> {
        this.provider.signMsg({
            id: "",
            msg: "",
            method: "",
        });
        return "signMsg";
    }
}
