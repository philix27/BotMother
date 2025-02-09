import { Module } from "@nestjs/common";

import { CommonModule } from "../common";
import { EmployeeController } from "./controller";
import { EmployeeService } from "./service";
import { AgentKitService } from "./service/agentkit.service";

@Module({
    imports: [CommonModule],
    providers: [EmployeeService, AgentKitService],
    controllers: [EmployeeController],
    exports: [],
})
export class EmployeeModule {}
