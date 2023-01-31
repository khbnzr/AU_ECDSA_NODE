const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();
console.log('private key :', toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);
console.log('public key:', toHex(publicKey));

const ethAddress = keccak256(publicKey.slice(1)).slice(-20);
console.log('eth address : ', toHex(ethAddress));

// (async function () {
//     const msg = process.argv[2];
//     console.log('msg : ', msg);

//     const hashedMsg = keccak256(utf8ToBytes(msg));
//     console.log('hashed msg : ', toHex(hashedMsg));

//     const [digitalSign, recoveryBit] = await secp.sign(hashedMsg, privateKey, { recovered: true });
//     console.log('digital sign : ', toHex(digitalSign));
//     console.log('recovery bit : ', recoveryBit);

//     const ethAddress = keccak256(digitalSign.slice(1)).slice(-20);
//     console.log('eth address : ', toHex(ethAddress));

//     const recoveredPublicKey = await secp.recoverPublicKey(hashedMsg, digitalSign, recoveryBit);
//     console.log('recovered public key : ', toHex(recoveredPublicKey));
//     console.log(toHex(recoveredPublicKey) === toHex(publicKey));
// })();







