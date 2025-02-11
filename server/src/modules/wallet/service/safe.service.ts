import { Injectable } from "@nestjs/common";
import { LoggerService } from "../../common";
import Safe from "@safe-global/protocol-kit";

@Injectable()
export class SafeService {
    private SIGNER_ADDRESS = "";
    private SIGNER_PRIVATE_KEY = "";
    private RPC_URL = "https://rpc.ankr.com/eth_sepolia";
    private safeClient: Safe;

    public constructor(private readonly logger: LoggerService) {
        this.init();
    }

    private async init() {
        this.safeClient = await Safe.init({
            provider: this.RPC_URL,
            signer: this.SIGNER_PRIVATE_KEY,
            safeAddress: this.SIGNER_ADDRESS,
        });
        this.logger.info("Initialized Safe Service");
    }

    async uniswap() {
        // TODO:
    }
    async cowswap() {
        // TODO:
    }
    async setSpendLimit() {
        // TODO:
    }
}
