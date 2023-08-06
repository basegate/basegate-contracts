# Solidity API

## IBaseGateMintCallback

Any contract that calls IBaseGatePoolActions#mint must implement this interface

### BaseGateMintCallback

```solidity
function BaseGateMintCallback(uint256 amount0Owed, uint256 amount1Owed, bytes data) external
```

Called to `msg.sender` after minting liquidity to a position from IBaseGatePool#mint.

_In the implementation you must pay the pool tokens owed for the minted liquidity.
The caller of this method must be checked to be a BaseGatePool deployed by the canonical BaseGateFactory._

#### Parameters

| Name        | Type    | Description                                                                  |
| ----------- | ------- | ---------------------------------------------------------------------------- |
| amount0Owed | uint256 | The amount of token0 due to the pool for the minted liquidity                |
| amount1Owed | uint256 | The amount of token1 due to the pool for the minted liquidity                |
| data        | bytes   | Any data passed through by the caller via the IBaseGatePoolActions#mint call |
