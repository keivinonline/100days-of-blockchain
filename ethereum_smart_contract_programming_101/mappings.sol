// pragma solidity 0.7.5;
pragma solidity 0.8.13;

contract HelloWorld {

    mapping(address => uint) balance;

    function addBalance(uint _toAdd) public returns (uint){
        balance[msg.sender] += _toAdd;
        return balance[msg.sender];
    }

    function removeBalance(uint _toRemove) public returns (uint){
        balance[msg.sender] -= _toRemove;
        return balance[msg.sender];
    }

    function getBalance() public view returns(uint){
        return balance[msg.sender];
    }
}