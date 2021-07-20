import {LEVEL, OBJECT_TYPE} from './setup'
import {randomMovement} from "./ghostMoves";

// Classes
import GameBoard from './GameBoard'
import Pacman from './Pacman'
import Ghost from "./Ghost";


// Dom Elements
const gameGrid = document.querySelector('#game')
const scoreTable = document.querySelector('#score')
const startButton = document.querySelector('#start-button')

// Game Constants

const POWER_PILL_TIME = 10000 //ms
const GLOBAL_SPEED = 80 // ms
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL)

// Initial setup
let score = 0
let timer = null
let gameWin = false
let powerPillActive = false
let powerPillTimer = null

function gameOver(pacman, grid) {
    document.removeEventListener('keydown', e => {
        pacman.handleKeyInput(e, gameBoard.objectExist)
    })

    gameBoard.showGameStatus(gameWin)

    clearInterval(timer)

    startButton.classList.remove('hide')
}

function checkCollision(pacman, ghosts) {
    const collidedGhost = ghosts.find( ghost => pacman.pos === ghost.pos)

    if (collidedGhost) {
        if (pacman.powerPill) {
            gameBoard.removeObject(collidedGhost.pos, [
                OBJECT_TYPE.GHOST,
                OBJECT_TYPE.SCARED,
                collidedGhost.name
            ])
            collidedGhost.pos = collidedGhost.startPos
            score += 100
        } else {
            gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN])
            gameBoard.rotateDiv(pacman.pos, 0)
            gameOver(pacman, gameGrid)
        }
    }

}

function gameLoop(pacman, ghosts) {
    gameBoard.moveCharacter(pacman)
    checkCollision(pacman, ghosts)

    ghosts.forEach((ghost) => gameBoard.moveCharacter(ghost))
    checkCollision(pacman, ghosts)
}

function startGame() {
    gameWin = false
    powerPillActive = false
    score = 0

    startButton.classList.add('hide')

    gameBoard.createGrid(LEVEL)
    const pacman = new Pacman(2, 287)
    gameBoard.addObject(287, [OBJECT_TYPE.PACMAN])
    document.addEventListener('keydown', (e) => {
        pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
    })

    const ghosts = [
        new Ghost(5, 188, randomMovement, OBJECT_TYPE.BLINKY),
        new Ghost(4, 209, randomMovement, OBJECT_TYPE.PINKY),
        new Ghost(3, 230, randomMovement, OBJECT_TYPE.INKY),
        new Ghost(2, 251, randomMovement, OBJECT_TYPE.CLYDE),
    ]

    timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED)
}

//Initialize game
startButton.addEventListener('click', startGame)
