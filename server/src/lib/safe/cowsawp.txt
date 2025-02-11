import {
  SwapAdvancedSettings,
  TradeParameters,
  TradingSdk,
  SupportedChainId,
  OrderKind,
  SigningScheme,
} from "@cowprotocol/cow-sdk";
import { VoidSigner } from "@ethersproject/abstract-signer";
import { JsonRpcProvider } from "@ethersproject/providers";

const traderParams = {
  chainId: SupportedChainId.SEPOLIA,
  signer: new VoidSigner(
    smartContractWalletAddress: SAFE_ADDRESS,
    new JsonRpcProvider("https://sepolia.gateway.tenderly.co")
  ),
  appCode: "awesome-app",
};

const cowSdk = new TradingSdk(traderParams, { logs: false });

const parameters: TradeParameters = {
  kind: OrderKind.SELL,
  sellToken: WETH_ADDRESS,
  sellTokenDecimals: 18,
  buyToken: COW_ADDRESS,
  buyTokenDecimals: 18,
  amount: INPUT_AMOUNT,
};

const advancedParameters: SwapAdvancedSettings = {
  quoteRequest: {
  // Specify the signing scheme
  signingScheme: SigningScheme.PRESIGN,
  },
};

const orderId = await cowSdk.postSwapOrder(parameters, advancedParameters);

console.log(`Order ID: [${orderId}]`);

const preSignTransaction = await cowSdk.getPreSignTransaction({
  orderId,
  account: smartContractWalletAddress,
});

const customChain = defineChain({
  ...sepolia,
  name: "custom chain",
  transport: http(RPC_URL),
});

const publicClient = createPublicClient({
  chain: customChain,
  transport: http(RPC_URL),
});

const safePreSignTx: MetaTransactionData = {
  to: preSignTransaction.to,
  value: preSignTransaction.value,
  data: preSignTransaction.data,
  operation: OperationType.Call,
};

const safeTx = await preExistingSafe.createTransaction({
  transactions: [safePreSignTx],
  onlyCalls: true,
});

// You might need to collect more signatures here

const txResponse = await preExistingSafe.executeTransaction(safeTx);
console.log(`Sent tx hash: [${txResponse.hash}]`);
console.log("Waiting for the tx to be mined");
await publicClient.waitForTransactionReceipt({
  hash: txResponse.hash as `0x${string}`,
});
