import { Injectable } from "@nestjs/common";
import { LoggerService } from "../../common";
import { PrivyAuthService } from "./privy.service";
import { CreateWalletInput, TransferFundsInput } from "../model";

@Injectable()
export class WalletService {
    public constructor(
        private readonly logger: LoggerService,
        private readonly provider: PrivyAuthService
    ) {
        this.provider = new PrivyAuthService(this.logger);
    }

    public async create(props: CreateWalletInput): Promise<any> {
        this.provider.createWallet();
        return "create";
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
