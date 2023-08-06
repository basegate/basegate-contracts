import { tryVerify } from '@basegate_io/common/verify'
import { ContractFactory } from 'ethers'
import { ethers, network } from 'hardhat'
import fs from 'fs'

type ContractJson = { abi: any; bytecode: string }
const artifacts: { [name: string]: ContractJson } = {
  // eslint-disable-next-line global-require
  BaseGatePoolDeployer: require('../artifacts/contracts/BaseGatePoolDeployer.sol/BaseGatePoolDeployer.json'),
  // eslint-disable-next-line global-require
  BaseGateFactory: require('../artifacts/contracts/BaseGateFactory.sol/BaseGateFactory.json'),
}

async function main() {
  const [owner] = await ethers.getSigners()
  const networkName = network.name
  console.log('owner', owner.address)

  let baseGatePoolDeployer_address = ''
  let baseGatePoolDeployer
  const BaseGatePoolDeployer = new ContractFactory(
    artifacts.BaseGatePoolDeployer.abi,
    artifacts.BaseGatePoolDeployer.bytecode,
    owner
  )
  if (!baseGatePoolDeployer_address) {
    baseGatePoolDeployer = await BaseGatePoolDeployer.deploy()

    baseGatePoolDeployer_address = baseGatePoolDeployer.address
    console.log('baseGatePoolDeployer', baseGatePoolDeployer_address)
  } else {
    baseGatePoolDeployer = new ethers.Contract(baseGatePoolDeployer_address, artifacts.BaseGatePoolDeployer.abi, owner)
  }

  let baseGateFactory_address = ''
  let baseGateFactory
  if (!baseGateFactory_address) {
    const BaseGateFactory = new ContractFactory(
      artifacts.BaseGateFactory.abi,
      artifacts.BaseGateFactory.bytecode,
      owner
    )
    baseGateFactory = await BaseGateFactory.deploy(baseGatePoolDeployer_address)

    baseGateFactory_address = baseGateFactory.address
    console.log('baseGateFactory', baseGateFactory_address)
  } else {
    baseGateFactory = new ethers.Contract(baseGateFactory_address, artifacts.BaseGateFactory.abi, owner)
  }

  // Set FactoryAddress for baseGatePoolDeployer.
  await baseGatePoolDeployer.setFactoryAddress(baseGateFactory_address)

  const contracts = {
    BaseGateFactory: baseGateFactory_address,
    BaseGatePoolDeployer: baseGatePoolDeployer_address,
  }

  fs.writeFileSync(`./deployments/${networkName}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
