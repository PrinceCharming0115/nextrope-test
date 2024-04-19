// test/SaleContract.js
const { expect } = require("chai");

describe("SaleContract", function () {
  it("Should complete a sale successfully", async function () {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    const ERC20Token = await ethers.getContractFactory("ERC20Token");
    const token = await ERC20Token.deploy(1000);
    await token.waitForDeployment();
    const tokenAddress = await token.getAddress();

    const SaleContract = await ethers.getContractFactory("SaleContract");
    const sale = await SaleContract.deploy(addr1.address, addr3.address, tokenAddress, 100);
    await sale.waitForDeployment();
    const saleAddress = await sale.getAddress();

    await token.transfer(addr2.address, 100);
    await token.connect(addr2).approve(saleAddress, 100);
    await sale.connect(addr2).pay();
    expect(await sale.buyerPaid()).to.equal(true);

    await sale.connect(addr2).confirmReceipt();
    expect(await sale.itemReceived()).to.equal(true);

    await sale.connect(addr1).withdraw();
    expect(await token.balanceOf(addr1.address)).to.equal(100);
  });

  it("Should resolve a dispute", async function () {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    const ERC20Token = await ethers.getContractFactory("ERC20Token");
    const token = await ERC20Token.deploy(1000);
    await token.waitForDeployment();
    const tokenAddress = await token.getAddress();

    const SaleContract = await ethers.getContractFactory("SaleContract");
    const sale = await SaleContract.deploy(addr1.address, addr3.address, tokenAddress, 100);
    await sale.waitForDeployment();
    const saleAddress = await sale.getAddress();

    await token.transfer(addr2.address, 100);
    await token.connect(addr2).approve(saleAddress, 100);
    await sale.connect(addr2).pay();
    expect(await sale.buyerPaid()).to.equal(true);

    await sale.connect(addr3).resolveDispute();
    expect(await sale.itemReceived()).to.equal(true);

    await sale.connect(addr1).withdraw();
    expect(await token.balanceOf(addr1.address)).to.equal(100);
  });
});