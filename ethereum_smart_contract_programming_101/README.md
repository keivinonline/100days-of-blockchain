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