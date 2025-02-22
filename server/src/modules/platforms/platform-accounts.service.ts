import { Injectable } from "@nestjs/common";
import { LoggerService, PrismaService } from "../common";
import { $Enums } from "@prisma/client";
import { Input } from "../../lib";

type ICreateAccount = {
    platform: $Enums.Platforms;
    name: string;
    email?: string;
    password?: string;
    username?: string;
    api_key?: string;
    api_secret?: string;
    userId?: number;
};
type IUpdateAccount = {
    platform: $Enums.Platforms;
    name: string;
    email?: string;
    password?: string;
    username?: string;
    api_key?: string;
    api_secret?: string;
    userId?: number;
    platformId?: number;
};
type IGetAccount = {
    platform: $Enums.Platforms;
    userId?: number;
};
type IGetOneAccount = {
    platform: $Enums.Platforms;
    userId?: number;
    platformId?: number;
};
type IDeleteAccount = {
    userId?: number;
    platformId?: number;
};

@Injectable()
export class PlatformManagerService {
    private prisma: PrismaService;

    public constructor(private readonly logger: LoggerService) {}

    public async createAccount(payload: Input<ICreateAccount>) {
        this.logger.info("Creating platform account ...");
        const p = payload.payload!;
        try {
            await this.prisma.platformAccount.create({
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
        } catch (error: any) {
            this.logger.error(
                "Could not create platform account: " + error.message
            );
        }
    }

    public async getAccounts(params: Input<IGetAccount>) {
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
    public async getOneAccount(params: Input<IGetOneAccount>) {
        this.logger.info("Fetching platform one account");
        const p = params.payload!;
        try {
            const accounts = await this.prisma.platformAccount.findMany({
                where: {
                    user_id: p.userId!,
                    platform: p.platform,
                    id: p.platformId,
                },
            });
            return accounts;
        } catch (error: any) {
            this.logger.error(
                "Could not fetch platform account: " + error.message
            );
        }
    }
    public async updateAccount(params: Input<IUpdateAccount>) {
        this.logger.info("Updating platform one account");
        const p = params.payload!;
        try {
            const accounts = await this.prisma.platformAccount.update({
                where: {
                    id: p.platformId,
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
    public async deleteAccount(params: Input<IDeleteAccount>) {
        this.logger.info("Deleting platform");
        const p = params.payload!;
        try {
            const accounts = await this.prisma.platformAccount.delete({
                where: {
                    user_id: p.userId!,
                    id: p.platformId,
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
