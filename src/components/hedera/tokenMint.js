import React from "react";
import operator from "../../config.js";
import { Client, AccountId, PrivateKey, TokenMintTransaction } from "@hashgraph/sdk";

async function tokenMintFcn(tId) {
	//Configure the Hedera client...
	const operatiorId = AccountId.fromString(operator.id);
	const operatorKey = PrivateKey.fromString(operator.pvkey);
	const client = Client.forTestnet().setOperator(operatiorId, operatorKey);
	//Add code to mint HTS tokens...
	console.log("Minting new tokens");
	const tokenMintTx = new TokenMintTransaction()
		.setTokenId(tId)
		.setAmount(100)
		.freezeWith(client);
	const tokenMintSign = await tokenMintTx.sign(operatorKey);
	const tokenMintSubmit = await tokenMintSign.execute(client);
	// Get confirmation
	const tokenMintRec = await tokenMintSubmit.getRecord(client);
	const supply = tokenMintRec.receipt.totalSupply;
	return supply;
}

export default tokenMintFcn;
