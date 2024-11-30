import { AES, enc } from "crypto-js";

const secretKey = process.env.CRYPTO_SECRET_KEY;

export function encrypt(data) {
  const ciphertext = AES.encrypt(data.toString(), secretKey).toString();
  return ciphertext;
}

export function decrypt(encryptedData) {
  const bytes = AES.decrypt(encryptedData, secretKey);
  const decryptedData = bytes.toString(enc.Utf8);
  return decryptedData;
}
