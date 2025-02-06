import { EnvVar } from "@/env";
import OpenAI from "openai";

export class Gpt {
  constructor() {
    this.client = new OpenAI({
      organization: EnvVar.openAiOrgId,
      project: EnvVar.openAiProjectId,
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  private client: OpenAI;

  async sendMessage(content: string) {
    const chatCompletion = await this.client.chat.completions.create({
      messages: [{ role: "user", content}],
      model: "gpt-3.5-turbo",
    });
    
console.log("GPT Res", chatCompletion)
    return chatCompletion.object
  }
}
