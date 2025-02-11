import { ApiProperty, PickType } from "@nestjs/swagger";
import { CreateWalletData } from "./wallet.data";

export class X_CreateWalletInput extends PickType(CreateWalletData, [
    "address",
    "walletId",
] as const) {}

export class SendMessageInput {
    @ApiProperty({ description: "Chat message" })
    public readonly msg: string;

    public constructor(entity: { msg: string }) {
        this.msg = entity.msg;
    }
}
export class CreateWalletInput {
    @ApiProperty({ description: "Chat message" })
    public readonly userId: string;

    @ApiProperty()
    public readonly name: string;

    public constructor(entity: { userId: string }) {
        this.userId = entity.userId;
    }
}
export class GetWalletAddresses {
    @ApiProperty({ description: "Chat message" })
    public readonly userId: string;

    public constructor(entity: { userId: string }) {
        this.userId = entity.userId;
    }
}
export class TransferFundsInput {
    @ApiProperty({ description: "id" })
    public readonly walletId: string;

    @ApiProperty({ description: "Send to wallet address" })
    public readonly to: string;

    @ApiProperty({ description: "Value of currency" })
    public readonly value: number;

    @ApiProperty({ description: "ChainId" })
    public readonly chainId: number;

    public constructor(entity: {
        walletId: string;
        to: string;
        value: number;
        chainId: number;
    }) {
        this.walletId = entity.walletId;
        this.to = entity.to;
        this.value = entity.value;
        this.chainId = entity.chainId;
    }
}
