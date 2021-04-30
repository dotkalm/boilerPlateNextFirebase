import crypto from "crypto"
import string_decoder from "string_decoder"

export const generateNonce = function(length) {
  const decoder = new string_decoder.StringDecoder("ascii")
  const buf = Buffer.alloc(length)
  var nonce = ""
  while (nonce.length < length) {
    crypto.randomFillSync(buf)
    nonce = decoder.write(buf)
  }
  return nonce.substr(0, length)
};

const unhashedNonce = generateNonce(10);

// SHA256-hashed nonce in hex
const hashedNonceHex = crypto.createHash('sha256')
  .update(unhashedNonce).digest().toString('hex')
