pragma solidity 0.7.5;

contract Bank {
    // events - "in
    event balanceAdded(uint amount, address indexed depositedTo);
    event amountTransferred(uint amount, address indexed fromAddress, address indexed toAddress);
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
        // emit event
        emit balanceAdded(_toAdd, msg.sender);
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
        // emit event log
        amountTransferred(amount, msg.sender, recipient);

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