export class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(that: Vector2) {
    return new Vector2(this.x + that.x, this.y + that.y);
  }

  scale(v: number) {
    return new Vector2(this.x * v, this.y * v);
  }
}
