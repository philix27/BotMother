import { Body, Controller, Get, HttpStatus, Param, Post } from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { LoggerService } from "../common";
import { PlatformPipe } from "./platform.pipe";
import { PlatformData, SendMessageInput } from "./platform.dto";
import { PlatformService } from "./platform.service";

@Controller("platforms")
@ApiTags("platform")
@ApiBearerAuth()
export class PlatformsController {
    public constructor(
        private readonly logger: LoggerService,
        private readonly employeeService: PlatformService
    ) {}

    @Post("send-post")
    @ApiOperation({ summary: "Send Message" })
    @ApiResponse({ status: HttpStatus.OK, type: PlatformData })
    public async sendMessage(
        @Body(PlatformPipe) input: SendMessageInput
    ): Promise<string> {
        const res = await this.employeeService.sendPost(input);
        this.logger.info(`New response sent:` + res);
        return res;
    }

    @Get("get-posts")
    @ApiOperation({ summary: "Get Messages" })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: PlatformData })
    public async getMessages(@Param("id") userId: string): Promise<[]> {
        // const res = await this.employeeService.getMessages({ userId });
        this.logger.info(`Get messages`);
        return [];
    }
}
