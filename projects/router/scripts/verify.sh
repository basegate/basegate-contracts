#!/bin/bash
echo -e "\033[1;36mSmartRouter contracts\033[0m"

CONTRACTS_JSON="../../deployments/$NETWORK.json"

if [[ ! -f "$CONTRACTS_JSON" ]]; then
    echo "Error: $CONTRACTS_JSON not found."
    exit 1
fi

read -p "Enter the address for WNATIVE: " WNATIVE
read -p "Enter the address for V2Factory: " V2Factory
read -p "Enter the address for stableFactory: " StableFactory
read -p "Enter the address for stableInfo: " StableInfo

BaseGatePoolDeployer=$(jq -r '.BaseGatePoolDeployer' "$CONTRACTS_JSON")
BaseGateFactory=$(jq -r '.BaseGateFactory' "$CONTRACTS_JSON")
NonfungiblePositionManager=$(jq -r '.NonfungiblePositionManager' "$CONTRACTS_JSON")
SmartRouterHelper=$(jq -r '.SmartRouterHelper' "$CONTRACTS_JSON")
SmartRouter=$(jq -r '.SmartRouter' "$CONTRACTS_JSON")
MixedRouteQuoterV1=$(jq -r '.MixedRouteQuoterV1' "$CONTRACTS_JSON")
QuoterV2=$(jq -r '.QuoterV2' "$CONTRACTS_JSON")
TokenValidator=$(jq -r '.TokenValidator' "$CONTRACTS_JSON")

echo -e "\033[1;33m[1/5] Verify SmartRouterHelper\033[0m"
npx hardhat verify "$SmartRouterHelper" --network "$NETWORK"

echo -e "\033[1;33m[2/5] Verify SmartRouter\033[0m"
npx hardhat verify "$SmartRouter" --network "$NETWORK" "$V2Factory" "$BaseGatePoolDeployer" "$BaseGateFactory" "$NonfungiblePositionManager" "$StableFactory" "$StableInfo" "$WNATIVE"

echo -e "\033[1;33m[3/5] Verify MixedRouteQuoterV1\033[0m"
npx hardhat verify "$MixedRouteQuoterV1" --network "$NETWORK" "$BaseGatePoolDeployer" "$BaseGateFactory" "$V2Factory" "$StableFactory" "$WNATIVE"

echo -e "\033[1;33m[4/5] Verify QuoterV2\033[0m"
npx hardhat verify "$QuoterV2" --network "$NETWORK" "$BaseGatePoolDeployer" "$BaseGateFactory" "$WNATIVE"

echo -e "\033[1;33m[5/5] Verify TokenValidator\033[0m"
npx hardhat verify "$TokenValidator" --network "$NETWORK" "$V2Factory" "$NonfungiblePositionManager"
