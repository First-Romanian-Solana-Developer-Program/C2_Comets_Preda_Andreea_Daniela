import { createMint, mintTo } from "@solana/spl-token";
import "dotenv/config";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { 
    getKeypairFromEnvironment, 
    getExplorerLink,
} from "@solana-developers/helpers";

import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const AMOUNT = 9; // tokeni
const DECIMALS = 6;

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");

// Substitute in your token mint account from create-token-mint.ts
const tokenMintAccount = new PublicKey("6VSCeGYbV4svD5S4NSG6aYXatLCPhaZyaSjCMfHTqEMq"); // 2Sski... la el

const recipientAssociatedTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection, 
    user,
    tokenMintAccount,
    user.publicKey
);

const transactionSignature = await mintTo(
    connection,
    user,
    tokenMintAccount,
    recipientAssociatedTokenAccount.address,
    user,
    AMOUNT * 10 ** DECIMALS,
);

// ne si uitam la tranzactie sa vedem daca face ce vrem noi
const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log(`Success! Mint Token Transaction: ${link}`);