'use strict'
var gBoard
const FLAGE = '🚩'
const MINE = '💣'
var gMINE = []
const EMPTY = ' '
var isFirstClick = true
var gLives = 3
var levelCurr = {
    Beginner: {
        SIZE: 4,
        MINES: 2
    },
    Medium: {
        SIZE: 8,
        MINES: 14
    },
    Expert: {
        SIZE: 12,
        MINES: 32
    }
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function onInIt(level) {
    gGame.isOn = true

    if (level === 'beginner') {
        levelCurr = {
            SIZE: 4,
            MINES: 2
        }
    } else if (level === 'medium') {
        levelCurr = {
            SIZE: 8,
            MINES: 14
        }
    } else if (level === 'expert') {
        levelCurr = {
            SIZE: 12,
            MINES: 32
        }
    } else {
        console.log('Plz select level');
        return
    }
    gBoard = buildBoard(levelCurr.SIZE, levelCurr.MINES)
    console.table(gBoard);
    renderBoard(gBoard)

}
function buildBoard() {
    const board = []

    for (var i = 0; i < levelCurr.SIZE; i++) {
        board.push([])

        for (var j = 0; j < levelCurr.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                type: EMPTY
            }
        }
    }

    for (var k = 0; k < levelCurr.MINES; k++) {
        var m = getRandomInt(0, levelCurr.SIZE)
        var n = getRandomInt(0, levelCurr.SIZE)
        board[m][n].type = MINE
        board[m][n].isMine = true
        gMINE.push(board[m][n])
        console.log(gMINE);
        console.log(board);
    }

    for (var k = 0; k < levelCurr.SIZE; k++) {
        for (var l = 0; l < levelCurr.SIZE; l++) {

            var numOfNeighbors = setMinesNegsCount(k, l, board)
            // console.log(numOfNeighbors);

            board[k][l].minesAroundCount = numOfNeighbors

            // console.log(board[k][l]);
        }
    }

    return board
}

function setMinesNegsCount(rowIdx, colIdx, board) {
    var neighborsCount = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (i === rowIdx && j === colIdx) continue
            if (board[i][j].type === MINE) neighborsCount++
        }
    }
    return neighborsCount
}


function renderBoard(board) {
    var strHtml = ''
    for (var i = 0; i < board.length; i++) {
        const row = board[i]
        strHtml += '<tr>'
        for (var j = 0; j < row.length; j++) {
            // const cell = row[j]
            var tdId = `cell-${i}-${j}`
            strHtml += `<td id="${tdId}" onclick="onCellClicked(this, ${i}, ${j})" oncontextmenu="onCellMarked(event, ${i}, ${j}); return false;"></td>`;

        }
        strHtml += '</tr>'
    }
    var elTable = document.querySelector('table')
    elTable.innerHTML = strHtml
    console.log(strHtml);
}


function onCellClicked(elCell, i, j) {
    //console.log(gBoard[i][j].type);
    //console.log(gBoard[i][j].minesAroundCount);
    if (!gGame.isOn) return
    // if (isFirstClick) {
    //     isFirstClick = false;
    //     completingTheBoard(i, j)
    //     renderBoard(gBoard)
    // }
    if (gBoard[i][j].isShown) {
        return
    }
    if (gBoard[i][j].isMarked === true) {
        return
    }
    if (gBoard[i][j].type === MINE) {
        gBoard[i][j].isShown = true
        elCell.style.backgroundColor = 'red'
        elCell.innerText = MINE
        gLives--
        alert('You clicked a mine! you have now ' + gLives + ' lives')
        var livesCont = document.querySelector('.livesCont')
        var lifeIcons = livesCont.querySelectorAll('.lifeIcon')
        if (lifeIcons.length > 0) {
            lifeIcons[lifeIcons.length - 1].classList.add('hidden')
        }
        if (gLives <= 0) checkGameOver()
        // for (var i = 0; i < gBoard.length; i++) {
        //     for (var j = 0; j < gBoard[i].length; j++) {
        //         if (gBoard[i][j].type === MINE) {
        //             gBoard[i][j].isShown = true
        //             gGame.shownCount++
        //             var elCurrCell = document.querySelector(`#cell-${i}-${j}`)
        //             elCurrCell.innerText = MINE
        //         }
        //     }
        // }
        // checkGameOver()
    }
    else if (gBoard[i][j].minesAroundCount > 0) {
        elCell.innerText = gBoard[i][j].minesAroundCount
        gBoard[i][j].isShown = true
        gGame.shownCount++
        //console.log(cheakVictory());
        if (cheakVictory() === true) {
            gGame.isOn = false;
            console.log("WIN")
        }
    }
    else if (gBoard[i][j].minesAroundCount === 0 && gBoard[i][j].type !== MINE) {
        elCell.style.backgroundColor = 'gray'
        gBoard[i][j].isShown = true
        gGame.shownCount++
        //console.log(cheakVictory());
        if (cheakVictory() === true) {
            gGame.isOn = false;
            console.log("WIN")
        }
    }
}
// function completingTheBoard(clickedI, clickedJ) {
//     var coords = []
//     for (var i = 0; i < levelCurr.SIZE; i++) {
//         for (var j = 0; j < levelCurr.SIZE; j++) {
//             if (i === clickedI && j === clickedJ) continue
//             coords.push({ i: i, j: j })
//         }
//     }
//     shuffle(coords)
//     for (var k = 0; k < levelCurr.MINES; k++) {
//         var coord = coords.pop();
//         var m = coord.i;
//         var n = coord.j;
//         gBoard[m][n].type = MINE
//         gBoard[m][n].isMine = true
//         gMINE.push(gBoard[m][n])
//         console.log(gMINE)
//         console.log(gBoard)
//     }
//     for (var k = 0; k < levelCurr.SIZE; k++) {
//         for (var l = 0; l < levelCurr.SIZE; l++) {
//             var numOfNeighbors = setMinesNegsCount(k, l, gBoard)
//             gBoard[k][l].minesAroundCount = numOfNeighbors
//         }
//     }

// }

function onCellMarked(event, i, j) {
    event.preventDefault();
    if (!gGame.isOn) return

    if (gBoard[i][j].isShown) {
        return
    }
    if (gBoard[i][j].isMarked === false) {
        gBoard[i][j].isMarked = true
        gGame.markedCount++
        renderCell(i, j, FLAGE)
        // console.log(cheakVictory());
        if (cheakVictory() === true) {
            gGame.isOn = false;
            console.log(" WIN")
        }
    } else {
        gBoard[i][j].isMarked = false
        gGame.markedCount--
        renderCell(i, j, EMPTY)
    }

}

function renderCell(i, j, value) {
    var elCell = document.querySelector(`#cell-${i}-${j}`)
    if (gBoard[i][j].isShown) {
        elCell.innerText = value
        if (elCell.innerText === MINE) {
            elCell.style.backgroundColor = 'red'

        } else {
            elCell.innerText = value
        }

    }
}


function checkGameOver() {
    gGame.isOn = false
    alert('you lose')
}
//console.log(cheakVictory());
function cheakVictory() {
    var totalCells = levelCurr.SIZE ** 2
    //console.log(totalCells)
    return (totalCells === gGame.shownCount + gGame.markedCount && gGame.markedCount === levelCurr.MINES)
}


function expandShown(board, elCell,
    i, j) { }

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
