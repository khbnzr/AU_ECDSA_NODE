## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

### My Solution

I have created a script which will generate a randon pair of public-private keys in the server/scripts folder. Using this, I've generated five key pair to act as 5 different users mentioned in server/keys.txt file.

After the video instructions, I updated the Transfer component with private key of the sender. I calculated the digital signature using this private key for the message containing sender address, recipient address and amount. I added this hash and the recovery bit from the sign in the message json and send as a request body to the server.

In the backend, I updated the send API with first recovering the address from the secp.recoverPublicKey() function and then matched this with the sender address received in the req body, if it is mismatched it will send 400 error back to client. This will provide basic authentication while transfering the funds.

Only thing I am missing is validating the recipient eth address validity. If I type any random invalid address, i cannot see the amount because there is no private key for that invalid eth address. Hoping to find the solution for this in future tutorials.

<b>Peace, Love and Web3!!!!!</b>


