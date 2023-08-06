// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./IBaseGatePool.sol";
import "./ILMPool.sol";

interface ILMPoolDeployer {
    function deploy(IBaseGatePool pool) external returns (ILMPool lmPool);
}
