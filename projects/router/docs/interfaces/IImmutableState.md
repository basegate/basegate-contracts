# Solidity API

## IImmutableState

Functions that return immutable state of the router

### factoryV2

```solidity
function factoryV2() external view returns (address)
```

#### Return Values

| Name | Type    | Description                                 |
| ---- | ------- | ------------------------------------------- |
| [0]  | address | Returns the address of the BaseGate factory |

### positionManager

```solidity
function positionManager() external view returns (address)
```

#### Return Values

| Name | Type    | Description                                          |
| ---- | ------- | ---------------------------------------------------- |
| [0]  | address | Returns the address of BaseGate NFT position manager |
