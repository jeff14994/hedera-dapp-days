import React from "react";
import operator from "../../config.js";
import {
	Client,
	AccountId,
	PrivateKey,
	ContractFunctionParameters,
	ContractExecuteTransaction,
	AccountBalanceQuery,
	ContractInfoQuery,
} from "@hashgraph/sdk";

async function contractTokenTransferFcn(tokenId, contractId) {
	//Configure the Hedera client...
	const operatiorId = AccountId.fromString(operator.id);
	const operatorKey = PrivateKey.fromString(operator.pvkey);
	const client = Client.forTestnet().setOperator(operatiorId, operatorKey);

	// // STEP 4 ===================================
	console.log(`STEP 4 ===================================`);
	//Execute a contract function (transfer)
	const contractExecuteTx = new ContractExecuteTransaction()
		.setContractId(contractId)
		.setGas(3000000)
		// Calling tokenAssoTrans function and the following are the parameters to insert into tokenAssoTrans
		.setFunction("tokenAssoTrans", new ContractFunctionParameters().addInt64(50))
		.freezeWith(client)
	const contracExecuteSign = await contractExecuteTx.sign(operatorKey);
	const contracExecuteSubmit = await contracExecuteSign.execute(client);
	const contractExecuteRx = await contracExecuteSubmit.getReceipt(client);
	 
	console.log(`Token transfer from the operator to the contract is: ${contractExecuteRx.status.toString()}`);
	// balance check
	const bCheck = 	await new AccountBalanceQuery().setAccountId(operatiorId).execute(client);
	console.log(`Operator balance: ${bCheck.tokens._map.get(tokenId.toString())} unis of token ${tokenId}`);
	
	// Check the balance of the contract
	const cCheck = await new ContractInfoQuery().setContractId(contractId).execute(client);
	console.log(`Contract balance ${cCheck.tokenRelationships._map.get(tokenId.toString()).balance.low} units of token ${tokenId}`)
	
}

export default contractTokenTransferFcn;
