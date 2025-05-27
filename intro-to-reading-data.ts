import {
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";


/**
 * This script reads the balance of a given public key on the Solana blockchain.
 * It requires a public key as a command line argument.
 * 
 * Usage: node intro-to-reading-data.js <public-key>
 */
async function getBalance() {
    const suppliedPublicKey = process.argv[2];
    if (!suppliedPublicKey) {
        throw new Error("Provide a public key to check the balance of!");
    }

    // validate the public key
    try {
        new PublicKey(suppliedPublicKey);
    } catch (error) {
        throw new Error("Invalid public key provided!");
    }

    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

    const publicKey = new PublicKey(suppliedPublicKey);

    const balanceInLamports = await connection.getBalance(publicKey);

    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

    console.log(
    `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
    );
};

getBalance()
    .catch((error) => {
        console.error("❌ Error:", error.message);
        process.exit(1);
    });