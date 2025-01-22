import Board from './board.mjs';
import Snake from './snake.mjs';

const VELOCITY = 10;
const MOVE_INTERNAL = 1 / VELOCITY;

export class Game {
  ctx: CanvasRenderingContext2D;
  lastUpdate: number;
  board: Board;
  snake: Snake;
  fps: number[];
  acc: number = 0;

  constructor(context: CanvasRenderingContext2D) {
    this.fps = [];
    this.ctx = context;
    this.board = new Board(context, 3000);
    this.snake = new Snake(context);
    this.lastUpdate = 0;
  }

  update(timestamp: number) {
    this.board.update(timestamp);
    this.snake.update();
  }

  updateFps(timestamp: number): number {
    const deltaTime = (timestamp - this.lastUpdate) / 1000;
    this.lastUpdate = timestamp;
    this.fps.push(deltaTime);

    if (this.fps.length > 60) {
      this.fps.shift();
    }

    return deltaTime;
  }

  drawFps() {
    const ratio = this.fps.reduce((a, b) => a + b, 0) / this.fps.length;
    const fps = Math.round(1 / ratio);
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '14px serif';
    this.ctx.fillText(`${fps} fps`, 10, 20);
  }

  drawGame() {
    this.snake.draw();
    this.board.drawWorld();
  }

  clearContext() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  start(timestamp: number) {
    this.clearContext();

    const deltaTime = this.updateFps(timestamp);
    this.drawFps();
    this.drawGame();

    this.acc += deltaTime;
    while (this.acc >= MOVE_INTERNAL) {
      this.update(timestamp);

      this.acc -= MOVE_INTERNAL;
    }
  }
}
