import Board from './board.mjs';
import { generateRandom, Vector2, Vector4 } from './common.mjs';
import Snake, { CELL_SIZE } from './snake.mjs';

const VELOCITY = 16;
const FOOD_LIMIT = 10;
const MOVE_INTERNAL = 1 / VELOCITY;

export class Game {
  ctx: CanvasRenderingContext2D;
  lastUpdate: number;
  running: boolean;
  board: Board;
  snake: Snake;
  fps: number[];
  foods: Vector2[];
  acc: number = 0;
  foodCount: number;

  constructor(context: CanvasRenderingContext2D) {
    this.fps = [];
    this.foods = [];
    this.running = true;
    this.foodCount = 0;
    this.ctx = context;
    this.board = new Board(context, new Vector4(-1000, 2000, 2000, -1000));
    this.snake = new Snake(context);
    this.lastUpdate = 0;
  }

  update(timestamp: number) {
    this.board.update(timestamp);
    this.snake.update();
    this.addFoods();

    try {
      this.board.checkWallCollision(this.snake.body.at(-1));
    } catch(e) {
      this.running = false;
      this.snake.die();
    }
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

  transform() {
    const t = [1, 0, 0, 1, 0, 0];
    const head = this.snake.body[this.snake.body.length - 1];
    t[4] = -head.x * CELL_SIZE + window.innerWidth * 0.5;
    t[5] = -head.y * CELL_SIZE + window.innerHeight * 0.5;
    this.ctx.setTransform(...t as any);
  }

  drawGame() {
    this.transform();
    this.snake.draw();
    this.board.drawWorld();
    this.board.drawFoods(this.foods);
  }

  clearContext() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  addFoods() {
    if (this.foodCount < FOOD_LIMIT) {
      this.foodCount += 1;
      const x = Math.floor(generateRandom(this.board.boundaries.l, this.board.boundaries.r / 2) / CELL_SIZE) - 1;
      const y = Math.floor(generateRandom(this.board.boundaries.t, this.board.boundaries.b / 2) / CELL_SIZE) - 1;
      this.foods.push(new Vector2(x, y));
    }
  }

  start(timestamp: number) {
    this.clearContext();

    const deltaTime = this.updateFps(timestamp);
    this.drawFps();

    this.acc += deltaTime;
    while (this.acc >= MOVE_INTERNAL) {
      this.update(timestamp);

      this.acc -= MOVE_INTERNAL;
    }

    this.drawGame();
  }
}
