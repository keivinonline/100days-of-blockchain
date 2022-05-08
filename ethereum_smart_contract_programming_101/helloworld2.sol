pragma solidity 0.7.5;

contract HelloWorld2 {
    string message; // declare the var but not initialized

    constructor(string memory _message) { //_message is to avoid collision
        message = _message; // sets "_message" to "message" var
    }

    // "view" can READ from state variables but not WRITE
    function hello_view() public view returns(string memory){
        return message;
    }

    // no restrictive condition - can change state
    function hello_write() public returns(string memory){
        message = "altered hello world!";
        return message;
    }

    // "pure" does not interact anything outside the function
    function hello_basic() public pure returns(string memory){
        return "basic hello world";
    }
}