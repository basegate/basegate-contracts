import type { HardhatUserConfig, NetworkUserConfig } from 'hardhat/types'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-web3'
import '@nomiclabs/hardhat-truffle5'
import 'hardhat-abi-exporter'
import 'hardhat-contract-sizer'
import 'dotenv/config'
import 'hardhat-tracer'
import '@nomiclabs/hardhat-etherscan'
import 'solidity-docgen'
require('dotenv').config({ path: require('find-config')('.env') })

const baseTestnet: NetworkUserConfig = {
  url: 'https://goerli.base.org',
  chainId: 84531,
  accounts: [process.env.KEY_TESTNET!],
  gasPrice: 21000000,
}

const baseMainnet: NetworkUserConfig = {
  url: 'https://mainnet.base.org',
  chainId: 8453,
  accounts: [process.env.KEY_MAINNET!],
  gasPrice: 21000000,
}

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      forking: {
        url: baseTestnet.url || '',
      },
    },
    ...(process.env.KEY_TESTNET && { baseTestnet }),
    ...(process.env.KEY_MAINNET && { baseMainnet }),
  },
  etherscan: {
    apiKey: {
      baseTestnet: process.env.ETHERSCAN_API_KEY ?? '',
      baseMainnet: process.env.ETHERSCAN_API_KEY ?? '',
    },
    customChains: [
      {
        network: 'baseTestnet',
        chainId: 84531,
        urls: {
          apiURL: 'https://api-goerli.basescan.org/api',
          browserURL: 'https://goerli.basescan.org',
        },
      },
      {
        network: 'baseMainnet',
        chainId: 8453,
        urls: {
          apiURL: 'https://api.basescan.org/api',
          browserURL: 'https://mainnet.base.org',
        },
      },
    ],
  },
  solidity: {
    compilers: [
      {
        version: '0.7.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
      {
        version: '0.8.10',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
      {
        version: '0.6.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
      {
        version: '0.5.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
      {
        version: '0.4.18',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
    ],
    overrides: {
      '@basegate_io/core/contracts/libraries/FullMath.sol': {
        version: '0.7.6',
        settings: {},
      },
      '@basegate_io/core/contracts/libraries/TickBitmap.sol': {
        version: '0.7.6',
        settings: {},
      },
      '@basegate_io/core/contracts/libraries/TickMath.sol': {
        version: '0.7.6',
        settings: {},
      },
      '@basegate_io/periphery/contracts/libraries/PoolAddress.sol': {
        version: '0.7.6',
        settings: {},
      },
      'contracts/libraries/PoolTicksCounter.sol': {
        version: '0.7.6',
        settings: {},
      },
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  // abiExporter: {
  //   path: "./data/abi",
  //   clear: true,
  //   flat: false,
  // },
  docgen: {
    pages: 'files',
  },
}

export default config
