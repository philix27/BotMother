import * as Joi from "joi";

import { JoiValidationPipe } from "../../common";
import {
    CreateWalletInput,
    SendMessageInput,
    TransferFundsInput,
} from "../model";

export class EmployeePipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object<SendMessageInput>({
            msg: Joi.string().required().max(50),
        });
    }
}
export class CreateWalletPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object<CreateWalletInput>({
            userId: Joi.string().required().max(50),
        });
    }
}

export class TransferFundsPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object<TransferFundsInput>({
            walletId: Joi.string().required(),
            value: Joi.number().required(),
            chainId: Joi.number().required(),
            to: Joi.string().required(),
        });
    }
}
