const HDWalletProvider = require("@truffle/hdwallet-provider");
let secretkey = "06e9b3ecb4c75da7e39b3b31faabbf43968ad6b1833d98499e887b43226d744e";

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

if (!mnemonic || mnemonic.split(' ').length !== 12) {
  throw new Error('unable to retrieve mnemonic from .secret');
}

module.exports = {
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    bscscan: "3VIDJWVVU9882AA8YCRUQRTP7DFDNE5XBS"
  },
  networks: {
  test: {
    provider: () => new HDWalletProvider("", "https://data-seed-prebsc-2-s3.binance.org:8545/"),
    network_id: 97,
    confirmations: 10,
    timeoutBlocks: 200,
    skipDryRun: true
  },
  bscTestnet: {
    provider: () => new HDWalletProvider(mnemonic, "https://data-seed-prebsc-1-s1.binance.org:8545"),
    network_id: 97,
    confirmations: 10,
    timeoutBlocks: 200,
    skipDryRun: true,
    production: true
  }
  },  
  mocha: {
    timeout: 100000
  },
  compilers: {
    solc: {
      version: "0.6.12"
    }
  }
};
