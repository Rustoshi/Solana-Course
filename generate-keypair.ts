import "dotenv/config";
import 'dotenv/config';

const keypair = process.env.SECRET_KEY;

console.log(
  `✅ Finished! We've loaded our secret key securely, using an env file!`,
);