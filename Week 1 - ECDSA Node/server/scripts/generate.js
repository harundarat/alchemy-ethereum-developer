const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const privateKey = secp.secp256k1.utils.randomPrivateKey();
const publicKey = `0x${toHex(secp.secp256k1.getPublicKey(privateKey)).slice(
  -20
)}`;

// Create signature
const messageHash = keccak256(utf8ToBytes(""));
const signature = secp.secp256k1.sign(messageHash, privateKey);
const signatureHex = signature.toCompactHex();
const publicKeyRecovery = signature.recoverPublicKey(messageHash);
const publicAddress = `0x${publicKeyRecovery.toHex().slice(-20)}`;
const publicFromSigHex = secp.secp256k1.Signature.fromCompact(signatureHex)
  .addRecoveryBit(signature.recovery)
  .recoverPublicKey(messageHash)
  .toHex()
  .slice(-20);
const publicKeyRecovery2 = `0x${publicFromSigHex}`;

// console.log("private key: ", toHex(privateKey));
console.log("public key: ", publicKey);
console.log("signature: ", signature);
console.log("hex signature: ", signatureHex);
// console.log("recovered public key: ", publicKeyRecovery);
console.log("recovered public key: ", publicAddress);
console.log("recovered public key 2: ", publicKeyRecovery2);
// console.log("pub2recover: ", pub2recover);
// console.log("message hash: ", toHex(messageHash));
