contract Ownable {
    // allow list for certain users
    address public owner;

    //modifier
    modifier onlyOwner {
        require(msg.sender == owner);
        _; //
    }
    
    // initialize state variable
    constructor(){
        owner = msg.sender; // owner of the contract 
    }
    
}