pragma solidity 0.7.5;

contract DataLocation {

    //1. storage - persistent data storage
    //2. memory - temporary data storage
    //3. calldata - similar to memory but READ-ONLY

    // storage - state variables 
    uint data = 123 ; // this will be stored forever even if value changes
    string lastText = "hello keivin";

    function setString(string memory text) public {
        lastText = text; // this will set storage variable to memory var
    }

    function getString() public view returns(string memory){
        return lastText;
    }
}