import { Module } from "@nestjs/common";
import { CommonModule } from "../common";
import { PlatformsController } from "./platform.controller";
import { PlatformService } from "./platform.service";
import {
    InstagramService,
    LinkedinService,
    TwitterService,
    WhatsAppService,
} from "./service";

@Module({
    imports: [CommonModule],
    providers: [
        PlatformService,
        TwitterService,
        WhatsAppService,
        LinkedinService,
        InstagramService,
    ],
    controllers: [PlatformsController],
    exports: [],
})
export class EmployeeModule {}
