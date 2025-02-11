import { ApiProperty, PickType } from "@nestjs/swagger";
import { EmployeeData } from "./employee.data";

export type IAgentTypes =
    | "WALLET"
    | "TWITTER"
    | "DISCORD_BOT"
    | "IMAGE_GENERATOR"
    | "DAILY_MOTIVATION"
    | "JOB_SCOUT"
    | "COIN_WATCHER";
export class EmployeeInput extends PickType(EmployeeData, [
    "firstName",
    "lastName",
] as const) {}

export class SendMessageInput {
    @ApiProperty({ description: "Chat message" })
    public readonly msg: string;
    public readonly agent: IAgentTypes;

    public constructor(entity: { msg: string }) {
        this.msg = entity.msg;
    }
}
