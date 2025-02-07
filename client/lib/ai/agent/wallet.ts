import {
  CdpWalletProvider,
} from "@coinbase/agentkit";

export const useCdpWallet = async () => {

const provider = await CdpWalletProvider.configureWithWallet({
  // Optional: Provide API key details. If not provided, it will attempt to configure from JSON.
  apiKeyName: "YOUR_API_KEY_NAME", // process.env.API_KEY_NAME
  apiKeyPrivateKey: "YOUR_API_KEY_PRIVATE_KEY", // process.env.API_KEY_PRIVATE_KEY
  
  // Optional: Provide network ID (defaults to base-sepolia if not specified)
  networkId: "base-sepolia", // other options: "base-mainnet", "ethereum-mainnet", "arbitrum-mainnet", "polygon-mainnet".
  
  // Optional: Provide mnemonic phrase (alternatively can be set via MNEMONIC_PHRASE env var)
  mnemonicPhrase: "your twelve word mnemonic phrase here",
  
  // Optional: Provide existing wallet data as JSON string
//!   cdpWalletData: JSON.stringify(existingWalletData)
});
    
}