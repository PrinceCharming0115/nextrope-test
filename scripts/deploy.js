// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
require('dotenv').config();
const hre = require("hardhat");

const sellerAddress = process.env.SELLER_ADDRESS || "";
const arbitratorAddress = process.env.ARBITRATOR_ADDRESS || "";
const price = process.env.PRICE || 100;
const tokenSupplies = process.env.TOKEN_SUPPLIES || 1000;

let owner;

async function main() {
  [owner] = await hre.ethers.getSigners();

  const ERC20TokenContract = await hre.ethers.getContractFactory("ERC20Token"); // We get the contract to deploy
  const SaleContract = await hre.ethers.getContractFactory("SaleContract"); // We get the contract to deploy

  const erc20Token = await ERC20TokenContract.deploy(tokenSupplies); // We deploy the contract
  await erc20Token.waitForDeployment(); // We wait for the deployment to be confirmed
  const erc20TokenAddress = await erc20Token.getAddress(); // We get the address of the deployed contract
  console.log("ERC20Token deployed to: ", erc20TokenAddress);

  const saleContract = await SaleContract.deploy(sellerAddress, arbitratorAddress, erc20TokenAddress, price); // We deploy the contract
  await saleContract.waitForDeployment(); // We wait for the deployment to be confirmed
  const saleContractAddress = await saleContract.getAddress(); // We get the address of the deployed contract
  console.log("SaleContract deployed to: ", saleContractAddress); // We get the address of the deployed contract
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
