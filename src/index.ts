function random(max: number) {
  return Math.floor(Math.random() * max);
}

class canvas {
  viewport: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(viewport: HTMLCanvasElement) {
    this.viewport = viewport;
    this.width = viewport.width = window.innerWidth || document.body.clientWidth;
    this.height = viewport.height = window.innerHeight || document.body.clientHeight;
    const ctx = viewport.getContext('2d');
    if (!ctx) {
      throw new Error("Failed to getContext from canvas element");
    }
    this.ctx = ctx;
  }

  square(startX: number, startY: number) {
    this.ctx.fillRect(startX, startY, 50, 50);
  }

  triangle(startX: number, startY: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(startX + 50, startY);
    this.ctx.lineTo(startX + 25, startY - 50);
    this.ctx.fill();
  }

  circle(startX: number, startY: number) {
    this.ctx.beginPath();
    this.ctx.arc(startX, startY, 25, 0, Math.PI * 2, true);
    this.ctx.fill();
  }
}

class Lines extends canvas {
  render() {
    this.ctx.lineWidth = 3;

    // Between 5 and 10 lines
    const lineCount = 5 + random(5);

    const colors = ['deeppink', 'darkorange', 'lime'];

    for (let i = 0; i < lineCount; i++) {
      const color = colors[random(colors.length)];
      const startX = random(this.width);
      const startY = random(this.height / 2);
      const endX = random(this.width);
      const endY = random(this.height / 2) + (this.height / 2);
      this.ctx.strokeStyle = color;
      this.ctx.beginPath();
      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(endX, endY);
      this.ctx.stroke();
    }
  }
}

class Shapes extends canvas {
  [key: string]: any;

  render() {
    this.ctx.lineWidth = 3;

    const shapes = ['square', 'triangle', 'circle'];

    const colors = [
      'rgba(255, 0, 0, 0.8)', // Red
      'rgba(255, 255, 0, 0.8)', // Yellow
      'rgba(0, 0, 255, 0.8)' // Blue
    ];

    const shapeCount = 18;

    for (let i = 0; i < shapeCount; i++) {
      const color = colors[random(colors.length)];
      const shape = shapes[random(shapes.length)];
      const startX = random(this.width);
      const startY = random(this.height);
      this.ctx.fillStyle = color;
      this[shape](startX, startY);
    }
  }
}

class Combo extends canvas {
  render() {
    randomBackgroundColor();
    Lines.prototype.render.call(this);
    Shapes.prototype.render.call(this);
  }
}

function randomBackgroundColor() {
  const rgb = [
    random(255),
    random(255),
    random(255)
  ].join(",");
  document.body.style.cssText = `background-color: rgb(${rgb})`;
}

function changingRandomBackgroundColor() {
  return setInterval(randomBackgroundColor, 500);
}

function renderShapes() {
  const viewport = <HTMLCanvasElement | null>document.getElementById('viewport');
  if (!viewport) {
    return;
  }

  const shapes = new Shapes(viewport);
  shapes.render();
}

function renderLines() {
  const viewport = <HTMLCanvasElement | null>document.getElementById('viewport');
  if (!viewport) {
    throw new Error("Couldn't find element with id 'viewport'");
  }

  const lines = new Lines(viewport);
  lines.render();
}

function renderCombo() {
  const viewport = <HTMLCanvasElement | null>document.getElementById('viewport');
  if (!viewport) {
    throw new Error("Couldn't find element with id 'viewport'");
  }

  const combo = new Combo(viewport);
  combo.render();
}


/*export class Zeichenfläche {
  canvas!: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  paint:boolean = false;
  coord: {x:number , y:number};
  pencilColors;
  pencilIndex: number;
  brushSize: number;*/






/*//THIS IS THE ENTRY FILE - WRITE YOUR MAIN LOGIC HERE!

import { helloWorld, Beispiel } from "./myModule";
import { alertMe } from "./myOtherModule";

console.log(helloWorld);
customElements.define("my-beispiel", Beispiel);

alertMe();

const myInputValue = document.querySelector<HTMLInputElement>("#myInput");

const myInputValueAlternate = document.querySelector(
  "#myInput"
) as HTMLInputElement;

document
  .querySelector<HTMLInputElement>("#myInput")
  ?.addEventListener("focus", doSmth);

function doSmth(e: UIEvent) {
  const val = e.target as HTMLInputElement;
  console.log(e, val.value);
}*/
