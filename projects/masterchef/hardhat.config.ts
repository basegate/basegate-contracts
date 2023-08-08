/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import type { HardhatUserConfig, NetworkUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@openzeppelin/hardhat-upgrades";
import "@typechain/hardhat";
import "hardhat-abi-exporter";
import "hardhat-contract-sizer";
import "solidity-coverage";
import "solidity-docgen";
import "dotenv/config";

require("dotenv").config({ path: require("find-config")(".env") });

const baseTestnet: NetworkUserConfig = {
  url: "https://goerli.base.org",
  chainId: 84531,
  accounts: [process.env.KEY_TESTNET!],
};

const baseMainnet: NetworkUserConfig = {
  url: "https://mainnet.base.org",
  chainId: 8453,
  accounts: [process.env.KEY_MAINNET!],
};

const config = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    ...(process.env.KEY_TESTNET && { baseTestnet }),
    ...(process.env.KEY_MAINNET && { baseMainnet }),
    // testnet: bscTestnet,
    // mainnet: bscMainnet,
  },
  etherscan: {
    apiKey: {
      baseTestnet: process.env.ETHERSCAN_API_KEY ?? "",
      baseMainnet: process.env.ETHERSCAN_API_KEY ?? "",
    },
    customChains: [
      {
        network: "baseTestnet",
        chainId: 84531,
        urls: {
          apiURL: "https://api-goerli.basescan.org/api",
          browserURL: "https://goerli.basescan.org",
        },
      },
      {
        network: "baseMainnet",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://mainnet.base.org",
        },
      },
    ],
  },
  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 999,
          },
        },
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 999,
          },
        },
      },
    ],
  },
  paths: {
    sources: "./contracts/",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  docgen: {
    pages: "files",
  },
};

export default config;
