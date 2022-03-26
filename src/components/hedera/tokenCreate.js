import React from "react";
import operator from "../../config.js";
import { Client, AccountId, PrivateKey, TokenCreateTransaction } from "@hashgraph/sdk";

async function tokenCreateFcn() {
	//Configure the Hedera client...
	const operatiorId = AccountId.fromString(operator.id);
	const operatorKey = PrivateKey.fromString(operator.pvkey);
	const client = Client.forTestnet().setOperator(operatiorId, operatorKey);

	//Add code to create the HTS token...
	console.log("Creating Token");
	// Create transaction
	const tokenCreateTx = new TokenCreateTransaction()
		.setTokenName("dAppDayToken")
		.setTokenSymbol("DDT")
		.setTreasuryAccountId(operatiorId)
		.setInitialSupply(100)
		.setDecimals(0)
		.setSupplyKey(operatorKey)
		.freezeWith(client);
	// Sign the transaction
	const tokenCreateSign = await tokenCreateTx.sign(operatorKey);
	const tokenCreateSubmit = await tokenCreateSign.execute(client);
	const tokenCreateRec  = await tokenCreateSubmit.getRecord(client)
	const tId = tokenCreateRec.receipt.tokenId;
	const supply = tokenCreateTx._initialSupply.low

	return [tId, supply];
}

export default tokenCreateFcn;
// An operation requires additional permissions: read:user, repo. Please grant permissions and try again.