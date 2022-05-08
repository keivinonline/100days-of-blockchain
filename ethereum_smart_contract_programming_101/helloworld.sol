pragma solidity 0.7.5; // tells compiler what version to use

// contract name does need to match filename, but needs to be 1 word
contract HelloWorld { 
// contains all contract body

    // public means it can be called from anywhere
    function hello1() public pure returns(string memory){
        return "Hello world 1";
    }

    string message2 = "Hello world 2"; // var will be accessible in the whole contract
    // 'pure' is removed as the function now interacts with the var outside of the func
    function hello2() public view returns(string memory){
        return message2;
    }

    function hello3() public pure returns(string memory){
        string memory message3 = "hello world 3"; // requires 'memory' data location
        return message3;
    }
}
