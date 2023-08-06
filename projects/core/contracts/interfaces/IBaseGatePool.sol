// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

import './pool/IBaseGatePoolImmutables.sol';
import './pool/IBaseGatePoolState.sol';
import './pool/IBaseGatePoolDerivedState.sol';
import './pool/IBaseGatePoolActions.sol';
import './pool/IBaseGatePoolOwnerActions.sol';
import './pool/IBaseGatePoolEvents.sol';

/// @title The interface for a BaseGate Pool
/// @notice A BaseGate pool facilitates swapping and automated market making between any two assets that strictly conform
/// to the ERC20 specification
/// @dev The pool interface is broken up into many smaller pieces
interface IBaseGatePool is
    IBaseGatePoolImmutables,
    IBaseGatePoolState,
    IBaseGatePoolDerivedState,
    IBaseGatePoolActions,
    IBaseGatePoolOwnerActions,
    IBaseGatePoolEvents
{

}
