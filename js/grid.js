import { Cell } from './cell.js'

const GRID_SIZE = 4
const CELLS_COUNT = GRID_SIZE * GRID_SIZE
export class Grid {
    constructor(gridElement) {
        this.cells = []
        for (let i = 0; i < CELLS_COUNT; i++) {
            this.cells.push(new Cell(gridElement, i % GRID_SIZE, Math.floor(i / GRID_SIZE)))
        }
        this.cellsGroupByColumn = this.groupCellsByColumn()
        this.cellsGroupByReverseColumn = this.cellsGroupByColumn.map(column => [...column].reverse())
        this.cellsGroupByRow = this.groupCellsByRow()
        this.cellsGroupByReverseRow = this.cellsGroupByRow.map(row => [...row].reverse())
    }
    getRandomEmptyCell() {
        const emptyCells = this.cells.filter(cell => cell.isEmpty())
        const randomIndex = Math.floor(Math.random() * emptyCells.length)
        return emptyCells[randomIndex]
    }
    groupCellsByColumn() {
        return this.cells.reduce((groupCells, cell) => {
            groupCells[cell.x] = groupCells[cell.x] || []
            groupCells[cell.x][cell.y] = cell
            return groupCells
        }, [])
    }
    groupCellsByRow() {
        return this.cells.reduce((groupCells, cell) => {
            groupCells[cell.y] = groupCells[cell.y] || []
            groupCells[cell.y][cell.x] = cell
            return groupCells
        }, [])
    }
}
