import type { HardhatUserConfig, NetworkUserConfig } from 'hardhat/types'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@openzeppelin/hardhat-upgrades'
import '@typechain/hardhat'
import 'hardhat-watcher'
import 'dotenv/config'
import 'solidity-docgen'
require('dotenv').config({ path: require('find-config')('.env') })

const LOW_OPTIMIZER_COMPILER_SETTINGS = {
  version: '0.7.6',
  settings: {
    evmVersion: 'istanbul',
    optimizer: {
      enabled: true,
      runs: 2_000,
    },
    metadata: {
      bytecodeHash: 'none',
    },
  },
}

const LOWEST_OPTIMIZER_COMPILER_SETTINGS = {
  version: '0.7.6',
  settings: {
    evmVersion: 'istanbul',
    optimizer: {
      enabled: true,
      runs: 1_000,
    },
    metadata: {
      bytecodeHash: 'none',
    },
  },
}

const DEFAULT_COMPILER_SETTINGS = {
  version: '0.7.6',
  settings: {
    evmVersion: 'istanbul',
    optimizer: {
      enabled: true,
      runs: 1_000_000,
    },
    metadata: {
      bytecodeHash: 'none',
    },
  },
}

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

export default {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    ...(process.env.KEY_TESTNET && { baseTestnet }),
    ...(process.env.KEY_MAINNET && { baseMainnet }),
    // mainnet: bscMainnet,
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
    compilers: [DEFAULT_COMPILER_SETTINGS],
    overrides: {
      'contracts/NonfungiblePositionManager.sol': LOW_OPTIMIZER_COMPILER_SETTINGS,
      'contracts/test/MockTimeNonfungiblePositionManager.sol': LOW_OPTIMIZER_COMPILER_SETTINGS,
      'contracts/test/NFTDescriptorTest.sol': LOWEST_OPTIMIZER_COMPILER_SETTINGS,
      'contracts/NFTDescriptorEx.sol': LOWEST_OPTIMIZER_COMPILER_SETTINGS,
      'contracts/NonfungibleTokenPositionDescriptor.sol': LOWEST_OPTIMIZER_COMPILER_SETTINGS,
      'contracts/libraries/NFTDescriptor.sol': LOWEST_OPTIMIZER_COMPILER_SETTINGS,
    },
  },
  watcher: {
    test: {
      tasks: [{ command: 'test', params: { testFiles: ['{path}'] } }],
      files: ['./test/**/*'],
      verbose: true,
    },
  },
  docgen: {
    pages: 'files',
  },
}
