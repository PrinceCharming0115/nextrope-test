# Ethereum Sale Contract

This project is a simple Ethereum smart contract for selling tangible items in exchange for ETH or any ERC-20 token. It includes the role of an arbitrator to resolve disputes.

## Features

- Allows a seller to list an item for sale
- Allows a buyer to purchase the item
- Includes an arbitrator to resolve disputes
- Supports both ETH and ERC-20 tokens

## Prerequisites

- Node.js
- npm
- Hardhat
- Solidity

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/yourrepository.git
```

2. Install the dependencies:
```bash
cd yourrepository
npm install
```

3. Copy the .env.example file to a new file named .env and fill in your Ethereum private key and Infura project ID:
```bash
cp .env.example .env
```

## Usage

To compile the contracts, run:

```bash
npx hardhat compile
```

To test the contracts, run:

```bash
npx hardhat test
```

To deploy the contracts to the local Hardhat Network, run:

```bash
npx hardhat run scripts/deploy.js
```