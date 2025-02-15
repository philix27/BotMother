import { IPlatformFn } from "./types";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LinkedinService implements IPlatformFn {
    sendPost: (msg: string) => Promise<{ status: string; }>;

}
