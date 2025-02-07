import { runAutonomousMode } from "./mode_auto";
import { runChatMode } from "./mode_chat";
import { chooseMode } from "./choose_mode";
import { initializeAgent } from "./initialize";




export class AppAgent {
  constructor() {

    // Start the agent when running directly
if (require.main === module) {
  console.log("Starting Agent...");
 this. main().catch(error => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}
  }

  /**
 * Main entry point
 */
  async  main() {
  try {
    const { agent, config } = await initializeAgent();
    const mode = await chooseMode();

    if (mode === "chat") {
      await runChatMode(agent, config);
    } else {
      await runAutonomousMode(agent, config);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }
    process.exit(1);
  }
}
}