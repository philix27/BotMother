import * as Joi from "joi";

import { JoiValidationPipe } from "../../common";
import { EmployeeData, SendMessageInput } from "../model";

export class EmployeePipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object<SendMessageInput>({
            // @todo When building input validation, also include regex
            // and other techniques for optimal security
            msg: Joi.string().required().max(EmployeeData.NAME_LENGTH),
            agent: Joi.string().required(),
        });
    }
}
