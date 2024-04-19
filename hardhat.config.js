require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const ownerPrivateKey = process.env.OWNER_ACCOUNT_PRIVATE_KEY || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 11155111
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/L_Dr5zZ0rJiCSt-0kBUL0O-V65KFmJld",
      accounts: [ownerPrivateKey]
    }
  }
};
