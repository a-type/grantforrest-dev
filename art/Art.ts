import { theme } from 'stitches.config';

export class Art {
  private opacity = 0.5;
  // cell properties
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
    // const { data, width } = await getCells(imgSrc, this.size);
    // this.data = data;
    // this.imageWidth = width;
  };

  draw = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < canvas.height / this.size; y++) {
      for (let x = 0; x < canvas.width / this.size; x++) {
        this.cx = x;
        this.cy = y;
        this.color = 'rgba(255, 255, 255, 1)';
        this.renderCell(ctx);
      }
    }
  };

  renderCell = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    // if (Math.random() < 0.15) this.renderSquare(ctx);
    // if (Math.random() < 0.13) this.renderCircle(ctx);
    // if (Math.random() < 0.11) this.renderCross(ctx);
    // if (Math.random() < 0.12) this.renderHLines(ctx);
    // if (Math.random() < 0.12) this.renderVLines(ctx);
    this.renderDot(ctx);
    ctx.stroke();
  };

  renderSquare = (ctx: CanvasRenderingContext2D) => {
    ctx.moveTo(this.x, this.y);
    ctx.rect(this.x, this.y, this.size * 2, this.size * 2);
  };

  renderCircle = (ctx: CanvasRenderingContext2D) => {
    const r = 1;

    ctx.moveTo(this.centerX + this.size / 2, this.centerY);
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
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.size, this.y + this.size);
    ctx.moveTo(this.x, this.y + this.size);
    ctx.lineTo(this.x + this.size, this.y);
  };

  renderHLines = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < this.linesCount; i++) {
      const x = this.x + ((this.size * 2) / this.linesCount) * i;
      ctx.moveTo(x, this.y);
      ctx.lineTo(x, this.y + this.size);
    }
  };

  renderVLines = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < this.linesCount; i++) {
      const y = this.y + ((this.size * 2) / this.linesCount) * i;
      ctx.moveTo(this.x, y);
      ctx.lineTo(this.x + this.size, y);
    }
  };

  renderDot = (ctx: CanvasRenderingContext2D) => {
    ctx.moveTo(this.centerX, this.centerY);
    ctx.arc(this.centerX, this.centerY, 1, 0, Math.PI * 2);
  };
}
