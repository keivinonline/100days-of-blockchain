pragma solidity 0.7.5;

contract Bank {

    mapping(address => uint) balance;

    // allow list for certain users
    address owner;

    constructor(){
        owner = msg.sender; // owner of the contract 
    }
    
    function getOwner() public view returns(address){
        return owner;
    }


    function addBalance(uint _toAdd) public returns(uint){
        require(msg.sender == owner);
        balance[msg.sender] += _toAdd;
        return balance[msg.sender];
    }

    function getBalance() public view returns(uint){
        return balance[msg.sender];
    }

    function transfer(address recipient, uint amount) public {
        // check sender's balance >= amount
        require(balance[msg.sender] >= amount);
        // ensure sender != recipient
        require(msg.sender != recipient);
        
        _transfer(msg.sender, recipient, amount);

        // event logs and further checks
    }

    // private functions
    function _transfer(address from, address to, uint amount) private {
        // reduce balance of sender
        balance[from] -= amount;
        // increase balance of recipient
        balance[to] += amount;
    }

}