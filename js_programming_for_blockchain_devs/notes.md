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