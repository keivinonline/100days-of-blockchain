pragma solidity 0.7.5;

contract DataLocation {

    //1. storage - persistent data storage
    //2. memory - temporary data storage
    //3. calldata - similar to memory but READ-ONLY

    // storage - state variables 
    uint data = 123 ; // this will be stored forever even if value changes
    string lastText;
    // memory - temp data
    function getString(string memory text) public pure returns (string memory){
        lastText = text; 
        return lastText;
    }

    function getString2(string calldata text) public returns (string memory){
        text = "hello"; // can't be written to, as it is READ-ONLY
        return lastText;
    }
}