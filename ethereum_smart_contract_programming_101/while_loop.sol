pragma solidity 0.7.5;

contract HelloWorld {

    function count(int number) public pure returns(int){
        int i = 0;
        while (i < 10){
            number++;
            i++;
        }
        return number;
    }
}