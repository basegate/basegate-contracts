#!/usr/bin/env zx
const networks = {
  baseMainnet: 'baseMainnet',
  baseTestnet: 'baseTestnet',
  hardhat: 'hardhat',
}

let network = process.env.NETWORK
console.log(network, 'network')
if (!network || !networks[network]) {
  throw new Error(`env NETWORK: ${network}`)
}

await $`yarn workspace @basegate_io/core run verify`

await $`yarn workspace @basegate_io/periphery run verify`

await $`yarn workspace @basegate_io/smart-router run verify`

await $`yarn workspace @basegate_io/masterchef run verify`

await $`yarn workspace @basegate_io/lm-pool run verify`

console.log(chalk.blue('Done!'))
