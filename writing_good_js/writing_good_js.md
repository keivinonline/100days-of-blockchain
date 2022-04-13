# writing good JS
## solving formula
1. state space
2. computation
- sequence
- selection
- iteration
3. return value
## optional arguments
```js
function tickersToList2(crypto, isOrdered = false) {}

```
## top-down solving
- what it takes to solve the problem
- break into steps

### tic-tac-toe programs
- data structure choices
1. [WRONG] objects are NOT ITERABLE !
```js
{
    firstRow: {
        firstCol: 'X',
        secondCol: null,
        thirdCol: null
    },
    secondRow: {
        firstCol: 'X',
        secondCol: null,
        thirdCol: null
    },
    thirdRow: {
        firstCol: 'X',
        secondCol: null,
        thirdCol: null
    }
}
```
2. arrays of arrays
```js
let gameBoard = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
]
```