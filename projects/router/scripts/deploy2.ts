import { ethers, network } from 'hardhat'
import { configs } from '@basegate_io/common/config'
import { writeFileSync } from 'fs'

async function main() {
  // Remember to update the init code hash in SC for different chains before deploying
  const [owner] = await ethers.getSigners()
  const networkName = network.name
  console.log('owner', owner.address)

  const config = configs[networkName as keyof typeof configs]
  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }

  const v3DeployedContracts = await import(`@basegate_io/core/deployments/${networkName}.json`)
  const v3PeripheryDeployedContracts = await import(`@basegate_io/periphery/deployments/${networkName}.json`)

  const baseGatePoolDeployer_address = v3DeployedContracts.BaseGatePoolDeployer
  const baseGateFactory_address = v3DeployedContracts.BaseGateFactory
  const positionManager_address = v3PeripheryDeployedContracts.NonfungiblePositionManager

  /** SmartRouterHelper */
  console.log('Deploying SmartRouterHelper...')
  const SmartRouterHelper = await ethers.getContractFactory('SmartRouterHelper')
  const smartRouterHelper = await SmartRouterHelper.deploy()
  console.log('SmartRouterHelper deployed to:', smartRouterHelper.address)
  // await tryVerify(smartRouterHelper)

  /** SmartRouter */
  console.log('Deploying SmartRouter...')
  const SmartRouter = await ethers.getContractFactory('SmartRouter', {
    libraries: {
      SmartRouterHelper: smartRouterHelper.address,
    },
  })
  const smartRouter = await SmartRouter.deploy(
    config.v2Factory,
    baseGatePoolDeployer_address,
    baseGateFactory_address,
    positionManager_address,
    config.stableFactory,
    config.stableInfo,
    config.WNATIVE
  )
  console.log('SmartRouter deployed to:', smartRouter.address)

  // await tryVerify(smartRouter, [
  //   config.v2Factory,
  //   baseGatePoolDeployer_address,
  //   baseGateFactory_address,
  //   positionManager_address,
  //   config.stableFactory,
  //   config.stableInfo,
  //   config.WNATIVE,
  // ])

  /** MixedRouteQuoterV1 */
  const MixedRouteQuoterV1 = await ethers.getContractFactory('MixedRouteQuoterV1', {
    libraries: {
      SmartRouterHelper: smartRouterHelper.address,
    },
  })
  const mixedRouteQuoterV1 = await MixedRouteQuoterV1.deploy(
    baseGatePoolDeployer_address,
    baseGateFactory_address,
    config.v2Factory,
    config.stableFactory,
    config.WNATIVE
  )
  console.log('MixedRouteQuoterV1 deployed to:', mixedRouteQuoterV1.address)

  // await tryVerify(mixedRouteQuoterV1, [
  //   baseGatePoolDeployer_address,
  //   baseGateFactory_address,
  //   config.v2Factory,
  //   config.stableFactory,
  //   config.WNATIVE,
  // ])

  /** QuoterV2 */
  const QuoterV2 = await ethers.getContractFactory('QuoterV2', {
    libraries: {
      SmartRouterHelper: smartRouterHelper.address,
    },
  })
  const quoterV2 = await QuoterV2.deploy(baseGatePoolDeployer_address, baseGateFactory_address, config.WNATIVE)
  console.log('QuoterV2 deployed to:', quoterV2.address)

  // await tryVerify(quoterV2, [baseGatePoolDeployer_address, baseGateFactory_address, config.WNATIVE])

  /** TokenValidator */
  const TokenValidator = await ethers.getContractFactory('TokenValidator', {
    libraries: {
      SmartRouterHelper: smartRouterHelper.address,
    },
  })
  const tokenValidator = await TokenValidator.deploy(config.v2Factory, positionManager_address)
  console.log('TokenValidator deployed to:', tokenValidator.address)

  // await tryVerify(tokenValidator, [config.v2Factory, positionManager_address])

  const contracts = {
    SmartRouter: smartRouter.address,
    SmartRouterHelper: smartRouterHelper.address,
    MixedRouteQuoterV1: mixedRouteQuoterV1.address,
    QuoterV2: quoterV2.address,
    TokenValidator: tokenValidator.address,
  }

  writeFileSync(`./deployments/${network.name}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
