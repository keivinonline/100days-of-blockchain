pragma solidity 0.7.5;

contract HelloWorld {
    int number;

    function getNumber() public view returns(int){
        return number;
    }
    // using _ for input vars
    function setNumber(int _number) public {
        number = _number;
    }
}