# Setting up and Hello Moralis
## setting up node version manager on wsl2
https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl

nvm install --lts

## hello world 
console.log("hello world"); # ; is optional
## running .js files
node hello-moralis.js 
## ebook resources
- Eloquent Javascript
    - chapter 1 to 4
    - chapter 5 onwards would come later
    - chapter 8 Bugs
    - chapter 11 Async programming is important
# Datatypes
## comments
// this is a comment
## numbers
// returns 0.30000000000000004 due to floating point arithmetics
0.1 + 0.2 
// modulus
5 % 2 // returns to 1
4 % 2 // returns to 0
// modern JS(2016 onwards)
2**8 // returns 256
## strings
// strings are list of characters
'ab' + 'cd'
> 'abcd'

## booleans
// true and false
!true
> false
!false
> true
## basic operations
5 % 2 == 1
> true
5 % 2 == '1'
> true
// === notation checks for data type
5 % 2 === 1
> true
## objects (dicts?)
{
    firstName: "kei",
    phoneNumber: '01230123',
    wallet : ['BTC','ETH','USDT']
}
## undefined
- value does not exist
## null
- defined but does not contain value
## editing last selected element in chrome via dev console
$0.innerHTML = `<h1>hello from the moon! ${5 % 2 === 1}</h1>`

## variables (old way)
var btcBalance = 0.0;
btcBalance
> 0
## variables (new way since 2015)
// block scoped
let ethBalance = 0.0;
ethBalance +1 = 0.1
ethBalance
> 0.1
// constants
const g = 9.81
g += 1 // error
## visualize code
https://pythontutor.com/ 
## inputs in browser
let name = prompt("enter your name")
alert(`Greetings ! ${name}`)
// concat in browser
let firstNum = prompt("enter first number")
let secondNum = prompt("enter 2nd number")
alert(`Sum ${firstNum + secondNum}`)
> 1234
// hacky way to convert to integers
let firstNum = +prompt("enter first number")
let secondNum = +prompt("enter 2nd number")
alert(`Sum ${firstNum + secondNum}`)
> 46
// proper way
let firstNum = Number.parseInt(prompt("enter first number"))
let secondNum = Number.parseInt(prompt("enter 2nd number"))
alert(`Sum ${firstNum + secondNum}`)
// misc
const ticker = prompt("Enter your ticker")
const amount = prompt("enter the amount")

console.log(`you just bought ${amount} ${ticker}`)

# objects
```js
const purchase = {
    ticker: ticker,
    amount: amount
}
```
- every object has prototype which allows method such as `toString()`
- can use dot notation `purchase.ticker`
- can use brancker notation `purchase['ticker']
- adding new keys in object 
```js
purchase.owner = {
    name: 'kei',
    accountNumber: '123123'
}
// chaining
purchase.owner.name
> 'keivin'
```
- optional chaining
```js
purchase.fakeowner.name
> TypeError
purchase.fakeowner?.name
> undefined
```

## arrays
- like lists
- getting last element
```js
let cheatCode = [11,12,13,14]
cheatCode[cheatCode.length  - 1] 
// better way to get last element
cheatCode.at(-1)
> 14
// lenth property
cheatCode.length
> 4 
cheatCode['length']
> 4
// slice
cheatCode.slice(-1)
// toString()
cheatCode.toString()
> '11,12,13,14'
// join()
cheatCode.join(":")
> '11:12:13:14'
// using join() method and innerHTML
document.body.innerHTML =   `<ul><li>${cheatCode.join('</li><li>')}</li></ul>`
'<ul><li>11</li><li>12</li><li>13</li><li>14</li></ul>'
```
// reverse()
let abc = ['a', 'b', 'c']
abc.reverse()
> ['c', 'b', 'a']

## cloning
- shallow cloning
```js
// via slice
newCheatCode = cheatCode.slice()
// via spread operator
const newCheatCode = [...cheatCode]
> [11, 12, 13, 14]
// enumerate twice via spread operator
[...cheatCode, ...cheatCode]
> [11, 12, 13, 14, 11, 12, 13, 14]
// via JSON.stringify
JSON.stringify(cheatCode)
> '[11,12,13,14]'
```


- deep cloning
    - values on multipe values
```js
// shallow copy does not work on arrays
let transactions = [
  {
    currency: 'BTC',
    amount: 0.2
  },
  {
    currency: 'ETH',
    amount: 1.2
  }
]

let clonedTransactions = [...transactions]
clonedTransactions[1].amount += 0.1
  
console.log(transactions)
> [ { currency: 'BTC', amount: 0.2 },
  { currency: 'ETH', amount: 1.3 } ]

console.log(clonedTransactions)
> [ { currency: 'BTC', amount: 0.2 },
  { currency: 'ETH', amount: 1.3 } ]
// deep closing via JSON parsing and stringify
let clonedTransaction = JSON.parse(JSON.stringify(transactions))
console.log(transactions)
> [ { currency: 'BTC', amount: 0.2 },
  { currency: 'ETH', amount: 1.2 } ]

console.log(clonedTransactions)
> [ { currency: 'BTC', amount: 0.2 },
  { currency: 'ETH', amount: 1.3 } ]
```
- properties that contain functions are called `methods`
- `toUpperCase()` is a method of a string
## non-binding names need ot be quoted in objects
```js
let actions = {
    work: "went to work",
    "jump around": "jump around the room",
}
```
## using delete on objects
```js
bodyParts = {
    arms: 2,
    legs: 2,
    head: 1
}
delete bodyParts.head
console.log("head" in bodyParts)
> False
console.log("arms" in bodyParts)
> Trues
```
## using Object.keys and values funcs
```js
Object.keys(bodyParts)
> ['arms', 'legs']
Object.values(bodyParts)
> [2, 2]
```
## `Object.assign` function
- copies all properties from 1 obj to another
```js
let objA = {a:1, b:2}
Object.assign(objA, {b:3,c:4})
objA
> { a: 1, b: 3, c: 4 }
```
## check types with `typeof`
```js
typeof []
> object
typeof ""
> string
```
# Mutability
- numbers, strings and bools are immutable
- objects are different
## comparing objects 
- JS compares identity
```js
let obj1 = {val:10}
let obj2 = obj1
let obj3 = {val:10}
console.log(obj1 == obj2) // points to same pointer/frame
> true
console.log(obj1 == obj3) // different identity
> false
obj1.val = 15
console.log(obj1)
> 15
console.log(obj2)
> 15
```
## const binding behavior
- object can't be changed but contents can
```js
> const score = {visitors:0, home: 0}
undefined
> score.visitors
0
> score.visitors = 1
1
> score
{ visitors: 1, home: 0 }
> score = {visitors:1,home:1}
Uncaught TypeError: Assignment to constant variable.
```
## pushing values 
```js
journal = []
// shorthand for events: events
function addEntry(events, slept){
    journal.push(events,slept)
}
addEntry(["work","eat"], false)
addEntry(["work","workmore"], true)
> journal
[
  { events: [ 'work', 'eat' ], slept: false },
  { events: [ 'work', 'workmore' ], slept: true }
]
// print events in journal
function printEvents(journal){
    for (let i = 0; i < journal.length; i ++){
        console.log(journal[i])
    }
}
printEvents(journal)
> { events: [ 'work', 'eat' ], werewolf: false }
> { events: [ 'sleep', 'play' ], werewolf: true }
```
## `includes` method
```js
journal[0].events.includes('work')
> true
```
## Array Loops
- classic JS
```js
for (let i = 0; i < journal.length; i ++){
    let entry = journal[i]
    console.log(entry)
}
```
- modern JS
```js
// of word will loop elements in object
for (let entry of journal){
    console.log(`${entry.events}`)
}
> work,eat
> sleep, play
ss
```
```js
// extract events and dedupe
function getEvents(journal){
    let events = []
    for (let entry of journal){
        for (event of entry.events){
            console.log(event)
            events.push(event)
        }   
    }
    return events
}
```
## slices
```js
let listA = [1,2,3,4,3]
listA.indexOf(1)
> 0
listA.indexOf(5)
> -1 // not found
listA.indexOf(3)
> 2
listA.lastIndexOf(3)
> 4
```
## concat
- glues array to make new array
```js
let listB = [1,2,3]
listB.concat([4,5])
listB
> [1,2,3,4,5]
// function which uses slice and concat
function indexRemove5(array, index){
    if (index == "" || index === undefined){
        return array
    } else {
        return array.slice(0,index)
        .concat(array.slice(index+1))
    }
}

```
## string and other properties
- strings, number and booleans are not objecs
- they do not store properties eventhough JS does not complain
```js
let kim = "Kim"
kim.age = 31
kim.age
> undefined
```
### string methods
- indexOf method in string can search more than 1 char
```js
let strA = "coconuts make you fat"
strA.indexOf("nuts")
> 4
// trim to remove any whitespace
let strB = "    okay what     "
strB.trim()
> "okay what"
// pad methods
String(7).padStart(3, "0")
> 007
// split 
let longStr = "try;to;seperate;me"
longStr.split(";")
> [ 'try', 'to', 'seperate', 'me' ]
// repeat strings
"LILO".repeat(3)
> "LILOLILOLILO"
```
## Rest Syntax
- via `...` elipses AKA spread 
- accept an array of arguments
```js
function findMaxStrLen(...inputStrings){
    let maxLengthStr = ""
    let maxLengthVal = 0
    for (let string of inputStrings){
        if (string.length >= maxLengthVal){
            maxLengthStr = string
            maxLengthVal = string.length
        }
    }
    return [ maxLengthStr, maxLengthVal ]
}
// allows spread of array into new array
let words = ["give", "you"]
let moreWords = ["never", "gonna", ...words, "up"]
moreWords
> [ 'never', 'gonna', 'give', 'you', 'you', 'up' ]
```
## Math object
- number related utility
```js
Math.random() // return random float
Math.floor(1.5)
> 1
Math.round(1.5)
> 2
```
## Destructuring
```js
let {name} = {name: "Kei", age: 31}
name
> "Kei"

```
## JSON
- serialize data into flat description
- widely used data storage and communication format on web
```js
let string = JSON.stringify(
    {
        bitcoinWhale : false,
        traits: [
            "big",
            "anon"
        ]
    }
)
JSON.parse(string).traits
> ['big','anon']
```
## Sumary
- most values have properties except for `null` and `undefined`
- accessing them via dot notation or regular dict notation

# bootstrap
- for example https://getbootstrap.com/
- css added top of html page
- JS bootstrap added before local js reference
- add whole `body` in side `container`
- add
## grid system
```html
<div class="col-12 col-md-6">
    <h1>Moralis Swap</h1>
</div>
```
- set default of `col-12` which spans 12 out of 12 cols for mobile
- `col-md-6` means for size above 768px(md), use 6 cols
## flex
