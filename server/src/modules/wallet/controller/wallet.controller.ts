import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { LoggerService } from "../../common";
import { CreateWalletPipe, EmployeePipe, TransferFundsPipe } from "../flow";
import {
    CreateWalletInput,
    SendMessageInput,
    TransferFundsInput,
} from "../model";
import { WalletService } from "../service";

@Controller("wallets")
@ApiTags("wallet")
@ApiBearerAuth()
export class WalletController {
    public constructor(
        private readonly logger: LoggerService,
        private readonly walletService: WalletService
    ) {}

    @Get("user-wallets")
    @ApiOperation({ summary: "Get user wallets" })
    @ApiResponse({ status: HttpStatus.OK, isArray: true })
    public async getAllUserWallets(): Promise<[]> {
        const res = await this.walletService.getAllUserWallets();
        this.logger.info(`Get user wallets`);

        return res;
    }

    @Post("create")
    @ApiOperation({ summary: "Create wallet" })
    @ApiResponse({ status: HttpStatus.CREATED })
    public async create(
        @Body(CreateWalletPipe) input: CreateWalletInput
    ): Promise<any> {
        const res = await this.walletService.create(input);
        this.logger.info(`New wallet created`);
        return res;
    }

    @Post("transfer")
    @ApiOperation({ summary: "Transfer funds" })
    @ApiResponse({ status: HttpStatus.OK })
    public async transferFunds(
        @Body(TransferFundsPipe) input: TransferFundsInput
    ): Promise<[]> {
        const res = await this.walletService.transferFunds(input);
        this.logger.info(`New wallet created`);
        return res;
    }

    @Post("sign")
    @ApiOperation({ summary: "Sign a message" })
    @ApiResponse({ status: HttpStatus.OK })
    public async signMsg(
        @Body(EmployeePipe) input: SendMessageInput
    ): Promise<[]> {
        const res = await this.walletService.signMsg();
        this.logger.info(`New wallet created`);
        return res;
    }
}
