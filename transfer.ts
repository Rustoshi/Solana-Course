import {
  Connection,
  Transaction,
  SystemProgram,
  PublicKey,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
  console.log(`Please provide a public key to send to`);
  process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

const toPubkey = new PublicKey(suppliedToPubkey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(
  `✅ Loaded our own keypair, the destination public key, and connected to Solana`,
);


async function transfer() {
    const transaction = new Transaction();

    const LAMPORTS_TO_SEND = 5000;

    const sendSolInstrcution = SystemProgram.transfer({
        fromPubkey: senderKeypair.publicKey,
        toPubkey,
        lamports: LAMPORTS_TO_SEND,
    });

    transaction.add(sendSolInstrcution);

    const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);

    console.log(
    `✅ Finished! Sent ${LAMPORTS_TO_SEND} lamports to ${toPubkey} with signature: ${signature}`,
    );
    }


transfer()

