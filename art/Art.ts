import { theme } from 'stitches.config';

import { getCells } from './getCells';

export class Art {
  private opacity = 0.5;
  // cell properties
  private buffer = 0;
  private size = parseInt(theme.sizes.grid.value.toString());
  private linesCount = 6;
  private color = '#000';

  private cx = 0;
  private cy = 0;

  private data: Uint8ClampedArray;
  private imageWidth: number;

  get x() {
    return this.cx * this.size;
  }

  get y() {
    return this.cy * this.size;
  }

  get centerX() {
    return this.x + this.size / 2;
  }

  get centerY() {
    return this.y + this.size / 2;
  }

  constructor() {}

  load = async (imgSrc: string) => {
    const { data, width } = await getCells(imgSrc, this.size);
    this.data = data;
    this.imageWidth = width;
  };

  draw = (canvas: HTMLCanvasElement) => {
    if (!this.data) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let c = 0;
    for (let i = 0; i < this.data.length; i += 4) {
      this.color = `rgba(${this.data[i]}, ${this.data[i + 1]}, ${
        this.data[i + 2]
      }, ${(this.data[i + 3] / 255) * this.opacity})`;
      this.cx = c % this.imageWidth;
      this.cy = Math.floor(c / this.imageWidth);
      this.renderCell(ctx);
      c++;
    }

    // render remaining cells with final row color
    const totalCanvasCells =
      (canvas.width / this.size) * (canvas.height / this.size);
    for (let i = c; i < totalCanvasCells; i++) {
      this.cx = i % this.imageWidth;
      this.cy = Math.floor(i / this.imageWidth);
      this.renderCell(ctx);
    }
  };

  renderCell = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    if (Math.random() < 0.15) this.renderSquare(ctx);
    if (Math.random() < 0.13) this.renderCircle(ctx);
    if (Math.random() < 0.11) this.renderCross(ctx);
    if (Math.random() < 0.12) this.renderHLines(ctx);
    if (Math.random() < 0.12) this.renderVLines(ctx);
    ctx.stroke();
  };

  renderSquare = (ctx: CanvasRenderingContext2D) => {
    // ctx.beginPath();
    ctx.rect(
      this.x + this.buffer,
      this.y + this.buffer,
      this.size - this.buffer * 2,
      this.size - this.buffer * 2,
    );
  };

  renderCircle = (ctx: CanvasRenderingContext2D) => {
    const r = 1;

    // ctx.beginPath();
    ctx.ellipse(
      this.centerX,
      this.centerY,
      (this.size / 2) * r,
      (this.size / 2) * r,
      0,
      0,
      Math.PI * 2,
    );
  };

  renderCross = (ctx: CanvasRenderingContext2D) => {
    // ctx.beginPath();
    ctx.moveTo(this.x + this.buffer, this.y + this.buffer);
    ctx.lineTo(
      this.x + this.size - this.buffer,
      this.y + this.size - this.buffer,
    );
    ctx.moveTo(this.x + this.buffer, this.y + this.size - this.buffer);
    ctx.lineTo(this.x + this.size - this.buffer, this.y + this.buffer);
  };

  renderHLines = (ctx: CanvasRenderingContext2D) => {
    // ctx.beginPath();
    for (let i = 0; i < this.linesCount; i++) {
      const x =
        this.x +
        this.buffer +
        ((this.size - this.buffer * 2) / this.linesCount) * i;
      ctx.moveTo(x, this.y + this.buffer);
      ctx.lineTo(x, this.y + this.size - this.buffer);
    }
  };

  renderVLines = (ctx: CanvasRenderingContext2D) => {
    // ctx.beginPath();

    for (let i = 0; i < this.linesCount; i++) {
      const y =
        this.y +
        this.buffer +
        ((this.size - this.buffer * 2) / this.linesCount) * i;
      ctx.moveTo(this.x + this.buffer, y);
      ctx.lineTo(this.x + this.size - this.buffer, y);
    }
  };
}
