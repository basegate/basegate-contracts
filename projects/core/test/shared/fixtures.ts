import { BigNumber } from 'ethers'
import { ethers } from 'hardhat'
import { MockTimeBaseGatePool } from '../../typechain-types/contracts/test/MockTimeBaseGatePool'
import { TestERC20 } from '../../typechain-types/contracts/test/TestERC20'
import { BaseGateFactory } from '../../typechain-types/contracts/BaseGateFactory'
import { BaseGatePoolDeployer } from '../../typechain-types/contracts/BaseGatePoolDeployer'
import { TestBaseGateCallee } from '../../typechain-types/contracts/test/TestBaseGateCallee'
import { TestBaseGateRouter } from '../../typechain-types/contracts/test/TestBaseGateRouter'
import { MockTimeBaseGatePoolDeployer } from '../../typechain-types/contracts/test/MockTimeBaseGatePoolDeployer'
import BaseGateLmPoolArtifact from '@basegate_io/lm-pool/artifacts/contracts/BaseGateLmPool.sol/BaseGateLmPool.json'

import { Fixture } from 'ethereum-waffle'

interface FactoryFixture {
  factory: BaseGateFactory
}

interface DeployerFixture {
  deployer: BaseGatePoolDeployer
}

async function factoryFixture(): Promise<FactoryFixture> {
  const { deployer } = await deployerFixture()
  const factoryFactory = await ethers.getContractFactory('BaseGateFactory')
  const factory = (await factoryFactory.deploy(deployer.address)) as BaseGateFactory
  return { factory }
}
async function deployerFixture(): Promise<DeployerFixture> {
  const deployerFactory = await ethers.getContractFactory('BaseGatePoolDeployer')
  const deployer = (await deployerFactory.deploy()) as BaseGatePoolDeployer
  return { deployer }
}

interface TokensFixture {
  token0: TestERC20
  token1: TestERC20
  token2: TestERC20
}

async function tokensFixture(): Promise<TokensFixture> {
  const tokenFactory = await ethers.getContractFactory('TestERC20')
  const tokenA = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenB = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenC = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20

  const [token0, token1, token2] = [tokenA, tokenB, tokenC].sort((tokenA, tokenB) =>
    tokenA.address.toLowerCase() < tokenB.address.toLowerCase() ? -1 : 1
  )

  return { token0, token1, token2 }
}

type TokensAndFactoryFixture = FactoryFixture & TokensFixture

interface PoolFixture extends TokensAndFactoryFixture {
  swapTargetCallee: TestBaseGateCallee
  swapTargetRouter: TestBaseGateRouter
  createPool(
    fee: number,
    tickSpacing: number,
    firstToken?: TestERC20,
    secondToken?: TestERC20
  ): Promise<MockTimeBaseGatePool>
}

// Monday, October 5, 2020 9:00:00 AM GMT-05:00
export const TEST_POOL_START_TIME = 1601906400

export const poolFixture: Fixture<PoolFixture> = async function (): Promise<PoolFixture> {
  const { factory } = await factoryFixture()
  const { token0, token1, token2 } = await tokensFixture()

  const MockTimeBaseGatePoolDeployerFactory = await ethers.getContractFactory('MockTimeBaseGatePoolDeployer')
  const MockTimeBaseGatePoolFactory = await ethers.getContractFactory('MockTimeBaseGatePool')

  const calleeContractFactory = await ethers.getContractFactory('TestBaseGateCallee')
  const routerContractFactory = await ethers.getContractFactory('TestBaseGateRouter')

  const swapTargetCallee = (await calleeContractFactory.deploy()) as TestBaseGateCallee
  const swapTargetRouter = (await routerContractFactory.deploy()) as TestBaseGateRouter

  const BaseGateLmPoolFactory = await ethers.getContractFactoryFromArtifact(BaseGateLmPoolArtifact)

  return {
    token0,
    token1,
    token2,
    factory,
    swapTargetCallee,
    swapTargetRouter,
    createPool: async (fee, tickSpacing, firstToken = token0, secondToken = token1) => {
      const mockTimePoolDeployer = (await MockTimeBaseGatePoolDeployerFactory.deploy()) as MockTimeBaseGatePoolDeployer
      const tx = await mockTimePoolDeployer.deploy(
        factory.address,
        firstToken.address,
        secondToken.address,
        fee,
        tickSpacing
      )

      const receipt = await tx.wait()
      const poolAddress = receipt.events?.[0].args?.pool as string

      const mockTimeBaseGatePool = MockTimeBaseGatePoolFactory.attach(poolAddress) as MockTimeBaseGatePool

      await (
        await factory.setLmPool(
          poolAddress,
          (
            await BaseGateLmPoolFactory.deploy(poolAddress, ethers.constants.AddressZero, Math.floor(Date.now() / 1000))
          ).address
        )
      ).wait()

      return mockTimeBaseGatePool
    },
  }
}
