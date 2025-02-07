import { env } from "@/common/utils/envConfig";
import { app, logger } from "@/server";
import { Bot } from "./bot";
import { Gpt } from "./bot/openai";
import { validateEnvironment } from "./env";

const gpt = new Gpt();

const server = app.listen(env.PORT, () => {
  validateEnvironment();
  const { NODE_ENV, HOST, PORT } = env;

  const bot = new Bot({ai: gpt})
  bot.run()
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});

const onCloseSignal = () => {
  logger.info("sigint received, shutting down");
  server.close(() => {
    logger.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
