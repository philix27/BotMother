import { IPlatformFn } from "./types";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InstagramService implements IPlatformFn {
    sendPost: (msg: string) => Promise<{ status: string; }>;

}
