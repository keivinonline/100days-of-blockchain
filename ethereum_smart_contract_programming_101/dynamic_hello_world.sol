pragma solidity 0.7.5;

contract HelloWorld2 {
    string message; // declare the var but not initialized

    constructor(string memory _message) { //_message is to avoid collision
        message = _message; // sets "_message" to "message" var
    }

    function hello() public returns (string memory){
        return message;
    }
}