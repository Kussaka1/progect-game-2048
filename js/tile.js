export class Tile {
  constructor(gridElement) {
    this.tileElement = document.createElement("div")
    this.tileElement.classList.add("tile")
    this.setValue(Math.random() > 0.5 ? 2 :4);
    gridElement.append(this.tileElement);
  }
  setXY(x, y){
    this.x = x;
    this.y = y;
    this.tileElement.style.setProperty("--x" , x);
    this.tileElement.style.setProperty("--y" , y);

  }

  setValue(value){

   this.value = value;
    this.tileElement.textContent = value;
    const bgLight = 100 - Math.log2(value) * 9;//2 ->100 -1*9 ->91
    this.tileElement.style.setProperty("--bg-ligth", `${bgLight}%`);
    this.tileElement.style.setProperty("--text-ligth", `${bgLight< 50  ? 90 : 10}%`);
  }
  removeFromDOM(){
    this.tileElement.remove();
  }
 
  WaitTransitionend(){
    return new Promise(resolve => {
      this.tileElement.addEventListener("transitionend", resolve, {once: true})
    })
  }

  WaitAnimationEnd(){
    return new Promise(resolve => {
      this.tileElement.addEventListener("animationend", resolve, {once: true})
    })
  }
   
}