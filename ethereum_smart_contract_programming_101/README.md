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