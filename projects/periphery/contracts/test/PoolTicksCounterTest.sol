// SPDX-License-Identifier: GPL-2.0-or-later
import '@basegate_io/core/contracts/interfaces/IBaseGatePool.sol';

pragma solidity >=0.6.0;

import '../libraries/PoolTicksCounter.sol';

contract PoolTicksCounterTest {
    using PoolTicksCounter for IBaseGatePool;

    function countInitializedTicksCrossed(
        IBaseGatePool pool,
        int24 tickBefore,
        int24 tickAfter
    ) external view returns (uint32 initializedTicksCrossed) {
        return pool.countInitializedTicksCrossed(tickBefore, tickAfter);
    }
}
