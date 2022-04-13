// 1. state space
// 2. computations - sequence, selection, iterations
// 3. return value

function sumFirstN(n) {
    let sum = 0

    if (n < 0) {
        sum = NaN
    } else {
        for (let i = 1; i <= n; i += 1) {
            sum += i
        }
    }
    return sum
}

// simplified
function sumFirstNv2(n) {

    if (n < 0 || typeof(n) !== 'number') {
        return NaN
    }
    return n * (n + 1) / 2

}


// exercise 
const cryptos = ['BTC', 'ETH', 'USDC', 'ADA', 'DOT']

function tickersToList(cryptos, isOrdered = false) {
    // state space
    let listItems = []

    // computation
    /// check for non-array and non-bool
    if (!Array.isArray(cryptos) || typeof(isOrdered) !== 'boolean') {
        return NaN
    }
    /// continue of is valid array
    for (let crypto of cryptos) {
        listItems.push(`<li>${crypto}</li>`)
    }
    return `
        ${isOrdered ? '<ol>': '<ul>'}
            ${listItems.join('')}
        ${isOrdered ? '</ol>': '<ul>'}
    `
}
// v2 
function tickersToList2(cryptos, isOrdered = false) {
    // state space
    let listItems = []
    let listType = isOrdered ? 'o' : 'u'

    // computation
    /// check for non-array and non-bool
    if (!Array.isArray(cryptos) || typeof(isOrdered) !== 'boolean') {
        return NaN
    }
    /// continue of is valid array
    for (let crypto of cryptos) {
        listItems.push(`<li>${crypto}</li>`)
    }
    return `
        <${listType}l>
            ${listItems.join('')}
        </${listType}l>
    `
}

// tic tac toe game
function getUserInput(userPlayerSymbol) {

}

function isMoveValid(coordinates, gameBoard) {

}

function makeAMove(gameBoard, nextPlayerSymbol) {
    // clone the gameBoard before placing moves in it
    do {
        let coordinates = getUserInput()
    } while (!isMoveValid(coordinates, gameBoard))
    // return newGameBoard

}

function isGameOver(gameBoard) {
    // 1. check if there is a winer
    // 2. check if the board is full

    // Return : winner/draw Or game is in progress
}

function ticTacToe() {
    // state space
    let gameBoard = undefined
    let players = ['X', 'O']
    let nextPlayerIndex = 0

    // computations
    while (!isGameOver) {
        gameBoard = makeAMove(gameBoard, nextPlayerIndex)

    }

}