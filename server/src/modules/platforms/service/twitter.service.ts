import { IPlatformFn } from "./types";
import { Injectable } from "@nestjs/common";
import { Scraper } from "agent-twitter-client";
import { LoggerService } from "../../common";

const DEFAULT_MAX_TWEET_LENGTH = 250;

@Injectable()
export class TwitterService implements IPlatformFn {
    private client: Scraper;
    private username: string;
    private password: string;
    private email: string;
    private secret_2fa: string;
    private logger: LoggerService;

    constructor(params: {
        username: string;
        password: string;
        email: string;
        secret_2fa: string;
        logger: LoggerService;
    }) {
        this.username = params.username;
        this.password = params.password;
        this.email = params.email;
        this.secret_2fa = params.secret_2fa;
        this.client = new Scraper();
    }

    public async sendPost(content: string): Promise<{ status: string }> {
        await this.client.login(
            this.username,
            this.password,
            this.email,
            this.secret_2fa
        );

        if (!(await this.client.isLoggedIn())) {
            this.logger.error("Failed to login to Twitter");
            throw new Error("Failed to login to Twitter");
        }

        // Send the tweet
        this.logger.info("Attempting to send tweet:" + content);

        try {
            if (content.length > DEFAULT_MAX_TWEET_LENGTH) {
                const noteTweetResult = await this.client.sendNoteTweet(
                    content
                );
                if (
                    noteTweetResult.errors &&
                    noteTweetResult.errors.length > 0
                ) {
                    // Note Tweet failed due to authorization. Falling back to standard Tweet.
                    await this.sendTweet(content);
                    return { status: "success" };
                }
                return { status: "success" };
            }

            await this.sendTweet(content);
            return { status: "success" };
        } catch (error) {
            throw new Error(`Note Tweet failed: ${error}`);
        }
    }

    private async sendTweet(content: string) {
        // this.client.login()
        const result = await this.client.sendTweet(content);

        const body = await result.json();
        this.logger.info("Tweet response:" + body);

        // Check for Twitter API errors
        if (body.errors) {
            const error = body.errors[0];
            this.logger.error(
                `Twitter API error (${error.code}): ${error.message}`
            );
            return false;
        }

        // Check for successful tweet creation
        if (!body?.data?.create_tweet?.tweet_results?.result) {
            this.logger.error(
                "Failed to post tweet: No tweet result in response"
            );
            return false;
        }

        return true;
    }
}
