#!/usr/bin/env zx
// import 'zx/globals'

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

await $`yarn workspace @basegate_io/core run hardhat run scripts/deploy.ts --network ${network}`

await $`yarn workspace @basegate_io/periphery run hardhat run scripts/deploy2.ts --network ${network}`

await $`yarn workspace @basegate_io/smart-router run hardhat run scripts/deploy2.ts --network ${network}`

await $`yarn workspace @basegate_io/masterchef run hardhat run scripts/deploy2.ts --network ${network}`

await $`yarn workspace @basegate_io/lm-pool run hardhat run scripts/deploy2.ts --network ${network}`

console.log(chalk.blue('Done!'))

const m = await fs.readJson(`./projects/masterchef/deployments/${network}.json`)
const r = await fs.readJson(`./projects/router/deployments/${network}.json`)
const c = await fs.readJson(`./projects/core/deployments/${network}.json`)
const p = await fs.readJson(`./projects/periphery/deployments/${network}.json`)
const l = await fs.readJson(`./projects/lm-pool/deployments/${network}.json`)

const addresses = {
  ...m,
  ...r,
  ...c,
  ...p,
  ...l,
}

console.log(chalk.blue('Writing to file...'))
console.log(chalk.yellow(JSON.stringify(addresses, null, 2)))

fs.writeJson(`./deployments/${network}.json`, addresses, { spaces: 2 })
