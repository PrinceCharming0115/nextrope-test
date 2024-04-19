pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SaleContract {
  address payable public seller; // The seller's address
  address payable public buyer; // The buyer's address
  address public arbitrator; // The arbitrator's address
  IERC20 public token; // The token used for payment
  uint256 public price; // The price of the item
  bool public buyerPaid = false; // Whether the buyer has paid
  bool public itemReceived = false; // Whether the item has been received

  constructor(
    address payable _seller,
    address _arbitrator,
    address _token,
    uint256 _price
  ) {
    seller = _seller; // Set the seller's address
    arbitrator = _arbitrator; // Set the arbitrator's address
    token = IERC20(_token); // Set the token contract
    price = _price; // Set the price of the item
  }

  function pay() public { // The buyer pays the price of the item
    require(msg.sender != seller, "Seller cannot pay"); // The seller cannot pay
    require(!buyerPaid, "Item already paid for"); // The item must not have been paid for
    require(token.transferFrom(msg.sender, address(this), price), "Transfer failed"); // Transfer the tokens to this contract

    buyer = payable(msg.sender);
    buyerPaid = true;
  }

  function confirmReceipt() public { // The buyer confirms receipt of the item
    require(msg.sender == buyer, "Only buyer can confirm receipt"); // Only the buyer can confirm receipt
    require(buyerPaid, "Item not yet paid for"); // The item must have been paid for

    itemReceived = true;
  }

  function resolveDispute() public { // The arbitrator resolves the dispute
    require(msg.sender == arbitrator, "Only arbitrator can resolve dispute"); // Only the arbitrator can resolve the dispute

    itemReceived = true;
  }

  function withdraw() public { // The seller withdraws the payment
    require(itemReceived, "Item not received yet"); // The item must have been received
    require(token.transfer(seller, price), "Transfer failed"); // Transfer the tokens to the seller
  }
}