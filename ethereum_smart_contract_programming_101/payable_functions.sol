pragma solidity 0.7.5;

contract Bank {
    // events - "in
    event ethDeposited(uint amount, address indexed depositedTo);
    event ethWithdrawn(uint amount, address indexed withdrawnTo);
    event amountTransferred(uint amount, address indexed fromAddress, address indexed toAddress);

    mapping(address => uint) balance;
    // allow list for certain users
    address owner;

    //modifier
    modifier onlyOwner {
        require(msg.sender == owner);
        _; //
    }
    modifier costs(uint price) {
        require(msg.value >= price);
        _; // run the function
    }

    constructor(){
        owner = msg.sender; // owner of the contract 
    }
    
    function getOwner() public view returns(address){
        return owner;
    }

    // "payable" allows receive of eth
    function deposit() public payable returns(uint){
        balance[msg.sender] += msg.value; // this can be removed as redundant
        emit ethDeposited(msg.value, msg.sender);
        return balance[msg.sender];
    }

    function withdraw(uint amount) public returns(uint){
        // prevents drain with internal mapping 
        require(balance[msg.sender] >= amount, "Insufficient funds!");

        // method 1
        //address payable toSend = msg.sender;
        //toSend.transfer(amount)
        
        // method 2 for own withdrawals
        msg.sender.transfer(amount); // this allows contract drain
        balance[msg.sender] -= amount;
        emit ethWithdrawn(amount, msg.sender);
        return balance[msg.sender];
    }

    function getBalance() public view returns(uint){
        return balance[msg.sender];
    }

    function transfer(address recipient, uint amount) public{
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