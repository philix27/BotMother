import { Injectable } from "@nestjs/common";
import { LoggerService, PrismaService } from "../common";
import { $Enums } from "@prisma/client";
import { Input } from "../../lib";

type ICreatePost = {
    platform: $Enums.Platforms;
    content: string;
    imageUrl?: string;
    scheduled_at?: Date;
    userId?: number;
};
type IUpdatePost = {
    platform: $Enums.Platforms;
    content: string;
    imageUrl?: string;
    scheduled_at?: Date | "INSTANT";
    userId?: number;
    postId?: number;
};
type IGetPosts = {
    platform: $Enums.Platforms;
    userId?: number;
};
type IGetOnePost = {
    platform: $Enums.Platforms;
    userId?: number;
    postId?: number;
};
type IDeletePost = {
    userId?: number;
    postId?: number;
};

@Injectable()
export class PlatformPostsService {
    private prisma: PrismaService;

    public constructor(private readonly logger: LoggerService) {}

    public async instantPost(payload: Input<ICreatePost>) {
        this.logger.info("Creating platform account ...");
        const p = payload.payload!;
        try {
            await this.prisma.posts.create({
                data: {
                    user_id: p.userId,
                    platform: p.platform,
                    content: p.content!,
                    image: p.imageUrl,
                    scheduled_at: "new Date.now()",
                    status: "COMPLETED",
                },
            });
        } catch (error: any) {
            this.logger.error(
                "Could not create platform account: " + error.message
            );
        }
    }
    public async schedulePost(payload: Input<ICreatePost>) {
        this.logger.info("Creating platform account ...");
        const p = payload.payload!;
        try {
            await this.prisma.platformAccount.create({
                data: {
                    user_id: p.userId,
                    platform: p.platform,
                    content: p.content!,
                    image: p.imageUrl,
                    scheduled_at: "new Date.now()",
                    status: "",
                },
            });
        } catch (error: any) {
            this.logger.error(
                "Could not create platform account: " + error.message
            );
        }
    }

    public async getAll(params: Input<IGetPosts>) {
        this.logger.info("Fetching platform accounts");
        const p = params.payload!;
        try {
            const accounts = await this.prisma.platformAccount.findMany({
                where: {
                    user_id: p.userId!,
                    platform: p.platform,
                },
            });
            return accounts;
        } catch (error: any) {
            this.logger.error(
                "Could not fetch platform account: " + error.message
            );
        }
    }
    public async getOne(params: Input<IGetOnePost>) {
        this.logger.info("Fetching platform one account");
        const p = params.payload!;
        try {
            const accounts = await this.prisma.platformAccount.findMany({
                where: {
                    user_id: p.userId!,
                    platform: p.platform,
                    id: p.postId,
                },
            });
            return accounts;
        } catch (error: any) {
            this.logger.error(
                "Could not fetch platform account: " + error.message
            );
        }
    }
    public async updateAccount(params: Input<IUpdatePost>) {
        this.logger.info("Updating platform one account");
        const p = params.payload!;
        try {
            const accounts = await this.prisma.platformAccount.update({
                where: {
                    id: p.postId,
                },
                data: {
                    user_id: p.userId,
                    name: p.name,
                    platform: p.platform,
                    api_key: p.api_key!,
                    api_secret: p.api_secret,
                    email: p.email,
                    username: p.username,
                    password: p.password,
                },
            });
            return accounts;
        } catch (error: any) {
            this.logger.error(
                "Could not fetch platform account: " + error.message
            );
        }
    }
    public async deleteAccount(params: Input<IDeletePost>) {
        this.logger.info("Deleting platform");
        const p = params.payload!;
        try {
            const accounts = await this.prisma.platformAccount.delete({
                where: {
                    user_id: p.userId!,
                    id: p.postId,
                },
            });
            return accounts;
        } catch (error: any) {
            this.logger.error(
                "Could not delete platform account: " + error.message
            );
        }
    }
}
