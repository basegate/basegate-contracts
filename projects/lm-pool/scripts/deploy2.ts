import { ethers, network } from 'hardhat'
import { configs } from '@basegate_io/common/config'
import { tryVerify } from '@basegate_io/common/verify'
import fs from 'fs'
import { abi } from '@basegate_io/core/artifacts/contracts/BaseGateFactory.sol/BaseGateFactory.json'

import { parseEther } from 'ethers/lib/utils'
const currentNetwork = network.name

async function main() {
  const [owner] = await ethers.getSigners()
  // Remember to update the init code hash in SC for different chains before deploying
  const networkName = network.name
  const config = configs[networkName as keyof typeof configs]
  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }

  const v3DeployedContracts = await import(`@basegate_io/core/deployments/${networkName}.json`)
  const mcDeployedContracts = await import(`@basegate_io/masterchef/deployments/${networkName}.json`)

  const BaseGateFactory_address = v3DeployedContracts.BaseGateFactory

  const BaseGateLmPoolDeployer = await ethers.getContractFactory('BaseGateLmPoolDeployer')
  const baseGateLmPoolDeployer = await BaseGateLmPoolDeployer.deploy(mcDeployedContracts.MasterChefV3)

  console.log('BaseGateLmPoolDeployer deployed to:', baseGateLmPoolDeployer.address)

  const BaseGateFactory = new ethers.Contract(BaseGateFactory_address, abi, owner)

  await BaseGateFactory.setLmPoolDeployer(baseGateLmPoolDeployer.address)

  const contracts = {
    BaseGateLmPoolDeployer: baseGateLmPoolDeployer.address,
  }
  fs.writeFileSync(`./deployments/${networkName}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
