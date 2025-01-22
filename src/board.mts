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
    // TODO: draw the boundaries
  }
}
