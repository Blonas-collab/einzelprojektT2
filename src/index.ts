import { result, inputNameButton, nameInputField, nameInputWrapper, outputName, randomButton } from "./dom-utils";
inputNameButton.addEventListener("click", ()=> inputName())
function inputName() {
  outputName.textContent = nameInputField.value;
  nameInputWrapper.style.display = "none";
}

//Random Tier
const randomTiere = ["Hund", "Katze", "Maus", "Elefant", "Flamingo", "Schlange", "Pferd"] as Array<string>;

function getRandomNumber(min, max){
  let step1 = max -min +1;
  let step2 = Math.random() * step1;
  let resultValue = Math.floor(step2) + min;
  return resultValue;
}
randomButton.addEventListener("click", () => {
  let index = getRandomNumber(0, randomTiere.length-1);
  result.textContent = randomTiere[index];
})

//Canvas
class DrawingApp {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private paint: boolean;
  
  private clickX: number[] = [];
  private clickY: number[] = [];
  private clickDrag: boolean[] = [];
  
  constructor() {
      let canvas = document.getElementById('canvas') as
                   HTMLCanvasElement;
      let context = canvas.getContext("2d");
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.strokeStyle = 'black';
      context.lineWidth = 1;
  
      this.canvas = canvas;
      this.context = context;
  
      this.redraw();
      this.createUserEvents();
  }
  private createUserEvents() {
    let canvas = this.canvas;

    canvas.addEventListener("mousedown", this.pressEventHandler);
    canvas.addEventListener("mousemove", this.dragEventHandler);
    canvas.addEventListener("mouseup", this.releaseEventHandler);
    canvas.addEventListener("mouseout", this.cancelEventHandler);

    canvas.addEventListener("touchstart", this.pressEventHandler);
    canvas.addEventListener("touchmove", this.dragEventHandler);
    canvas.addEventListener("touchend", this.releaseEventHandler);
    canvas.addEventListener("touchcancel", this.cancelEventHandler);

    document.getElementById('clear')
            .addEventListener("click", this.clearEventHandler);
}

private redraw() {
    let clickX = this.clickX;
    let context = this.context;
    let clickDrag = this.clickDrag;
    let clickY = this.clickY;
    for (let i = 0; i < clickX.length; ++i) {
        context.beginPath();
        if (clickDrag[i] && i) {
            context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
            context.moveTo(clickX[i] - 1, clickY[i]);
        }

        context.lineTo(clickX[i], clickY[i]);
        context.stroke();
    }
    context.closePath();
}
private addClick(x: number, y: number, dragging: boolean) {
  this.clickX.push(x);
  this.clickY.push(y);
  this.clickDrag.push(dragging);
}

private clearCanvas() {
  this.context
      .clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.clickX = [];
  this.clickY = [];
  this.clickDrag = [];
}
private clearEventHandler = () => {
  this.clearCanvas();
}

private releaseEventHandler = () => {
  this.paint = false;
  this.redraw();
}

private cancelEventHandler = () => {
  this.paint = false;
}
private pressEventHandler = (e: MouseEvent | TouchEvent) => {
  let mouseX = (e as TouchEvent).changedTouches ?
               (e as TouchEvent).changedTouches[0].pageX :
               (e as MouseEvent).pageX;
  let mouseY = (e as TouchEvent).changedTouches ?
               (e as TouchEvent).changedTouches[0].pageY :
               (e as MouseEvent).pageY;
  mouseX -= this.canvas.offsetLeft;
  mouseY -= this.canvas.offsetTop;

  this.paint = true;
  this.addClick(mouseX, mouseY, false);
  this.redraw();
}

private dragEventHandler = (e: MouseEvent | TouchEvent) => {
  let mouseX = (e as TouchEvent).changedTouches ?
               (e as TouchEvent).changedTouches[0].pageX :
               (e as MouseEvent).pageX;
  let mouseY = (e as TouchEvent).changedTouches ?
               (e as TouchEvent).changedTouches[0].pageY :
               (e as MouseEvent).pageY;
  mouseX -= this.canvas.offsetLeft;
  mouseY -= this.canvas.offsetTop;

  if (this.paint) {
      this.addClick(mouseX, mouseY, true);
      this.redraw();
  }

  e.preventDefault();
}
}

new DrawingApp();