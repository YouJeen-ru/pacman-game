import {LEVEL, OBJECT_TYPE} from './setup'

// Classes
import GameBoard from './GameBoard'


// Dom Elements
const gameGrid = document.querySelector('#game')
const scoreTable = document.querySelector('#score')

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


