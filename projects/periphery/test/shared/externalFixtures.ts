import {
  abi as FACTORY_ABI,
  bytecode as FACTORY_BYTECODE,
} from '@basegate_io/core/artifacts/contracts/BaseGateFactory.sol/BaseGateFactory.json'
import {
  abi as DEPLOYER_ABI,
  bytecode as DEPLOYER_BYTECODE,
} from '@basegate_io/core/artifacts/contracts/BaseGatePoolDeployer.sol/BaseGatePoolDeployer.json'
import { abi as FACTORY_V2_ABI, bytecode as FACTORY_V2_BYTECODE } from '@uniswap/v2-core/build/UniswapV2Factory.json'
import { Fixture } from 'ethereum-waffle'
import { ethers, waffle } from 'hardhat'
import { IBaseGateFactory, IWETH9, MockTimeSwapRouter } from '../../typechain-types'

import WETH9 from '../contracts/WETH9.json'
import { Contract } from '@ethersproject/contracts'
import { constants } from 'ethers'

const wethFixture: Fixture<{ weth9: IWETH9 }> = async ([wallet]) => {
  const weth9 = (await waffle.deployContract(wallet, {
    bytecode: WETH9.bytecode,
    abi: WETH9.abi,
  })) as IWETH9

  return { weth9 }
}

export const v2FactoryFixture: Fixture<{ factory: Contract }> = async ([wallet]) => {
  const factory = await waffle.deployContract(
    wallet,
    {
      bytecode: FACTORY_V2_BYTECODE,
      abi: FACTORY_V2_ABI,
    },
    [constants.AddressZero]
  )

  return { factory }
}

const v3CoreFactoryFixture: Fixture<{ deployer: Contract; factory: IBaseGateFactory }> = async ([wallet]) => {
  const deployer = await waffle.deployContract(wallet, {
    bytecode: DEPLOYER_BYTECODE,
    abi: DEPLOYER_ABI,
  })
  const factory = (await waffle.deployContract(
    wallet,
    {
      bytecode: FACTORY_BYTECODE,
      abi: FACTORY_ABI,
    },
    [deployer.address]
  )) as IBaseGateFactory

  await deployer.setFactoryAddress(factory.address)

  return {
    deployer,
    factory,
  }
}

export const v3RouterFixture: Fixture<{
  weth9: IWETH9
  factory: IBaseGateFactory
  router: MockTimeSwapRouter
  deployer: any
}> = async ([wallet], provider) => {
  const { weth9 } = await wethFixture([wallet], provider)
  const { factory, deployer } = await v3CoreFactoryFixture([wallet], provider)

  const router = (await (
    await ethers.getContractFactory('MockTimeSwapRouter')
  ).deploy(deployer.address, factory.address, weth9.address)) as MockTimeSwapRouter

  return { factory, weth9, router, deployer }
}
