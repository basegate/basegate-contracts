# Solidity API

## IBaseGateSwapCallback

Any contract that calls IBaseGatePoolActions#swap must implement this interface

### BaseGateSwapCallback

```solidity
function BaseGateSwapCallback(int256 amount0Delta, int256 amount1Delta, bytes data) external
```

Called to `msg.sender` after executing a swap via IBaseGatePool#swap.

_In the implementation you must pay the pool tokens owed for the swap.
The caller of this method must be checked to be a BaseGatePool deployed by the canonical BaseGateFactory.
amount0Delta and amount1Delta can both be 0 if no tokens were swapped._

#### Parameters

| Name         | Type   | Description                                                                                                                                                                             |
| ------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| amount0Delta | int256 | The amount of token0 that was sent (negative) or must be received (positive) by the pool by the end of the swap. If positive, the callback must send that amount of token0 to the pool. |
| amount1Delta | int256 | The amount of token1 that was sent (negative) or must be received (positive) by the pool by the end of the swap. If positive, the callback must send that amount of token1 to the pool. |
| data         | bytes  | Any data passed through by the caller via the IBaseGatePoolActions#swap call                                                                                                            |
