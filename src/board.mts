export default class Board {
  ctx: CanvasRenderingContext2D;
  lastUpdate: number;
  fps: number[];
  boundaries: number;

  constructor(context: CanvasRenderingContext2D, boundaries: number) {
    this.ctx = context;
    this.lastUpdate = 1;
    this.fps = [];
    this.boundaries = boundaries;
  }

  update(timestamp: number) {
    const deltaTime = (timestamp - this.lastUpdate) / 1000;
    this.lastUpdate = timestamp;
    this.fps.push(deltaTime);

    if (this.fps.length > 60) {
      this.fps.shift();
    }
  }

  drawWorld() {
    // TODO: draw the boundaries
  }

  drawFps() {
    const ratio = this.fps.reduce((a, b) => a + b, 0) / this.fps.length;
    const fps = Math.round(1 / ratio);
    this.ctx.fillStyle = '#fff';
    this.ctx.font = "14px serif";
    this.ctx.fillText(`${fps} fps`, 10, 20);
  }
}
