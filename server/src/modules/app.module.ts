import { Module } from "@nestjs/common";

import { CommonModule } from "./common";
import { PassengerModule } from "./passenger/passenger.module";
import { EmployeeModule } from "./employee/employee.module";

@Module({
    imports: [CommonModule, PassengerModule, EmployeeModule],
})
export class ApplicationModule {}
