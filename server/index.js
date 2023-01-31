const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

app.use(cors());
app.use(express.json());

const balances = {
  "be7f426b861967804d903e2ffc2f3c0e7b1bf071": 100,
  "29b2d2e097fcc1f225e7d4d6e12663e837dd8e53": 50,
  "b1d364b98fde28cfde6208d4399e38419f00d5c8": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  // TODO: get a signature from the client-side application
  // recover the public address from the signature
  const { sender, recipient, amount, hash, recoveryBit } = req.body;

  const message = { sender, amount, recipient};
  const recovered_address = await secp.recoverPublicKey(keccak256(utf8ToBytes(JSON.stringify(message))), hash, recoveryBit);

  console.log('message : ', message);
  console.log('rec addr : ',recovered_address);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if(toHex(keccak256(recovered_address.slice(1)).slice(-20)) !== sender) {
    console.log('sender not matched!!!');
    res.status(400).send({ message: "sender not matched!!!"});
  } else if (balances[sender] < amount) {
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
