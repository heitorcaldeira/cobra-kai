import { CELL_SIZE } from "./snake.mjs";

export default class Board {
  ctx: CanvasRenderingContext2D;
  boundaries: number;

  constructor(context: CanvasRenderingContext2D, boundaries: number) {
    this.ctx = context;
    this.boundaries = boundaries;
  }

  update(_: number) {
  }

  drawWorld() {
    const GRID_SIZE = Math.floor(this.boundaries / CELL_SIZE);
    this.ctx.fillStyle = '#333';
    for (let row = -GRID_SIZE; row < GRID_SIZE; row++) {
      this.ctx.fillRect(-GRID_SIZE * CELL_SIZE, row * CELL_SIZE, this.boundaries * 2, 1);
    }

    for (let col = -GRID_SIZE; col < GRID_SIZE; col++) {
      this.ctx.fillRect(col * CELL_SIZE, -GRID_SIZE * CELL_SIZE, 1, this.boundaries * 2);
    }
  }
}
