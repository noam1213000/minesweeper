'use strict'


function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

function playSound() {
    const sound = new Audio()
    sound.play()
}

function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}


function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function getClassName(location) {
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}

function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function onHandleKey(event) {
    const i = gGamerPos.i
    const j = gGamerPos.j
    switch (event.key) {
        case 'ArrowLeft':
        case 'a':
            if (j === 0) moveTo(i, gBoard[0].length - 1)
            else moveTo(i, j - 1)
            break
        case 'ArrowRight':
        case 'd':
            if (j === gBoard[0].length - 1) moveTo(i, 0)
            else moveTo(i, j + 1)
            break
        case 'ArrowUp':
        case 'w':
            if (i === 0) moveTo((gBoard.length - 1), j)
            else moveTo(i - 1, j)
            break
        case 'ArrowDown':
        case 's':
            if (i === (gBoard.length - 1)) moveTo(i = 0, j)
            else moveTo(i + 1, j)
            break
    }



}

function getNextLocation(eventKeyboard) {

    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}

function countNegsAroundPlayer() {
    var ballsAroundPlayer = 0
    for (var i = gGamerPos.i - 1; i <= gGamerPos.i + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue
        for (var j = gGamerPos.j - 1; j <= gGamerPos.j + 1; j++) {
            if (j < 0 || j > gBoard[0].length - 1) continue
            if (i === gGamerPos.i && j === gGamerPos.j) continue

            if (gBoard[i][j].type === WALL) continue
            if (gBoard[i][j].gameElement === BALL) {
                ballsAroundPlayer++
            }
        }
    }
    const elBallsAround = document.querySelector('.ballsAround span')
    elBallsAround.innerText = ballsAroundPlayer
}

setTimeout(() => {
    // if (gIsGlued) return
    // gBoard[elementPos.i][elementPos.j].gameElement = null
    // renderCell(elementPos, '')
}, 3000)

//setInterval(, 5000)