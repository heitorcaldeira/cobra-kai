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

export class Vector4 {
  t: number;
  r: number;
  b: number;
  l: number;

  constructor(t: number, r: number, b: number, l: number) {
    this.t = t;
    this.r = r;
    this.b = b;
    this.l = l;
  }
}

export function generateRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
