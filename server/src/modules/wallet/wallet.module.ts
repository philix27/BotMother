import { Module } from "@nestjs/common";

import { CommonModule } from "../common";
import { WalletController } from "./controller";
import { WalletService } from "./service";
import { PrivyAuthService } from "./service/privy.service";

@Module({
    imports: [CommonModule],
    providers: [WalletService, PrivyAuthService],
    controllers: [WalletController],
    exports: [],
})
export class WalletModule {}
