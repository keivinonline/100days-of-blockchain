pragma solidity 0.7.5;
import "./Ownable.sol";

// inherits Ownable contract
contract Bank is Ownable {

    mapping(address => uint) balance;

    modifier costs(uint price) {
        require(msg.value >= price);
        _; // run the function
    }


    function getOwner() public view returns(address){
        return owner;
    }


    function addBalance(uint _toAdd) public onlyOwner returns(uint){
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
        
        // save balance
        uint previousSenderBalance = balance[msg.sender];

        _transfer(msg.sender, recipient, amount);

        //event logs and further checks
        // assert the invariant to be true
        assert(balance[msg.sender] == previousSenderBalance - amount);
    }

    // private functions
    function _transfer(address from, address to, uint amount) private {
        // reduce balance of sender
        balance[from] -= amount;
        // increase balance of recipient
        balance[to] += amount;
    }

}