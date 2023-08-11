#!/bin/bash
echo -e "\033[1;31mYou selected: $NETWORK\033[0m"
echo -e "\033[1;36mCore contracts\033[0m"

CONTRACTS_JSON="../../deployments/$NETWORK.json"

if [[ ! -f "$CONTRACTS_JSON" ]]; then
    echo "Error: $CONTRACTS_JSON not found."
    exit 1
fi

BaseGatePoolDeployer=$(jq -r '.BaseGatePoolDeployer' "$CONTRACTS_JSON")
BaseGateFactory=$(jq -r '.BaseGateFactory' "$CONTRACTS_JSON")

echo -e "\033[1;33m[1/2] Verify BaseGatePoolDeployer\033[0m"
npx hardhat verify "$BaseGatePoolDeployer" --network "$NETWORK"

echo -e "\033[1;33m[2/2] Verify BaseGateFactory\033[0m"
npx hardhat verify "$BaseGateFactory" --network "$NETWORK" "$BaseGatePoolDeployer"
