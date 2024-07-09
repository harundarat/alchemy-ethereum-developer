const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { secp256k1 } = require("ethereum-cryptography/secp256k1");

app.use(cors());
app.use(express.json());

const balances = {
  "0x2c4a4648e0c3c7434127": 100,
  "0x809c3eb93083f2aee128": 50,
  "0xc6f52629ead05cc5449f": 75,
  "0xa70d5af6f68955be3f87": 230,
  "0x9852619eec67a94484bc": 1000,
};

app.post("/balance/:signature", (req, res) => {
  const { signature } = req.params;
  const { recoveryBit, msgHash } = req.body;
  console.log("coba: ", req.body);

  const address = getPublicKey(signature, msgHash, recoveryBit);
  const balance = balances[address] || 0;
  res.send({ address, balance });
});

app.post("/send", (req, res) => {
  // TODO: get a signature from the client-side application
  // recover the public address from the signature => sender

  const { signature, msgHash, recoveryBit, recipient, amount } = req.body;

  const sender = getPublicKey(signature, msgHash, recoveryBit);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function getPublicKey(signature, msgHash, recoveryBit) {
  return `0x${secp256k1.Signature.fromCompact(signature)
    .addRecoveryBit(parseInt(recoveryBit))
    .recoverPublicKey(msgHash)
    .toHex()
    .slice(-20)}`;
}
