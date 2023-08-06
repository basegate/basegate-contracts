// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;

import '@basegate_io/core/contracts/interfaces/IBaseGateFactory.sol';
import '@basegate_io/core/contracts/interfaces/IBaseGatePool.sol';

import './PeripheryImmutableState.sol';
import '../interfaces/IPoolInitializer.sol';

/// @title Creates and initializes V3 Pools
abstract contract PoolInitializer is IPoolInitializer, PeripheryImmutableState {
    /// @inheritdoc IPoolInitializer
    function createAndInitializePoolIfNecessary(
        address token0,
        address token1,
        uint24 fee,
        uint160 sqrtPriceX96
    ) external payable override returns (address pool) {
        require(token0 < token1);
        pool = IBaseGateFactory(factory).getPool(token0, token1, fee);

        if (pool == address(0)) {
            pool = IBaseGateFactory(factory).createPool(token0, token1, fee);
            IBaseGatePool(pool).initialize(sqrtPriceX96);
        } else {
            (uint160 sqrtPriceX96Existing, , , , , , ) = IBaseGatePool(pool).slot0();
            if (sqrtPriceX96Existing == 0) {
                IBaseGatePool(pool).initialize(sqrtPriceX96);
            }
        }
    }
}
