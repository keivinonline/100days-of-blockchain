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

// switch statements