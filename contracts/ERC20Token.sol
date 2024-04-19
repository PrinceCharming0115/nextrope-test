pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {
  constructor(uint256 _supplies) ERC20("ERC20Token", "NR20") {
    _mint(msg.sender, _supplies);
  }
}