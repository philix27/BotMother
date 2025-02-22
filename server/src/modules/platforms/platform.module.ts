import { Module } from "@nestjs/common";
import { CommonModule } from "../common";
import { PlatformsController } from "./platform.controller";
import { PlatformService } from "./platform.service";
import {
    InstagramService,
    LemonadeService,
    LinkedinService,
    TwitterService,
    WhatsAppService,
} from "./service";
import { PlatformManagerService } from "./platform-accounts.service";

@Module({
    imports: [CommonModule],
    providers: [
        PlatformService,
        TwitterService,
        WhatsAppService,
        LinkedinService,
        InstagramService,
        LemonadeService,
        PlatformManagerService,
    ],
    controllers: [PlatformsController],
    exports: [],
})
export class EmployeeModule {}
