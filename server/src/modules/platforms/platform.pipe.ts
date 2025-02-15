import * as Joi from "joi";

import { JoiValidationPipe } from "../common";
import { PlatformData, SendMessageInput } from "./platform.dto";

export class PlatformPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object<SendMessageInput>({
            // @todo When building input validation, also include regex
            // and other techniques for optimal security
            msg: Joi.string().required().max(PlatformData.NAME_LENGTH),
            platform: Joi.string().required(),
        });
    }
}
