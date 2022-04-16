let gameBoard = new Array(9).fill(null);

function getGameBoard(gameBoard) {
    console.log(`${gameBoard[0]}-${gameBoard[1]}-${gameBoard[2]}`)
    console.log(`${gameBoard[3]}-${gameBoard[4]}-${gameBoard[5]}`)
    console.log(`${gameBoard[6]}-${gameBoard[7]}-${gameBoard[8]}`)
}

function getUserInputMove() {
    // limit to index
    let validIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    do {
        nextPlayerIndex = Number.parseInt(prompt("enter your move index 0 to 8"))
        console.log(nextPlayerIndex)
    } while (
        nextPlayerIndex < 0 ||
        nextPlayerIndex > 8 ||
        Number.isNaN(nextPlayerIndex)
    )
    return nextPlayerIndex
}

function isMoveValid(coordinates, gameBoard) {
    // checks if board coordinates is null
    return (gameBoard[coordinates] == null ? true : false)
}

function makeAMove(gameBoard, currentPlayerSymbol) {
    // clone the game board before placing moves in it
    do {
        coordinates = getUserInputMove()
    } while (!isMoveValid(coordinates, gameBoard));
    // return newGameBoard;
    gameBoard[coordinates] = currentPlayerSymbol
    return gameBoard
}

function hasLastMoverWon(lastSymbol, gameBoard) {
    let winnerCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let [i1, i2, i3] of winnerCombos) {
        if (gameBoard[i1] === lastSymbol &&
            gameBoard[i1] === gameBoard[i2] &&
            gameBoard[i1] === gameBoard[i3]
        ) {
            return true;
        }
    }
    return false;
}

function isGameOver(gameBoard, currentPlayerSymbol) {
    // 1. check if there is a winner 
    if (hasLastMoverWon(currentPlayerSymbol, gameBoard)) {
        // Write a message that last mover has won the game
        alert(`Congratulations, ${currentPlayerSymbol} has won the game`);
        return true;
    }
    // 2. check if the board is full
    if (gameBoard.includes(null)) {
        return false
    }

    // Return: winner/draw OR game is still in progress
    if (!gameBoard.includes(null)) {
        // Assume board is full and winner is not found
        alert(`It's a draw !`)
        return true
    }
}

function ticTacToe() {
    // State space 
    let gameBoard = new Array(9).fill(null);
    let players = ['x', 'o'];
    let nextPlayerIndex = 0;

    // Computations 
    do {
        // start with player X and take turns
        currentPlayerSymbol = (nextPlayerIndex % 2 == 0 ? players[0] : players[1])

        // increment for next player
        nextPlayerIndex += 1

        // message log
        console.log(`It's player ${currentPlayerSymbol}'s turn!`)

        gameBoard = makeAMove(gameBoard, currentPlayerSymbol);
        getGameBoard(gameBoard)


    } while (!isGameOver(gameBoard, currentPlayerSymbol));

    // Return value 
    // return undefined;
}