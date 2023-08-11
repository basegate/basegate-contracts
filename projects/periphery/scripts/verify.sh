#!/bin/bash
echo -e "\033[1;36mPeriphery contracts\033[0m"

CONTRACTS_JSON="../../deployments/$NETWORK.json"

if [[ ! -f "$CONTRACTS_JSON" ]]; then
    echo "Error: $CONTRACTS_JSON not found."
    exit 1
fi

read -p "Enter the address for WNATIVE: " WNATIVE
BaseGatePoolDeployer=$(jq -r '.BaseGatePoolDeployer' "$CONTRACTS_JSON")
BaseGateFactory=$(jq -r '.BaseGateFactory' "$CONTRACTS_JSON")
SwapRouter=$(jq -r '.SwapRouter' "$CONTRACTS_JSON")
NonfungibleTokenPositionDescriptor=$(jq -r '.NonfungibleTokenPositionDescriptor' "$CONTRACTS_JSON")
NonfungiblePositionManager=$(jq -r '.NonfungiblePositionManager' "$CONTRACTS_JSON")
BaseGateInterfaceMulticall=$(jq -r '.BaseGateInterfaceMulticall' "$CONTRACTS_JSON")
V3Migrator=$(jq -r '.V3Migrator' "$CONTRACTS_JSON")
TickLens=$(jq -r '.TickLens' "$CONTRACTS_JSON")
QuoterV2=$(jq -r '.QuoterV2' "$CONTRACTS_JSON")

echo -e "\033[1;33m[1/7] Verify SwapRouter\033[0m"
npx hardhat verify "$SwapRouter" --network "$NETWORK" "$BaseGatePoolDeployer" "$BaseGateFactory" "$WNATIVE"

echo -e "\033[1;33m[2/7]Verify NonfungibleTokenPositionDescriptor\033[0m"
npx hardhat verify "$NonfungibleTokenPositionDescriptor" --network "$NETWORK"

echo -e "\033[1;33m[3/7] Verify NonfungiblePositionManager\033[0m"
npx hardhat verify "$NonfungiblePositionManager" --network "$NETWORK" "$BaseGatePoolDeployer" "$BaseGateFactory" "$WNATIVE" "$NonfungibleTokenPositionDescriptor"

echo -e "\033[1;33m[4/7] Verify BaseGateInterfaceMulticall\033[0m"
npx hardhat verify "$BaseGateInterfaceMulticall" --network "$NETWORK"

echo -e "\033[1;33m[5/7] Verify V3Migrator\033[0m"
npx hardhat verify "$V3Migrator" --network "$NETWORK" "$BaseGatePoolDeployer" "$BaseGateFactory" "$WNATIVE" "$NonfungiblePositionManager"

echo -e "\033[1;33m[6/7] Verify TickLens\033[0m"
npx hardhat verify "$TickLens" --network "$NETWORK"

echo -e "\033[1;33m[7/7] Verify QuoterV2\033[0m"
npx hardhat verify "$QuoterV2" --network "$NETWORK" "$BaseGatePoolDeployer" "$BaseGateFactory" "$WNATIVE"