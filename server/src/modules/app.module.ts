import { Module } from "@nestjs/common";
import { CommonModule } from "./common";
import { EmployeeModule } from "./employee/employee.module";
import { WalletModule } from "./wallet/wallet.module";

@Module({
    imports: [CommonModule, EmployeeModule, WalletModule],
})
export class ApplicationModule {}
