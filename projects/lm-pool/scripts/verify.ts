import { verifyContract } from '@basegate_io/common/verify'
import { sleep } from '@basegate_io/common/sleep'
import { configs } from '@basegate_io/common/config'

async function main() {
  const networkName = network.name
  const config = configs[networkName as keyof typeof configs]

  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }
  const deployedContracts_masterchef_v3 = await import(`@basegate_io/masterchef/deployments/${networkName}.json`)
  const deployedContracts_v3_lm_pool = await import(`@basegate_io/lm-pool/deployments/${networkName}.json`)

  // Verify BaseGateLmPoolDeployer
  console.log('Verify BaseGateLmPoolDeployer')
  await verifyContract(deployedContracts_v3_lm_pool.BaseGateLmPoolDeployer, [
    deployedContracts_masterchef_v3.MasterChefV3,
  ])
  await sleep(10000)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
