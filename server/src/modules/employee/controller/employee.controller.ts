import { Body, Controller, Get, HttpStatus, Param, Post } from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";

import { LoggerService } from "../../common";

import { EmployeePipe } from "../flow";
import { EmployeeData, SendMessageInput } from "../model";
import { EmployeeService } from "../service";

@Controller("employees")
@ApiTags("employee")
@ApiBearerAuth()
export class EmployeeController {
    public constructor(
        private readonly logger: LoggerService,
        private readonly employeeService: EmployeeService
    ) {}

    @Post("send-message")
    @ApiOperation({ summary: "Send Message" })
    @ApiResponse({ status: HttpStatus.OK, type: EmployeeData })
    public async sendMessage(
        @Body(EmployeePipe) input: SendMessageInput
    ): Promise<[]> {
        const res = await this.employeeService.sendMessage(input);
        this.logger.info(`New response sent:` + res);
        return res;
    }

    @Get("get-employees-messages")
    @ApiOperation({ summary: "Get Messages" })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: EmployeeData })
    public async getMessages(@Param("id") userId: string): Promise<[]> {
        const res = await this.employeeService.getMessages({ userId });
        this.logger.info(`Get messages`);
        return res;
    }

    @Get("get-employees")
    @ApiOperation({ summary: "Get employees" })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: EmployeeData })
    public async getEmployees(): Promise<[]> {
        const res = await this.employeeService.getEmployees();
        this.logger.info(`Find all employees agents`);

        return res;
    }
}
