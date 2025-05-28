import { clusterApiUrl, Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction, TransactionInstruction } from "@solana/web3.js"
import bs58 from "bs58";
import dotenv from "dotenv";

dotenv.config();

const PING_PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const PING_PROGRAM_DATA_ADDRESS = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const payer = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY!));

async function main() {
  const transaction = new Transaction();
  const programId = new PublicKey(PING_PROGRAM_ADDRESS);
  const programDataId = new PublicKey(PING_PROGRAM_DATA_ADDRESS);

  const instruction = new TransactionInstruction({
    programId,
    keys: [
      {
        pubkey: programDataId,
        isSigner: false,
        isWritable: true
      }
    ]
  });

  transaction.add(instruction);

  const signature = await sendAndConfirmTransaction(connection, transaction, [payer]);

  console.log(
    `You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
  );
}

main().catch(console.error);