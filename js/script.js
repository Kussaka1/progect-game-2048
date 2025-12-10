import { Grid } from './grid.js'
import { Tile } from './tile.js'

const gameBoard = document.getElementById('game-board')

const grid = new Grid(gameBoard)
grid.getRandomEmptyCell().linkTile(new Tile(gameBoard))
grid.getRandomEmptyCell().linkTile(new Tile(gameBoard))

setupInputOnse()
function setupInputOnse() {
    window.addEventListener('keydown', handleInput, { once: true })
}
async function handleInput(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (!canMoveUp()) {
                setupInputOnse()
                return
            }
            await moveUp()
            break

        case 'ArrowRight':
            if (!canMoveRight()) {
                setupInputOnse()
                return
            }
            await moveRight()
            break

        case 'ArrowDown':
            if (!canMoveDown()) {
                setupInputOnse()
                return
            }
            await moveDown()
            break

        case 'ArrowLeft':
            if (!canMoveLeft()) {
                setupInputOnse()
                return
            }
            await moveLeft()
            break

        default:
            setupInputOnse()
            return
    }

    const newTile = new Tile(gameBoard)
    grid.getRandomEmptyCell().linkTile(newTile)

    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
        await newTile.WaitAnimationEnd()
        alert('Try again!')
        return
    }

    setupInputOnse()
}

//  -------------функции перемещения плиточек начало--------------
async function moveUp() {
    await slideTiles(grid.cellsGroupByColumn)
}

async function moveDown() {
    await slideTiles(grid.cellsGroupByReverseColumn)
}

async function moveLeft() {
    await slideTiles(grid.cellsGroupByRow)
}
async function moveRight() {
    await slideTiles(grid.cellsGroupByReverseRow)
}
// ---------------функции перемещения плиточек конец-------

async function slideTiles(groupCells) {
    const promis = []

    groupCells.forEach(group => slideTilesInGroup(group, promis))

    await Promise.all(promis)

    grid.cells.forEach(cell => {
        cell.hasTileMerge() && cell.mergeTiles()
    })
}
function slideTilesInGroup(group, promis) {
    for (let i = 1; i < group.length; i++) {
        if (group[i].isEmpty()) {
            continue
        }

        const cellWithTile = group[i]

        let targetCell
        let j = i - 1
        while (j >= 0 && group[j].canAccept(cellWithTile.linkedTile)) {
            targetCell = group[j]
            j--
        }

        if (!targetCell) {
            continue
        }

        promis.push(cellWithTile.linkedTile.WaitTransitionend())

        if (targetCell.isEmpty()) {
            targetCell.linkTile(cellWithTile.linkedTile)
        } else {
            targetCell.linkTileMerge(cellWithTile.linkedTile)
        }
        cellWithTile.unLinkTile()
    }
}

function canMoveUp() {
    return canMove(grid.cellsGroupByColumn)
}
function canMoveDown() {
    return canMove(grid.cellsGroupByReverseColumn)
}
function canMoveLeft() {
    return canMove(grid.cellsGroupByRow)
}
function canMoveRight() {
    return canMove(grid.cellsGroupByReverseRow)
}
function canMove(groupCells) {
    return groupCells.some(group => canMoveInGroup(group))
}

function canMoveInGroup(group) {
    return group.some((cell, i) => {
        if (i === 0) {
            return false
        }

        if (cell.isEmpty()) {
            return false
        }

        const targetCell = group[i - 1]
        return targetCell.canAccept(cell.linkedTile)
    })
}
