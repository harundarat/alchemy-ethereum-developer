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

### Test

We can quickly test with these account:

#### Test Account 1 (balance: 150):

- signature: `456c7ac73588e97ccec89d508dd54d7f4c44cc621b8274cd6f3ab43cc2e311375753363d029d8850c82c2806462e0b2e9b3dd68095934ac88f32c78e41c5ff10`
- recoveryBit: `1`
- public key: `0xff8cf52905c10c9362c9`

#### Test Account 2 (balance: 0):

- signature: `dd3bec40cf4333bc23ec47cbb59d9a5f375ee7c7d525e2185c979fba8e2bbe84133a795006bf1a021635bbfed3a99c3426b609588408e4470d1457a338c88983`
- recoveryBit: `0`
- public key: `0x97c3040c9acb699ba181`
