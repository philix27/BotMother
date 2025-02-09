import { Injectable } from "@nestjs/common";
import { LoggerService, PrismaService } from "../../common";
import { PrivyAuthService } from "./privy.service";
import {
    CreateWalletData,
    CreateWalletInput,
    GetAllWalletData,
    GetWalletAddresses,
    TransferFundsInput,
} from "../model";

@Injectable()
export class WalletService {
    public constructor(
        private readonly logger: LoggerService,
        private readonly provider: PrivyAuthService,
        private readonly prismaService: PrismaService
    ) {
        this.provider = new PrivyAuthService(this.logger);
    }

    public async create(props: CreateWalletInput): Promise<CreateWalletData> {
        const user = await this.prismaService.user.findFirst({
            where: {
                wallet: props.userId,
            },
        });

        if (user?.id) {
            const res = await this._create(user);
            return res;
        } else {
            const user = await this.prismaService.user.create({
                data: {
                    wallet: props.userId,
                    email: props.userId,
                },
            });

            const res = await this._create(user);
            return res;
        }
    }

    private async _create(user: {
        id: number;
        email: string;
        firstName: string | null;
        lastName: string | null;
        wallet: string;
    }): Promise<CreateWalletData> {
        const res = await this.provider.createWallet();

        await this.prismaService.wallet.create({
            data: {
                user_id: user.id,
                walletId: res.id,
                address: res.address,
                chainType: res.chainType,
            },
        });
        this.logger.info("Wallet service - create user");
        return {
            ...res,
            walletId: res.id,
        };
    }

    public async getAllUserWallets(
        props: GetWalletAddresses
    ): Promise<GetAllWalletData[]> {
        const user = await this.prismaService.user.findFirst({
            where: {
                wallet: props.userId,
            },
        });
        const data = await this.prismaService.wallet.findMany({
            where: {
                user_id: user?.id,
            },
        });
        this.logger.info(
            "Wallet service - getAllUserWallets: Data:" + JSON.stringify(data)
        );
        this.logger.info(
            "Wallet service - getAllUserWallets: User:" + JSON.stringify(user)
        );
        return data;
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
