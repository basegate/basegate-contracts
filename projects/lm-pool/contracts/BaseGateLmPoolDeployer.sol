// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;

import '@basegate/core/contracts/interfaces/IBaseGateFactory.sol';
import '@basegate/periphery/contracts/interfaces/INonfungiblePositionManager.sol';

import './BaseGateLmPool.sol';

/// @dev This contract is for Master Chef to create a corresponding LmPool when
/// adding a new farming pool. As for why not just create LmPool inside the
/// Master Chef contract is merely due to the imcompatibility of the solidity
/// versions.
contract BaseGateLmPoolDeployer {
    address public immutable masterChef;

    modifier onlyMasterChef() {
        require(msg.sender == masterChef, 'Not MC');
        _;
    }

    constructor(address _masterChef) {
        masterChef = _masterChef;
    }

    /// @dev Deploys a LmPool
    /// @param pool The contract address of the PancakeSwap V3 pool
    function deploy(IBaseGatePool pool) external onlyMasterChef returns (IBaseGateLmPool lmPool) {
        lmPool = new BaseGateLmPool(address(pool), masterChef, uint32(block.timestamp));
        IBaseGateFactory(INonfungiblePositionManager(IMasterChefV3(masterChef).nonfungiblePositionManager()).factory())
            .setLmPool(address(pool), address(lmPool));
    }
}
