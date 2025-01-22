import { Vector2 } from './common.mjs';

export const CELL_SIZE = 20;

export default class Snake {
  ctx: CanvasRenderingContext2D;
  dir: Vector2;
  pos: Vector2;
  body: Vector2[];

  constructor(ctx: CanvasRenderingContext2D) {
    this.body = [
      new Vector2(0, 0),
      new Vector2(0, 1),
      new Vector2(0, 2),
    ];
    this.ctx = ctx;
    this.dir = new Vector2(0, 1);
    this.pos = new Vector2(100, 100);

    window.addEventListener('keydown', this.moveSnake.bind(this));
  }

  moveSnake(event: KeyboardEvent) {
    if (event.code === 'KeyA') {
      if (this.dir.x === 1) return;
      console.log(123)
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

  update() {
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
    const t = [1, 0, 0, 1, 0, 0];
    const head = this.body[this.body.length - 1];
    t[4] = -head.x * CELL_SIZE + window.innerWidth * 0.5;
    t[5] = -head.y * CELL_SIZE + window.innerHeight * 0.5;
    this.ctx.setTransform(...t as any);
    this.ctx.fillStyle = 'red';

    for (let i = 0; i < this.body.length; i++) {
      this.ctx.fillRect(this.body[i].x * CELL_SIZE, this.body[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }
}
