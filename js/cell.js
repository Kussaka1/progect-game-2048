export class Cell {
  constructor(gridElement, x, y) {
    const cell = document.createElement("div")
    cell.classList.add("cell");
    gridElement.append(cell);
    this.x = x;
    this.y = y;
  }
  linkTile(tile){
    tile.setXY(this.x, this.y)
    this.linkedTile = tile;
  }
  unLinkTile(){
    this.linkedTile = null;
  }
  isEmpty(){
    return !this.linkedTile;
  }
  linkTileMerge(tile){
    tile.setXY(this.x, this.y);
    this.linkedTileMerge = tile;
  }
  unLinkTileMerge(){
    this.linkedTileMerge = null;
  }
  hasTileMerge(){
    return !!this.linkedTileMerge;
  }
  canAccept(newTile){
    return this.isEmpty() || (!this.hasTileMerge() && this.linkedTile.value === newTile.value)
  }
  mergeTiles(){
    this.linkedTile.setValue(this.linkedTile.value + this.linkedTileMerge.value);
    this.linkedTileMerge.removeFromDOM();
    this.unLinkTileMerge();
  }
}