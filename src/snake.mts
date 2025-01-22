import { Vector2 } from './common.mjs';

export const CELL_SIZE = 20;

export default class Snake {
  ctx: CanvasRenderingContext2D;
  dir: Vector2;
  body: Vector2[];
  alpha: number;
  running: boolean;

  constructor(ctx: CanvasRenderingContext2D) {
    this.running = true;
    this.body = [
      new Vector2(0, 0),
      new Vector2(0, 1),
      new Vector2(0, 2),
    ];
    this.alpha = 1;
    this.ctx = ctx;
    this.dir = new Vector2(0, 1);

    window.addEventListener('keydown', this.moveSnake.bind(this));
  }

  moveSnake(event: KeyboardEvent) {
    if (event.code === 'KeyA') {
      if (this.dir.x === 1) return;
      this.dir = new Vector2(-1, 0);
    }
    if (event.code === 'KeyD') {
      if (this.dir.x === -1) return;
      this.dir = new Vector2(1, 0);
    }
    if (event.code === 'KeyW') {
      if (this.dir.y === 1) return;
      this.dir = new Vector2(0, -1);
    }
    if (event.code === 'KeyS') {
      if (this.dir.y === -1) return;
      this.dir = new Vector2(0, 1);
    }
  }

  die() {
    this.alpha -= 0.1;
    this.dir = new Vector2(0, 0);
    this.running = false;
  }

  update() {
    if (!this.running) return;
    let head = this.body.length - 1;

    let old = new Vector2(0, 0);
    old.x = this.body[head].x;
    old.y = this.body[head].y;

    this.body[head] = this.body[head].add(this.dir);

    for (let i = head - 1; i >= 0; i--) {
      const o = new Vector2(0, 0);
      o.x = this.body[i].x;
      o.y = this.body[i].y;

      this.body[i].x = old.x;
      this.body[i].y = old.y;

      old.x = o.x;
      old.y = o.y;
    }
  }

  draw() {
    this.ctx.fillStyle = `rgba(50, 200, 50, ${this.alpha})`;

    for (let i = 0; i < this.body.length; i++) {
      this.ctx.fillRect(this.body[i].x * CELL_SIZE, this.body[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }
}
