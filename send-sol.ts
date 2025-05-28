import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import bs58 from "bs58";
import dotenv from "dotenv";

dotenv.config();

const conncection = new Connection(clusterApiUrl("devnet"), "confirmed");
const payer = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY!));

async function main(){
    const instruction = SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: new PublicKey(process.argv[2]),
        lamports: Number(process.argv[3]) * LAMPORTS_PER_SOL,
    });

    const transaction = new Transaction().add(instruction);

    const signature = await sendAndConfirmTransaction(conncection, transaction, [payer]);

    console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);
}

main().catch(console.error);