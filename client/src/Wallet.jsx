import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    try {
      const privateKey = evt.target.value;
      setPrivateKey(privateKey);
      const public_key = secp.getPublicKey(privateKey);
      const address = toHex(keccak256(public_key.slice(1)).slice(-20));
      console.log('address : ', address);
      setAddress(address);
      if (address) {
        const {
          data: { balance },
        } = await server.get(`balance/${address}`);
        setBalance(balance);
      } else {
        setBalance(0);
      }
    } catch (error) {
      console.log('some error : ',error);
      if(error){
        const privateKey = evt.target.value;
        let address;
        if (!privateKey) {
          address = 'Enter a Private Key Above';
        } else {
          address = 'Invalid Private Key';
        }
        setAddress(address);
        setBalance(0);
      }
    }

  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type a private key, 0x1..." value={privateKey} onChange={onChange}></input>
      </label>
      <div>
        Address : {address}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
