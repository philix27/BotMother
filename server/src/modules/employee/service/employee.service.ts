import { Injectable } from "@nestjs/common";
import { SendMessageInput } from "../model";

@Injectable()
export class EmployeeService {
    public constructor() {}

    public async sendMessage(data: SendMessageInput): Promise<[]> {
        return [];
    }
    public async getMessages(data: { userId: string }): Promise<[]> {
        return [];
    }
    public async getEmployees(): Promise<[]> {
        return [];
    }
}
