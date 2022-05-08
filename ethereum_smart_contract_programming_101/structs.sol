pragma solidity 0.7.5;

contract HelloWorld {

    // Properties of an object
    struct Person {
        uint age;
        string name;
    }

    Person[] people; // array of Person

    function addPerson(uint _age, string memory _name) public {
        Person memory newPerson = Person(_age, _name); // create an instance 
        people.push(newPerson);
    }

    function getPerson(uint _index) public view returns(uint,  string memory){
        Person memory personToReturn = people[_index];
        
        return (personToReturn.age, personToReturn.name);
    }
}