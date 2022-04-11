function createTransaction(ticker, amount) {
    const transaction = {}
    transaction.amount = amount
    transaction.ticker = ticker
    return transaction
}
// create a 2Eth transaction
const newTransaction = createTransaction("ETH", 2e18)
newTransaction.amount = 3e18 // works 
const newTransaction = createTransaction("BTC", 2e18) // doesn't work

// shorthand notation for functions
const sum = (a, b) => a + b

// showing the right-associated nature of "=>"
const sumAB = a => b => a + b
sumAB(1)(2) // returns 3

// if-else statements
if (condition) {
    statement1
    statement2
} else if (condition2) {
    statement3
} else {
    statement4
}

// const number = +prompt("enter a number")
const number = Number.parseInt(prompt("Enter a number"))
if (Number.isNaN(number)) {
    console.log(`${number} is NaN`)
} else if (number % 2 === 1) {
    console.log(`${number} is even`)
} else {
    console.log(`${number} is odd`)
}

// switch cases for multiple cases
switch (number) {
    case 1:
        console.log("first case")
        break;
    case 2:
        console.log("second case")
        break;
    default:
        console.log("try again")
        break;
}

// basoc iteration