import { Vector2, Vector4 } from './common.mjs';
import { CELL_SIZE } from './snake.mjs';

export default class Board {
  ctx: CanvasRenderingContext2D;
  boundaries: Vector4;

  constructor(context: CanvasRenderingContext2D, boundaries: Vector4) {
    this.ctx = context;
    this.boundaries = boundaries;
  }

  update(_: number) {
  }

  drawWorld() {
    const GRID_LEFT = Math.floor(this.boundaries.l / CELL_SIZE);
    const GRID_RIGHT = Math.floor(this.boundaries.r / CELL_SIZE);
    const GRID_TOP = Math.floor(this.boundaries.t / CELL_SIZE);
    const GRID_BOTTOM = Math.floor(this.boundaries.b / CELL_SIZE);

    let i = 0;
    for (let row = GRID_TOP; row < GRID_BOTTOM / 2 + 1; row++) {
      if (row === GRID_TOP || row === GRID_BOTTOM / 2) {
        this.ctx.fillStyle = '#0000FF';
        this.ctx.fillRect(GRID_LEFT * CELL_SIZE, GRID_TOP * CELL_SIZE + i * CELL_SIZE, GRID_RIGHT * CELL_SIZE, 5);
      } else {
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(GRID_LEFT * CELL_SIZE, GRID_TOP * CELL_SIZE + i * CELL_SIZE, GRID_RIGHT * CELL_SIZE, 1);
      }
      i++;
    }

    i = 0;
    for (let col = GRID_LEFT; col < GRID_RIGHT / 2 + 1; col++) {
      if (col === GRID_LEFT || col === GRID_RIGHT / 2) {
        this.ctx.fillStyle = '#0000FF';
        this.ctx.fillRect(GRID_LEFT * CELL_SIZE + i * CELL_SIZE, GRID_TOP * CELL_SIZE, 5, GRID_BOTTOM * CELL_SIZE);
      } else {
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(GRID_LEFT * CELL_SIZE + i * CELL_SIZE, GRID_TOP * CELL_SIZE, 1, GRID_BOTTOM * CELL_SIZE);
      }
      i++;
    }
  }

  drawFoods(foods: Vector2[]) {
    this.ctx.fillStyle = `rgb(${Math.floor(255 * Math.random())}, ${Math.floor(255 * Math.random())}, ${Math.floor(255 * Math.random())})`;
    for (let i = 0; i < foods.length; i++) {
      this.ctx.fillRect(foods[i].x * CELL_SIZE, foods[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }

  checkWallCollision(head: Vector2 | undefined) {
    if (!head) return;

    if (head.x < this.boundaries.l / CELL_SIZE || head.x >= this.boundaries.r / 2 / CELL_SIZE) {
      throw new Error('out_of_bounds');
    } else if (head.y < this.boundaries.t / CELL_SIZE || head.y >= this.boundaries.b / 2 / CELL_SIZE) {
      throw new Error('out_of_bounds');
    }
  }
}
