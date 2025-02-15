import { IPlatformFn } from "./types";
import { Injectable } from "@nestjs/common";

@Injectable()
export class WhatsAppService implements IPlatformFn {
    sendPost: (msg: string) => Promise<{ status: string }>;
}
