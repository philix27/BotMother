import { ApiProperty } from "@nestjs/swagger";
import { Wallet } from "@prisma/client";

export class CreateWalletData {
    @ApiProperty()
    public readonly address: string;

    @ApiProperty()
    public readonly walletId: string;

    @ApiProperty()
    public readonly chainType: string;

    public constructor(entity: Wallet) {
        this.walletId = entity.walletId;
        this.chainType = entity.chainType;
        this.address = entity.address;
    }
}
