import { ApiProperty, PickType } from "@nestjs/swagger";

export class PlatformData {
    public static readonly NAME_LENGTH = 50;

    @ApiProperty({ description: "Passenger unique ID", example: "36635263" })
    public readonly id: number;

    @ApiProperty({ description: "First name", example: "John" })
    public readonly firstName: string;

    @ApiProperty({ description: "Last name", example: "Doe" })
    public readonly lastName: string;
}

export type IPlatforms = "TWITTER" | "INSTAGRAM" | "LINKEDIN" | "LEMONADE";

export type IAgentTypes =
    | "WALLET"
    | "TWITTER"
    | "DISCORD_BOT"
    | "IMAGE_GENERATOR"
    | "DAILY_MOTIVATION"
    | "JOB_SCOUT"
    | "COIN_WATCHER";
export class EmployeeInput extends PickType(PlatformData, [
    "firstName",
    "lastName",
] as const) {}

export class SendMessageInput {
    @ApiProperty({ description: "Chat message" })
    public readonly msg: string;
    public readonly platform: IPlatforms;

    public constructor(entity: { msg: string }) {
        this.msg = entity.msg;
    }
}
