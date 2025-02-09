import { Module } from "@nestjs/common";

import { CommonModule } from "./common";
import { PassengerModule } from "./passenger/passenger.module";
import { EmployeeModule } from "./employee/employee.module";
import { WalletModule } from "./wallet/wallet.module";

@Module({
    imports: [CommonModule, PassengerModule, EmployeeModule, WalletModule],
})
export class ApplicationModule {}
