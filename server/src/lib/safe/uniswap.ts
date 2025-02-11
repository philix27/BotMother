import { 
  FeeAmount,
  Pool,
  Route,
  SwapRouter,
  CurrencyAmount,
  TradeType,
  Percent
} from "@uniswap/v3-sdk";
import { Token, SwapOptions } from "@uniswap/sdk-core";
import JSBI from "jsbi";
import { OperationType, MetaTransactionData } from "@safe-global/types-kit";

// Set up viem clients and accounts
const account = privateKeyToAccount(AGENT_PRIVATE_KEY as `0x${string}`);

const publicClient = createPublicClient({
  transport: http(RPC_URL!)
});
const walletClient = createWalletClient({
  transport: http(RPC_URL!)
});

const chainId = (await publicClient.getChainId());

// Example Values for WETH/USDC Uniswap Pool on Sepolia:
const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const USDC_ETH_POOL_ADDRESS = "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640";
const SWAP_ROUTER_ADDRESS = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // Uniswap V3 Router
const INPUT_AMOUNT = "100000000000"; // Amount of ETH to swap to USDC
const OUTOUT_AMOUNT = "0"; // 0 USDC

// Define token details
const USDC = new Token(chainId, USDC_ADDRESS, 6, "USDC", "USD Coin");
const WETH = new Token(chainId, WETH_ADDRESS, 18, "WETH", "Wrapped Ether");

const callDataApprove = encodeFunctionData({
  abi: WETH_ABI,
  functionName: "approve",
  args: [SWAP_ROUTER_ADDRESS, INPUT_AMOUNT],
});

const safeApproveTx: MetaTransactionData = {
  to: WETH_ADDRESS,
  value: "0",
  data: callDataApprove,
  operation: OperationType.Call,
};

const options: SwapOptions = {
  slippageTolerance: new Percent(50, 10_000), // 50 bips, or 0.50%
  deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from the current Unix time
  recipient: SAFE_ADDRESS,
};

const poolInfo = await fetchPoolData(publicClient, USDC_ETH_POOL_ADDRESS);

// Create the pool object
const pool = new Pool(
  WETH,
  USDC,
  FeeAmount.MEDIUM,
  JSBI.BigInt(poolInfo.sqrtPriceX96.toString()),
  JSBI.BigInt(poolInfo.liquidity.toString()),
  poolInfo.tick
);

const swapRoute = new Route([pool], WETH, USDC);

const uncheckedTrade = Trade.createUncheckedTrade({
  tradeType: TradeType.EXACT_INPUT,
  route: swapRoute,
  inputAmount: CurrencyAmount.fromRawAmount(WETH, 
    INPUT_AMOUNT
  ),
  outputAmount: CurrencyAmount.fromRawAmount(USDC, OUTOUT_AMOUNT),
});

const methodParameters = SwapRouter.swapCallParameters(
  [uncheckedTrade],
  options
);

const safeSwapTx: MetaTransactionData = {
  to: SWAP_ROUTER_ADDRESS,
  value: methodParameters.value,
  data: methodParameters.calldata,
  operation: OperationType.Call,
};

const safeTx = await preExistingSafe.createTransaction({
  transactions: [safeApproveTx, safeSwapTx],
  onlyCalls: true,
});

// You might need to collect more signatures here, depending on the threshold

const txResponse = await preExistingSafe.executeTransaction(safeTx);
  await publicClient.waitForTransactionReceipt({
  hash: txResponse.hash as `0x${string}`,
});

console.log(`Deposit and approve transaction: [${txResponse.hash}]`);
