pragma solidity 0.7.5;

contract Ownable {
    // declare address var
    address payable public owner;
    // initialize state var 
    constructor(){
        owner = msg.sender;
    }
    // create modifier
    modifier onlyOwner {
        require(msg.sender == owner, "sender is not the owner!");
        _;
    }


}