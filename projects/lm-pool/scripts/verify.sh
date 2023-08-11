#!/bin/bash
echo -e "\033[1;36mLMPool contract\033[0m"

CONTRACTS_JSON="../../deployments/$NETWORK.json"

if [[ ! -f "$CONTRACTS_JSON" ]]; then
    echo "Error: $CONTRACTS_JSON not found."
    exit 1
fi

MasterChefV3=$(jq -r '.MasterChefV3' "$CONTRACTS_JSON")
BaseGateLmPoolDeployer=$(jq -r '.BaseGateLmPoolDeployer' "$CONTRACTS_JSON")

echo -e "\033[1;33m[1/1] Verify MasterChefV3\033[0m"
npx hardhat verify "$BaseGateLmPoolDeployer" --network "$NETWORK" "$MasterChefV3"
