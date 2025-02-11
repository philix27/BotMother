import { getAllowanceModuleDeployment } from "@safe-global/safe-modules-deployments";
import Safe from "@safe-global/protocol-kit";
import { OperationType, MetaTransactionData } from "@safe-global/types-kit";

import Safe from "@safe-global/protocol-kit";
import { getAllowanceModuleDeployment } from "@safe-global/safe-modules-deployments";

const preExistingSafe = await Safe.init({
    provider: RPC_URL,
    signer: OWNER_1_PRIVATE_KEY,
    safeAddress: safeAddress,
});

// Add Module
const allowanceModule = getAllowanceModuleDeployment({ network: "11155111" })!;
const safeTransaction = await preExistingSafe.createEnableModuleTx(
    allowanceModule.networkAddresses["11155111"]
);
const txResponse = await preExistingSafe.executeTransaction(safeTransaction);
console.log(txResponse);


const ERC20_TOKEN_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
const preExistingSafe = await Safe.init({
    provider: RPC_URL,
    signer: OWNER_1_PRIVATE_KEY,
    safeAddress: safeAddress,
});

const allowanceModule = getAllowanceModuleDeployment({ network: "11155111" })!;

const allowanceModuleAddress = allowanceModule.networkAddresses["11155111"];

const callData1 = encodeFunctionData({
    abi: allowanceModule.abi,
    functionName: "addDelegate",
    args: [AGENT_ADDRESS],
});
// agent can spend 1 USDC per day:
const callData2 = encodeFunctionData({
    abi: allowanceModule.abi,
    functionName: "setAllowance",
    args: [
        AGENT_ADDRESS, // delegate
        ERC20_TOKEN_ADDRESS, // token
        1_000_000, // allowance amount (1 USDC)
        1_440, // reset time in minutes (1440 mins = 1 day)
        0, // reset base (fine to set zero)
    ],
});

const safeTransactionData1: MetaTransactionData = {
    to: allowanceModuleAddress,
    value: "0",
    data: callData1,
    operation: OperationType.Call,
};

const safeTransactionData2: MetaTransactionData = {
    to: allowanceModuleAddress,
    value: "0",
    data: callData2,
    operation: OperationType.Call,
};

const safeTransaction = await preExistingSafe.createTransaction({
    transactions: [safeTransactionData1, safeTransactionData2],
    onlyCalls: true,
});

const txResponse = await preExistingSafe.executeTransaction(safeTransaction);
console.log(txResponse);
