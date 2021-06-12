import { quantize } from '@util/math';
import { getCells } from './getCells';

export class Art {
  private cells: Cell[] = [];
  private opacity = 0.5;

  constructor() {}

  load = async (imgSrc: string) => {
    const { data, width } = await getCells(imgSrc);

    let c = 0;
    for (let i = 0; i < data.length; i += 4) {
      const color = `rgba(${data[i]}, ${data[i + 1]}, ${data[i + 2]}, ${
        (data[i + 3] / 255) * this.opacity
      })`;
      const x = c % width;
      const y = Math.floor(c / width);
      this.cells[c++] = new Cell(color, x, y, 20);
    }
    this.cells.length = c;
  };

  draw = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.cells.forEach((c) => c.render(ctx));
  };
}

class Cell {
  private x: number;
  private y: number;

  private buffer = 0;

  private angle1 = new Lerper(0, Math.PI * 2);
  private angle2 = new Lerper(0, Math.PI * 2);
  private radius = new Lerper(0, 1);
  private filled = Math.random() < 0.75;

  constructor(
    private color: string,
    x: number,
    y: number,
    private size: number,
  ) {
    this.x = x * size;
    this.y = y * size;
  }

  get centerX() {
    return this.x + this.size / 2;
  }

  get centerY() {
    return this.y + this.size / 2;
  }

  render = (ctx: CanvasRenderingContext2D) => {
    // this.renderSquare(ctx);
    this.renderArc(ctx);
  };

  renderSquare = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    // ctx.strokeStyle = 'white';
    ctx.rect(
      this.x + this.buffer,
      this.y + this.buffer,
      this.size - this.buffer * 2,
      this.size - this.buffer * 2,
    );
    ctx.fill();
    // ctx.stroke();
  };

  renderCircle = (ctx: CanvasRenderingContext2D) => {
    const r = this.radius.to();

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    // ctx.moveTo(this.x + this.buffer, this.y + this.size - this.buffer);
    // ctx.lineTo(this.x + this.size - this.buffer, this.y + this.buffer);
    ctx.ellipse(
      this.centerX,
      this.centerY,
      (this.size / 2) * r,
      (this.size / 2) * r,
      0,
      0,
      Math.PI * 2,
    );
    if (this.filled) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  };

  renderArc = (ctx: CanvasRenderingContext2D) => {
    if (this.filled) return;
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    // ctx.lineWidth = Math.floor(Math.random() * 3);
    const r = this.radius.to();
    const radius = Math.round(2 * r) * this.size;
    const start = quantize(this.angle1.to(), Math.PI / 2);
    const end = quantize(this.angle2.to(), Math.PI / 2);
    ctx.arc(this.x - radius, this.y - radius, radius, start, end);
    // ctx.arc(this.x - radius, this.y - radius, radius, 0, Math.PI * 2);

    ctx.stroke();
  };
}

class Lerper {
  target: number;
  value: number;

  constructor(private min: number, private max: number) {
    this.reset();
    this.value = this.target;
  }

  reset = () => {
    this.target = Math.random() * (this.max - this.min) + this.min;
  };

  to = () => {
    this.value = this.value + (this.target - this.value) * 0.1;
    if (Math.abs(this.target - this.value) < 0.001) {
      this.value = this.target;
      this.reset();
    }
    return this.value;
  };
}
