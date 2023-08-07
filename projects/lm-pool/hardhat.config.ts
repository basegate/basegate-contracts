import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@typechain/hardhat'
import 'dotenv/config'
import { NetworkUserConfig } from 'hardhat/types'
import 'solidity-docgen'
require('dotenv').config({ path: require('find-config')('.env') })

const baseTestnet: NetworkUserConfig = {
  url: 'https://goerli.base.org',
  chainId: 84531,
  accounts: [process.env.KEY_TESTNET!],
}

const baseMainnet: NetworkUserConfig = {
  url: 'https://mainnet.base.org',
  chainId: 8453,
  accounts: [process.env.KEY_MAINNET!],
}

const config: HardhatUserConfig = {
  solidity: {
    version: '0.7.6',
  },
  networks: {
    hardhat: {},
    ...(process.env.KEY_TESTNET && { baseTestnet }),
    ...(process.env.KEY_MAINNET && { baseMainnet }),
  },
  etherscan: {
    apiKey: {
      'base-testnet': process.env.ETHERSCAN_API_KEY ?? '',
      'base-mainnet': process.env.ETHERSCAN_API_KEY ?? '',
    },
    customChains: [
      {
        network: 'base-testnet',
        chainId: 84531,
        urls: {
          apiURL: 'https://api-goerli.basescan.org/api',
          browserURL: 'https://goerli.basescan.org',
        },
      },
      {
        network: 'base-mainnet',
        chainId: 8453,
        urls: {
          apiURL: 'https://api.basescan.org/api',
          browserURL: 'https://mainnet.base.org',
        },
      },
    ],
  },
  paths: {
    sources: './contracts/',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
}

export default config
