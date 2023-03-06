'use strict';

/**************************
 * Functions
 * ************************/

/**
 * Get Random Integer
 *
 * @param {*} min starting number
 * @param {*} max ending number
 * @return {*} 
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Create Board
 *
 * @param {*} boardContainer the element where attach the board
 * @param {*} cellNumber the number of cells
 */
function createBoard(boardContainer, cellNumber) {

    //TODO: posso delegarlo alla funzione che genera la board?
    //empty html
    boardContainer.innerHTML = '';

    //create fragment in memory
    let fragmentBoard = document.createDocumentFragment();

    //cycle cellNumber
    for (let i = 1; i <= cellNumber; i++) {
        const element = document.createElement('div');
        element.classList.add('cell');
        element.classList.add(`cell-${Math.sqrt(cellNumber)}`);
        element.innerText = i;
        fragmentBoard.append(element);
    }
    //append fragment to container
    boardContainer.append(fragmentBoard);

}
/**
 * Calculate Cells (number) based on level
 *
 * @param {*} level level number
 * @return {*} 
 */
function calculateCells(level) {
    let cells;

    switch (level) {
        case 2:
            cells = 81;
            break;
        case 3:
            cells = 49;
            break;
        case 1:
        default:
            cells = 100;
    }

    return cells;
}

/*****
 * Createbombs: genera n valori tra due valori compresi tra min e max
 */


/**
 * Create bombs list
 *
 * @param {*} nBombs - number of bombs
 * @param {*} min - min number
 * @param {*} max - max number
 * @return {*} 
 */
function createBombs(nBombs, min, max) {
    const bombList = []; //0

    while (bombList.length < nBombs) {
        const bombNumber = getRndInteger(min, max);

        if (!bombList.includes(bombNumber)) {
            bombList.push(bombNumber);
        }
    }

    return bombList;

}
/**
 * Game Logic - campo minato
 *
 * @param {*} bombs
 */
function gameLogic(bombs) {

    //1. aggiungo click
    //todo:  forse .cell può essere un argomento / forse tutte le cells possono essere un argomento
    const cells = document.querySelectorAll('.cell');
    const cellsClicked = [];
    const messageArea = document.getElementById('message-area');

    let gameOver = false;

    for (let i = 0; i < cells.length; i++) {

        cells[i].addEventListener('click', function () {

            //se clicco su una bomba ho perso
            //altrimenti continuo

            if (gameOver) {
                return;
            }

            const cellNumber = Number(this.innerText);

            if (bombs.includes(cellNumber)) {
                console.log('hai preso una bomba!');
                this.classList.add('cell-bomb');
                messageArea.innerText = `Hai perso! Il tuo punteggio è ${cellsClicked.length}`;
                gameOver = true;
            } else if (cellsClicked.includes(cellNumber) === false) {
                console.log('continua pure, sei stato fortunato!');
                this.classList.add('cell-safe');
                cellsClicked.push(cellNumber);
                console.log(cellsClicked);
                messageArea.innerText = `il tuo punteggio è ${cellsClicked.length}`;

                //verifico se ho vinto
                if (cellsClicked.length === cells.length - bombs.length) {
                    console.log('hai vinto');
                    messageArea.innerText = `Hai vinto! Il tuo punteggio è ${cellsClicked.length}`;
                    gameOver = true;
                }

            }


            if (gameOver === true) {
                for (let i = 0; i < bombs.length; i++) {
                    console.log(bombs[i]);
                    document.querySelector(`.cell:nth-child(${bombs[i]})`).classList.add('cell-bomb');
                }
            }

        })
    }
}


/**
 * Campo Minato - the Game
 * Everything begins here
 *
 */
function campoMinato() {

    //definizioni
    const bombsNumber = 16;
    const boardContainer = document.querySelector('.board');
    const level = Number(document.getElementById('level').value);

    //h2, TODO: posizionarlo nella generazione della board
    document.getElementById('message-area').innerHTML = 'In bocca al lupo!';

    //generazione numero celle
    let cellNumber = calculateCells(level);
    //generazione bombe
    const bombs = createBombs(bombsNumber, 1, cellNumber);
    //const bombs = [1]; debug
    //crea campo di gioco
    createBoard(boardContainer, cellNumber);
    gameLogic(bombs);

}



/******************************
 * Main
 ******************************/

const startButton = document.getElementById('game-start');
startButton.addEventListener('click', campoMinato);
















