import * as dotenv from "dotenv";

dotenv.config();

export const EnvVar = {
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    COMMON_RATE_LIMIT_WINDOW_MS: process.env.COMMON_RATE_LIMIT_WINDOW_MS,
    COMMON_RATE_LIMIT_MAX_REQUESTS: process.env.COMMON_RATE_LIMIT_MAX_REQUESTS,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    KEY: process.env.KEY,
    TEST_ENCRYPTION_KEY: process.env.TEST_ENCRYPTION_KEY,
    CDP_API_SECRET: process.env.CDP_API_SECRET,
    CDP_API_NAME: process.env.CDP_API_NAME,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_ORG_ID: process.env.OPENAI_ORG_ID,
    OPENAI_PROJECT_ID: process.env.OPENAI_PROJECT_ID,
    CDP_API_KEY_NAME: process.env.CDP_API_KEY_NAME,
    CDP_API_KEY_PRIVATE_KEY: process.env.CDP_API_KEY_PRIVATE_KEY,
}

/**
 * Validates that required environment variables are set
 *
 * @throws {Error} - If required environment variables are missing
 * @returns {void}
 */
export function validateEnvironment(): void {
  const missingVars: string[] = [];

  // Check required variables
//   const requiredVars = ["OPENAI_API_KEY", "CDP_API_KEY_NAME", "CDP_API_KEY_PRIVATE_KEY"];
  const requiredVars = Object.keys(EnvVar)
  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  });

  // Exit if any required variables are missing
  if (missingVars.length > 0) {
    console.error("Error: Required environment variables are not set");
    missingVars.forEach(varName => {
      console.error(`${varName}=your_${varName.toLowerCase()}_here`);
    });
    process.exit(1);
  }

  // Warn about optional NETWORK_ID
  if (!process.env.NETWORK_ID) {
    console.warn("Warning: NETWORK_ID not set, defaulting to base-sepolia testnet");
  }
}

// Add this right after imports and before any other code

