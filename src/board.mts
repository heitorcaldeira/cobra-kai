export default class Board {
  ctx: CanvasRenderingContext2D;
  lastUpdate: number;
  fps: number[];

  constructor(context: CanvasRenderingContext2D) {
    this.ctx = context;
    this.lastUpdate = 0;
    this.fps = [];
  }

  update(timestamp: number) {
    const deltaTime = (timestamp - this.lastUpdate) / 1000;
    this.lastUpdate = timestamp;
    this.fps.push(Math.round(1 / deltaTime));

    if (this.fps.length > 60) {
      this.fps.shift();
    }
  }

  draw() {
    const fps = Math.round(this.fps.reduce((a, b) => a + b, 0) / this.fps.length);
    this.ctx.fillStyle = '#181818';
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    this.ctx.fillStyle = '#fff';
    this.ctx.font = "14px serif";
    this.ctx.fillText(`${fps} fps`, 10, 20);
  }
}
