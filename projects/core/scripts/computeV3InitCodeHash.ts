import { ethers } from 'hardhat'
import BaseGatePoolArtifact from '../artifacts/contracts/BaseGatePool.sol/BaseGatePool.json'

const hash = ethers.utils.keccak256(BaseGatePoolArtifact.bytecode)
console.log(hash)
