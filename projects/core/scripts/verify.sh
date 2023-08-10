#!/bin/bash
echo -e "\033[1;36mYou selected: $NETWORK\033[0m"

echo -e "\033[1;33mVerify BaseGatePoolDeployer\033[0m"

read -p "Enter the address for BaseGatePoolDeployer: " ADDRESS1
npx hardhat verify $ADDRESS1 --network $NETWORK

echo -e "\033[1;33mVerify BaseGateFactory\033[0m"
read -p "Enter the address for BaseGateFactory: " ADDRESS2
npx hardhat verify $ADDRESS2 --network $NETWORK $ADDRESS1
