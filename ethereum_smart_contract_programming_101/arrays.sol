pragma solidity 0.7.5;

contract HelloWorld {
    int[] numbers1; // dynamic size. can use push function
    int[3] numbers2 = [1,2,3]; // fixed size with initalized vals
    
    function addNumber(int _number) public{
        numbers1.push(_number);
    }
    function getNumber(uint _index) public view returns(int){
        return numbers1[_index];
    }
    function getArray() public view returns(int[] memory){
        return numbers1;
    }
}