#!/bin/bash
echo -e "\033[1;36mMasterchef contract\033[0m"

CONTRACTS_JSON="../../deployments/$NETWORK.json"

if [[ ! -f "$CONTRACTS_JSON" ]]; then
    echo "Error: $CONTRACTS_JSON not found."
    exit 1
fi

read -p "Enter the address for WNATIVE: " WNATIVE
read -p "Enter the address for BGATE token: " BGATE

NonfungiblePositionManager=$(jq -r '.NonfungiblePositionManager' "$CONTRACTS_JSON")
MasterChefV3=$(jq -r '.MasterChefV3' "$CONTRACTS_JSON")

echo -e "\033[1;33m[1/1] Verify MasterChefV3\033[0m"
npx hardhat verify "$MasterChefV3" --network "$NETWORK" "$BGATE" "$NonfungiblePositionManager" "$WNATIVE"
