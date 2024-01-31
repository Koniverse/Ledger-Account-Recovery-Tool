### Ledger Account Recovery Tool

Developed by SubWallet, this offline tool can be used to export accounts on Polkadot-SDK networks from a Ledger device using seed phrases.

### Security best practice
- This tool is not associated with Parity or Ledger. Use at your own risk.
- Entering the seed phrase of a Ledger device onto a computer contains the risk of compromising it. We recommend using this offline tool on an air-gapped computer or one that is not connected to the Internet.
- After funds are recovered, you should move all your funds from all accounts on your Ledger away and reset your Ledger with a new seed phrase.

### Instruction
- Download the tool from this [link](https://github.com/Koniverse/Ledger-Account-Recovery-Tool/releases) 
- Turn off your Internet connection
- Extract the folder from the downloaded zip file and open index.html
- Open the file in a browser (such as Chrome)
- Select the network of the Ledger account, enter the seed phrase, and account address
- Click Export JSON file, and create a strong password to protect the JSON file
- Import the JSON file into SubWallet and recover the funds by sending all tokens to another account