# BaseGate V3 Periphery

This repository contains the periphery smart contracts for the BaseGate V3 Protocol.
For the lower level core contracts, see the [v3-core](../v3-core/)
repository.

## Local deployment

In order to deploy this code to a local testnet, you should install the npm package
`@basegate_io/periphery`
and import bytecode imported from artifacts located at
`@basegate_io/periphery/artifacts/contracts/*/*.json`.
For example:

```typescript
import {
  abi as SWAP_ROUTER_ABI,
  bytecode as SWAP_ROUTER_BYTECODE,
} from '@basegate_io/periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json'

// deploy the bytecode
```

This will ensure that you are testing against the same bytecode that is deployed to
mainnet and public testnets, and all BaseGate code will correctly interoperate with
your local deployment.

## Using solidity interfaces

The BaseGate v3 periphery interfaces are available for import into solidity smart contracts
via the npm artifact `@basegate_io/periphery`, e.g.:

```solidity
import '@basegate_io/periphery/contracts/interfaces/ISwapRouter.sol';

contract MyContract {
  ISwapRouter router;

  function doSomethingWithSwapRouter() {
    // router.exactInput(...);
  }
}
```
