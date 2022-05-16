# Structure
```solidity
pragma solidity 0.7.5; 
```

## constructors 
- run only once when the contract is deployed
- used to initialize the contract properties/state

## pure and view
`pure` - does not interact anything outside the function
`view` - 

## Mapping
- key-value storage
- also called dictionarties, hashmaps
- Key -> value
    - e.g. Array[Balances] 
    - address key -> balance value
- one-way street
```
mapping(address->uint) balance
```
- quick lookup, least computations

## Visibility
1. External
- only from external contracts and services
2. Internal
- private contracts and contracts deriving from it
3. Private
- only from within the contract itself
4. Public
- Everyone and everywhere
- no restrictions

## Gas
- powers the EVM
- cost of execution
- payed by sender
- gas consumption is fixed based on operations
- price is not fixed as it's based on 
    - network congestion
    - eth price
- most expensive is storage

## Error Handling
1. require()
    - checks for valid conditions (e.g. check inputs, check token owner, has sufficient balance)
    - check inputs
    - revert
- usually beginning of the function
- normal for require() to throw an error
- sample
```
require(inputNumber > 0);

require(msg.sender == owner);
```
- sample revert
```
VM error: revert.
```
2. assert()
- test for internal errors
- check invariants
- should only throw an error when there is an actual error
- should not use this to check inputs
- assert statement at end of transfer function
- e.g. check if transfer is done correctly
- `invariant`
    - a concept/condition that is always true at a particular point of the code
    - e.g. after a full withdrawal of 100 usd, we can define an invariant that the balance should be 0 in theory. so we assert to check that invariant

## modifiers
- small function
- always runs at the beginning of a real function
```
// common throughout the contract
//modifier
modifier onlyOwner {
    require(msg.sender == owner);
    _; // replaced the main function body in theory
}

function addBalance(uint _toAdd) public onlyOwner returns(uint){
    balance[msg.sender] += _toAdd;
    return balance[msg.sender];
}

```

# Data locations
## locations
1. storage
- permanent storage, persistent over time and function execution
- 
2. memory
- used within function arguements and function body
- all value/simple data types do not need to have `memory` specified 
    - e.g. uint,int, bool, bytes, addresses, fixed sized array
- complex data types will require `memory` declaration
    - e.g. string
- any temporary variables are all saved in memory
3. calldata
- similar to memory but READ-ONLY

## Events
- logs data/events during function execution
- can add multiple logging points during execution
- `indexed` tells eth nodes to index it to be searchable 
- max 3 indexed params per event

```
    event balanceAdded(uint amount, address indexed depositedTo);

```
## payable functions
- balance of the smart contract is implicit. hence do not need to be keep tracked
```
    // "payable" allows receive of eth
    function deposit() public payable returns(uint){
        //balance[msg.sender] += msg.value; // this can be removed as redundant
        emit ethDeposited(msg.value, msg.sender);
        return balance[msg.sender];
    }

```

# Solidity and OOP reading assignment
- https://medium.com/coinmonks/solidity-and-object-oriented-programming-oop-191f8deb8316
- Inheritance
    - defining multiple contracts related to each other through parent-child relationships
- Parent and child contracts
- inheritance is about code-reusability 
- all public and internal scoped functions and state vars are available to derived contracts
- solidity copies base contract bytecode into derived contract
## Types of inheritance
1. Single
contract_a -> contract_b
2. multi-level
contract_a -> contract_b -> contract_c
3. hierarchical
contract_a -> contract_b
contract_a -> contract_c
4. multiple
contract_a -> contract_b
contract_a -> contract_c
contract_b, contract_c -> contract_d
- Solidity follows Python's C3 linearization AKA Method Resolution Order (MRO) which forces specific order in graphs of base contracts
- follows specific order (from base to the most derived contract)
## encapsulation
- 1 of the most important pillars in OOP
- process of hiding/allowing access to state vars for changing state
- pattern of declaring vars that cannot be accessed directly by clients but can only be modified using functions
###  Visibility modifiers such as 
    - external
    - public
    - internal
    - private

## polymorphism 
- having multiple forms
- 2 types which are 
### Function polymorphism
- declaring multiple functions within same contract or inheriting contracts having same name
- functions differ in param data types or no. of params
- return types are not taken into consideration to determine valid signatures for polymorphism (AKA method overloading)
```
pragma solidity ^0.4.19;
contract helloFunctionPloymorphism {
 
 function getVariableData(int8 data) public pure returns(int8 output) {
 return data;
 }
function getVariableData(int16 data) public pure returns(int16 output) {
 return data;
 }
}
```
### contract polymorphism
- using multiple contract instances interchangeably 
- helps in invoking derived contract functions using base contract instance
```
pragma solidity ^0.4.19;
contract ParentContract {
 uint internal simpleInteger;
function SetInteger(uint _value) public {
 simpleInteger = _value;
 }
function GetInteger() public view returns (uint) {
 return 10;
 }
}
contract ChildContract is ParentContract {
 
 function GetInteger() public view returns (uint) {
 return simpleInteger;
 }
}
```
## Abstract contract
- contracts with partial function definitions
- cannot create an instance of abstract contract
- helps to define contract structure
- any class inheriting from it must provide an implementation for them
- function signatures terminate with semicolon
```
contract abstractHelloWorld {
 function GetValue() public view returns (uint);
 function SetValue(uint _value) public;
function AddNumber(uint _value) public returns (uint) {
 return 10;
 }
}
contract HelloWorld is abstractHelloWorld{
 uint private simpleInteger;
function GetValue() public view returns (uint) {
 return simpleInteger;
 }
 
 function SetValue(uint _value) public {
 simpleInteger = _value;
 }
function AddNumber(uint _value) public returns (uint ){
 return simpleInteger = _value;
 }
}
```
## Interfaces
- are like bastract contracts but cannot contain any definition
- can only contain function declarations
- functions in interfacces cannot contain any code
- can only contain signature of functions


## What is the base contract?
- a parent contract where other contracts derive classes from it 
## Which functions are available for derived contracts?
- public and internal scoped functions/state vars 
## What is hierarchical inheritance?
- contract_a -> contract_b
- contract_a -> contract_c

## Deploying contracts with inheritance
- deploying the child contract will auto deploy the imported contract as well

## Creating function via `public` modifier
-
```
contract Ownable {
    // allow list for certain users
    address public owner;

```
## Destroyable contracts
- https://betterprogramming.pub/solidity-what-happens-with-selfdestruct-f337fcaa58a7
- `selfdestruct` renders a contract inoperable
- extrema ratio for malfunctioning contract
- opcode initiall named `SUICIDE` but renamed to `SELFDESTRUCT`
```
pragma solidity >0.6.0;
contract Storage {
 address payable private owner;
 uint256 number;
 constructor() {
  owner = msg.sender;
 }
 function store(uint256 num) public {
  number = num;
 }
 function retrieve() public view returns (uint256){
  return number;
 }
 
 function close() public { 
  selfdestruct(owner); 
 }
}
```
- after calling the `close()` function, any other interaction will be successfull but does nothing
