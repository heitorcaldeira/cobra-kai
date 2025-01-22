import { Game } from './game.mjs';

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('resize', setCanvasSize);
  const canvas = document.getElementById('game') as HTMLCanvasElement;

  var ctx = canvas.getContext('2d');
  var game: Game;

  if (canvas) {
    setCanvasSize();

    if (ctx) {
      game = new Game(ctx);
    }
  }

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function mainLoop(timestamp: number) {
    if (!ctx) return;

    game.start(timestamp);

    requestAnimationFrame(mainLoop);
  }

  requestAnimationFrame(timestamp => {
    mainLoop(timestamp);
  })
});


