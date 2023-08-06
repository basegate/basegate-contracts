import { verifyContract } from '@basegate_io/common/verify'
import { sleep } from '@basegate_io/common/sleep'

async function main() {
  const networkName = network.name
  const deployedContracts = await import(`@basegate_io/v3-core/deployments/${networkName}.json`)

  // Verify BaseGatePoolDeployer
  console.log('Verify BaseGatePoolDeployer')
  await verifyContract(deployedContracts.BaseGatePoolDeployer)
  await sleep(10000)

  // Verify baseGateFactory
  console.log('Verify baseGateFactory')
  await verifyContract(deployedContracts.BaseGateFactory, [deployedContracts.BaseGatePoolDeployer])
  await sleep(10000)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
