import Board from './board.mjs';

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('resize', setCanvasSize);
  const canvas = document.getElementById('game') as HTMLCanvasElement;
  var board: Board;

  if (canvas) {
    setCanvasSize();

    const ctx = canvas.getContext('2d');

    if (ctx) {
      board = new Board(ctx);
    }
  }

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function mainLoop(timestamp: number) {
    board.update(timestamp);
    board.draw();

    requestAnimationFrame(mainLoop);
  }

  requestAnimationFrame(timestamp => {
    mainLoop(timestamp);
  })
});

