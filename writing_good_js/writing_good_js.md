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
// index of gameboard
/* 
012
345
678
*/

let winnerCombos = [
    // horizontal winners
    [0,1,2],
    [3,4,5],
    [6,7,8],
    // vertical winners
    [0,3,6],
    [1,4,7],
    [2,5,8],
    // diagonal winners
    [0,4,8],
    [2,4,6]
]
```
3. 

## destructuring
- aking to python's unpacking ? 
```js
let combo = [2,4,6]
let [i1,i2,i3] = combo
i1
> 2
i2
> 4
i3
> 6
```

## ?? operator
```js
null ?? "anything"
> "anything"

'X' ?? "anything"
> 'X'
```
## every method for arrays
```js
gameBoard = new Array(9).fill(null);
// checks if null is in any of the element
gameBoard.every(element => element !== null)
> true
```

# sort()
```js
arr = [5,55,1,4,11]
arr.sort()
> [1, 11, 4, 5, 55]
```
## proper sorting
```js
function comparator(a,b){
    return a - b
}

arr = [5,55,1,4,11]
arr.sort(comparator)
> [ 1, 4, 5, 11, 55 ]
```
## shorthand for comparator
```js
arr = [5,55,1,4,11]
arr.sort((a,b) => a - b)
```