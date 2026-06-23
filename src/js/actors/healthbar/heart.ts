import {
  Actor,
  Engine,
  vec,
  Canvas,
  PointerEvent,
  Vector,
  ImageFiltering,
} from "excalibur";

export class Heart extends Actor {
  #baseSize = 32;
  #pixelScale = 1;

  constructor(config: { pos: Vector }) {
    super({
      pos: config.pos,
    });

    const pixelHeartCanvas = new Canvas({
      width: this.#baseSize * this.#pixelScale,
      height: this.#baseSize * this.#pixelScale,
      cache: true, // Cache once to save performance
      draw: (ctx: CanvasRenderingContext2D) => {
        // CRUCIAL: Scale the context so your coordinate math matches the pixel layout
        ctx.scale(this.#pixelScale, this.#pixelScale);

        // Disable anti-aliasing on the canvas context for razor-sharp vector lines
        ctx.imageSmoothingEnabled = false;

        // Define colors for a classic pixel art look
        ctx.fillStyle = "#ff2a4b"; // Heart fill
        ctx.strokeStyle = "#320010"; // Heart outline
        ctx.lineWidth = 1; // 1-pixel thick outline relative to the baseSize

        ctx.beginPath();
        // Bezier math mapped precisely inside our 32x32 grid
        ctx.moveTo(16, 8);
        ctx.bezierCurveTo(16, 1, 4, 1, 4, 12);
        ctx.bezierCurveTo(4, 22, 16, 28, 16, 30); // Pointy bottom
        ctx.bezierCurveTo(16, 28, 28, 22, 28, 12);
        ctx.bezierCurveTo(28, 1, 16, 1, 16, 8);
        ctx.closePath();

        // Fill the heart first, then stamp the outline over it
        ctx.fill();
        ctx.stroke();
      },
    });

    pixelHeartCanvas.filtering = ImageFiltering.Pixel;
    pixelHeartCanvas.scale = vec(3, 3);

    this.graphics.use(pixelHeartCanvas);
  }
}
