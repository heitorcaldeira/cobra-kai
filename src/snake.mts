import { Vector2 } from './common.mjs';

export default class Snake {
  ctx: CanvasRenderingContext2D;
  dir: Vector2;
  pos: Vector2;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.dir = new Vector2(0, 0);
    this.pos = new Vector2(100, 100);

    window.addEventListener('keydown', this.moveSnake);
  }

  moveSnake(event: KeyboardEvent) {
    if (event.code === 'KeyA') {
      this.dir = new Vector2(-1, 0);
    }
    if (event.code === 'KeyD') {
      this.dir = new Vector2(1, 0);
    }
    if (event.code === 'KeyW') {
      this.dir = new Vector2(0, -1);
    }
    if (event.code === 'KeyS') {
      this.dir = new Vector2(0, 1);
    }
  }

  update() {
    this.pos = this.pos.add(this.dir.scale(4));
  }

  draw() {
    const t = [1, 0, 0, 1, 0, 0];
    t[4] = -this.pos.x + window.innerWidth * 0.5;
    t[5] = -this.pos.y + window.innerHeight * 0.5;
    this.ctx.setTransform(...t as any);
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.pos.x, this.pos.y, 100, 20);
  }
}
