import Board from './board.mjs';
import { Vector2 } from './common.mjs';
import Snake from './snake.mjs';

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('resize', setCanvasSize);
  window.addEventListener('keydown', onKeyDown);
  const canvas = document.getElementById('game') as HTMLCanvasElement;
  var board: Board;
  var snake: Snake;
  var ctx = canvas.getContext('2d');

  if (canvas) {
    setCanvasSize();


    if (ctx) {
      board = new Board(ctx, 1000);
      snake = new Snake(ctx);
    }
  }

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.code === 'KeyA') {
      snake.dir = new Vector2(-1, 0);
    }
    if (event.code === 'KeyD') {
      snake.dir = new Vector2(1, 0);
    }
    if (event.code === 'KeyW') {
      snake.dir = new Vector2(0, -1);
    }
    if (event.code === 'KeyS') {
      snake.dir = new Vector2(0, 1);
    }
  }

  function mainLoop(timestamp: number) {
    if (!ctx) return;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    board.update(timestamp);
    snake.update();

    snake.draw();
    board.drawWorld();

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    board.drawFps();
    requestAnimationFrame(mainLoop);
  }

  requestAnimationFrame(timestamp => {
    mainLoop(timestamp);
  })
});

