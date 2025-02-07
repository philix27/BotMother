import { run, Agent, Context } from "@xmtp/message-kit";
import { Gpt } from "./openai";

type BotParams = {
  ai: Gpt
}
export class Bot {
  private agent: Agent;

  constructor({ai}: BotParams) {
    this.agent = {
      name: "Gm Bot",
      tag: "@bot",
      description: "Gm bot.",
      onMessage: async (context: Context) => {
        const { group } = context;

        // gpt.sendMessage("");

        // gpt
        console.log("Message from sender", context.message.content);
        const reply = await ai.sendMessage(context.message.content.content);

        if (!context.group) {
          await context.send(JSON.stringify(reply));
        }
      },
    };
  }

  run = () => run(this.agent);
}
