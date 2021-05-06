import { canvas } from "./dom-utils";

//Canvas
//Disclaimer: Dieser Code für den Canvas, abgesehen von der saveDrawingApp() und loadDrawingApp() Methode und damit zusammenhängenden kleinen Anpassungen,
//            wurde von https://kernhanda.github.io/tutorial-typescript-canvas-drawing/ kopiert!

export class DrawingApp {
    private canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    private paint: boolean;
    
    private clickX: number[] = [];
    private clickY: number[] = [];
    private clickDrag: boolean[] = [];
    
    constructor() {
        
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

    //save&load canvas
    saveDrawingApp(){
      localStorage.setItem("DrawingApp", this.canvas.toDataURL());
    }
    loadDrawingApp(){
      let dataURL = localStorage.getItem("DrawingApp");
      let drawing = new Image();
      drawing.src = dataURL;
      let that = this;
      drawing.onload = function(){
        that.context.drawImage(drawing, 0, 0);
      }
    }

    private createUserEvents() {
      let canvas = this.canvas;
      this.context = this.canvas.getContext("2d");
  
      canvas.addEventListener("mousedown", this.pressEventHandler);
      canvas.addEventListener("mousemove", this.dragEventHandler);
      canvas.addEventListener("mouseup", this.releaseEventHandler);
      canvas.addEventListener("mouseout", this.cancelEventHandler);
  
      canvas.addEventListener("touchstart", this.pressEventHandler);
      canvas.addEventListener("touchmove", this.dragEventHandler);
      canvas.addEventListener("touchend", this.releaseEventHandler);
      canvas.addEventListener("touchcancel", this.cancelEventHandler);
  
      this.loadDrawingApp();

      document.getElementById('clearButton')
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
  
  public clearCanvas() {
    this.context
        .clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.clickX = [];
    this.clickY = [];
    this.clickDrag = [];
    this.saveDrawingApp();
  }
  private clearEventHandler = () => {
    this.clearCanvas();
  }
  
  private releaseEventHandler = () => {
    this.paint = false;
    this.redraw();
    this.saveDrawingApp();
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