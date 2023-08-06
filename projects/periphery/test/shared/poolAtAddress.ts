import { abi as POOL_ABI } from '@basegate_io/core/artifacts/contracts/BaseGatePool.sol/BaseGatePool.json'
import { Contract, Wallet } from 'ethers'
import { IBaseGatePool } from '../../typechain-types'

export default function poolAtAddress(address: string, wallet: Wallet): IBaseGatePool {
  return new Contract(address, POOL_ABI, wallet) as IBaseGatePool
}
