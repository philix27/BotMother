import { Injectable } from "@nestjs/common";
import { SendMessageInput } from "./platform.dto";
import { LoggerService, PrismaService } from "../common";
import {
    InstagramService,
    LemonadeService,
    LinkedinService,
    TwitterService,
} from "./service";

@Injectable()
export class PlatformService {
    private LINKEDIN: LinkedinService;
    private TWITTER: TwitterService;
    private LEMONADE: LemonadeService;
    private INSTAGRAM: InstagramService;
    private FACEBOOK: InstagramService;
    private prisma: PrismaService;

    public constructor(private readonly logger: LoggerService) {
        this.init();
    }

    public async sendPost(data: SendMessageInput): Promise<string> {
        this.logger.info("Employee Service: Send Message to agent");
        try {
            const res = this._getInstance(data);
            await res.sendPost(data.msg);
            return "Message sent";
        } catch (error) {
            return "Sorry, I could not process message";
        }
    }

    private init = async () => {
        const acct = await this.prisma.platformAccount.findFirst({
            where: {
                user_id: 1,
                platform: "TWITTER",
            },
        });

        if (acct?.username || acct?.email || acct?.password) {
            this.logger.error("Twitter username, email and password not found");
            throw new Error("Username, Email and Password needed");
        }

        this.TWITTER = new TwitterService({
            username: acct!.username!,
            email: acct!.email!,
            password: acct!.password!,
            logger: this.logger,
            secret_2fa: "",
        });

        this.LINKEDIN = new LinkedinService();
        this.LEMONADE = new LemonadeService();
        this.INSTAGRAM = new InstagramService();
        this.FACEBOOK = new InstagramService();
    };

    private _getInstance = (data: SendMessageInput) => {
        return {
            LINKEDIN: this.LINKEDIN,
            TWITTER: this.TWITTER,
            LEMONADE: this.LEMONADE,
            INSTAGRAM: this.INSTAGRAM,
            FACEBOOK: this.INSTAGRAM,
        }[data.platform];
    };
}
