import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { useEffect } from "react";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  signature,
  setSignature,
  recoveryBit,
  setRecoveryBit,
  msgHash,
  // privateKey,
  // setPrivateKey,
}) {
  useEffect(() => {
    async function walletOnChange(signature, recoveryBit, msgHash) {
      if (signature && recoveryBit) {
        const {
          data: { address, balance },
        } = await server.post(`balance/${signature}`, {
          signature,
          recoveryBit,
          msgHash,
        });
        setAddress(address);
        setBalance(balance);
      } else {
        setBalance(0);
      }
    }

    if (signature && recoveryBit) {
      console.log(msgHash);
      console.log(typeof msgHash);
      walletOnChange(signature, recoveryBit, msgHash);
    }
  }, [signature, recoveryBit]);

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Signature
        <input
          placeholder="Type in a signature"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
        ></input>
      </label>
      <label>
        Recovery Bit
        <input
          placeholder="Type in a recovery bit (0 or 1)"
          value={recoveryBit}
          onChange={(e) => setRecoveryBit(e.target.value)}
        ></input>
      </label>

      <div>Address: {address}</div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
