# Solidity API

## CallbackValidation

Provides validation for callbacks from BaseGate V3 Pools

### verifyCallback

```solidity
function verifyCallback(address deployer, address tokenA, address tokenB, uint24 fee) internal view returns (contract IBaseGatePool pool)
```

Returns the address of a valid BaseGate V3 Pool

#### Parameters

| Name     | Type    | Description                                                                       |
| -------- | ------- | --------------------------------------------------------------------------------- |
| deployer | address | The contract address of the BaseGate V3 Deployer                                  |
| tokenA   | address | The contract address of either token0 or token1                                   |
| tokenB   | address | The contract address of the other token                                           |
| fee      | uint24  | The fee collected upon every swap in the pool, denominated in hundredths of a bip |

#### Return Values

| Name | Type                   | Description                  |
| ---- | ---------------------- | ---------------------------- |
| pool | contract IBaseGatePool | The V3 pool contract address |

### verifyCallback

```solidity
function verifyCallback(address deployer, struct PoolAddress.PoolKey poolKey) internal view returns (contract IBaseGatePool pool)
```

Returns the address of a valid BaseGate V3 Pool

#### Parameters

| Name     | Type                       | Description                                      |
| -------- | -------------------------- | ------------------------------------------------ |
| deployer | address                    | The contract address of the BaseGate V3 deployer |
| poolKey  | struct PoolAddress.PoolKey | The identifying key of the V3 pool               |

#### Return Values

| Name | Type                   | Description                  |
| ---- | ---------------------- | ---------------------------- |
| pool | contract IBaseGatePool | The V3 pool contract address |
