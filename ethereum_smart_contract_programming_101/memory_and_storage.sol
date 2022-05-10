pragma solidity 0.7.5;

contract MemoryAndStorage {

    mapping(uint => User) users;

    struct User{
        uint id;
        uint balance;
    }

    function adduser(uint id, uint balance) public {
        users[id] = User(id, balance);
    }

    function updateBalance(uint id, uint balance) public {
        // error from assignment
        //User memory user = users[id];
        //user.balance = balance;

        // my solution
        users[id].balance = balance;

        // solution 1
        User storage user = users[id]; // use the pointer that points to storage
        user.balance = balance;
    }

    function getBalance(uint id) view public returns (uint){
        return users[id].balance;
    }
}