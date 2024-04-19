// test/ERC20Token.js
const { expect } = require("chai");

describe("ERC20Token", function () {
  it("Should mint 1000 tokens to owner", async function () {
    const [owner] = await ethers.getSigners();
    const ERC20Token = await ethers.getContractFactory("ERC20Token");
    const token = await ERC20Token.deploy(1000);
    await token.waitForDeployment();

    expect(await token.balanceOf(owner.address)).to.equal(1000);
  });
});