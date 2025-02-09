import { ApiProperty, PickType } from "@nestjs/swagger";
import { EmployeeData } from "./employee.data";

export class EmployeeInput extends PickType(EmployeeData, [
    "firstName",
    "lastName",
] as const) {}

export class SendMessageInput {
    @ApiProperty({ description: "Chat message" })
    public readonly msg: string;
    public readonly agent: "WALLET" | "TWITTER";

    public constructor(entity: { msg: string }) {
        this.msg = entity.msg;
    }
}
