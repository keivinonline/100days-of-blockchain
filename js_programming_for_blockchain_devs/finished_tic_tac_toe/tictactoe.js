// get items
let $cellList = document.querySelectorAll(".js-cell");
let $nextPlayer = document.querySelector(".next-player");
let $playerWon = document.querySelector(".js-winner");
let $resetBtn = document.getElementById("reset-btn");
// State space
let gameBoard = new Array(9).fill(null);
let currentPlayerSymbol = "O";
let isGameOverBool = false;

function clickHandler(event) {
    // access the data-index attribute
    const boardIndex = event.target.dataset.index;
    let $cellValue = document.querySelector(`[data-index='${boardIndex}']`);
    console.log(event.target);
    console.log($cellValue);

    // computations
    if (isGameOverBool !== true) {
        // notify next player
        $nextPlayer.innerText = `Next player: ${currentPlayerSymbol} `;

        // let use click on board
        if ($cellValue.innerText.includes("-")) {
            currentPlayerSymbol = currentPlayerSymbol === "X" ? "O" : "X";
            gameBoard[boardIndex] = currentPlayerSymbol;
            // render to board
            $cellValue.innerText = currentPlayerSymbol;
            // get new val
            isGameOverBool = isGameOver(gameBoard, currentPlayerSymbol);
        }
    } else {
        event.preventDefault();
    }
}

function resetHandler(event) {
    console.log(event.target);
    // clear board
    for (id of[...Array(9).keys()]) {
        console.log(id);
        let $cellValue = document.querySelector(`[data-index='${id}']`);
        console.log($cellValue);
        $cellValue.innerText = "-";
    }
    // clear messages
    $nextPlayer.innerText = "Next player: X";
    $playerWon.innerText = "No winner yet !";
    // clear
    gameBoard = new Array(9).fill(null);
    currentPlayerSymbol = "O";
    isGameOverBool = false;
    // popup
    alert("Board has been reset!");
}
// event listeners
for (let cell of $cellList) {
    cell.addEventListener("click", clickHandler);
}
$resetBtn.addEventListener("click", resetHandler);

function hasLastMoverWon(lastMove, gameBoard) {
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
        if (
            gameBoard[i1] === lastMove &&
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
        $playerWon.innerText = `Congratulations, ${currentPlayerSymbol} has won the game`;
        return true;
    }
    // 2. check if the board is full
    if (gameBoard.every((element) => element !== null)) {
        $playerWon.innerText = "It's a draw! Game Over";
        return true;
    }
    return false;
}