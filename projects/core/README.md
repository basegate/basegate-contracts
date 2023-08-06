# BaseGate

This repository contains the core smart contracts for the BaseGate Protocol.
For higher level contracts, see the [periphery](../periphery/)
repository.

## Local deployment

In order to deploy this code to a local testnet, you should install the npm package
`@basegate_io/core`
and import the factory bytecode located at
`@basegate_io/core/artifacts/contracts/BaseGateFactory.sol/BaseGateFactory.json`.
For example:

```typescript
import {
  abi as FACTORY_ABI,
  bytecode as FACTORY_BYTECODE,
} from '@basegate_io/core/artifacts/contracts/BaseGateFactory.sol/BaseGateFactory.json'

// deploy the bytecode
```

This will ensure that you are testing against the same bytecode that is deployed to
mainnet and public testnets, and all BaseGate code will correctly interoperate with
your local deployment.

## Using solidity interfaces

The BaseGate interfaces are available for import into solidity smart contracts
via the npm artifact `@basegate_io/core`, e.g.:

```solidity
import '@basegate_io/core/contracts/interfaces/IBaseGatePool.sol';

contract MyContract {
  IBaseGatePool pool;

  function doSomethingWithPool() {
    // pool.swap(...);
  }
}
```
