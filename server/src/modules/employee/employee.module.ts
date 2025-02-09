import { Module } from "@nestjs/common";

import { CommonModule } from "../common";
import { EmployeeController } from "./controller";
import { EmployeeService } from "./service";

@Module({
    imports: [CommonModule],
    providers: [EmployeeService],
    controllers: [EmployeeController],
    exports: [],
})
export class EmployeeModule {}
