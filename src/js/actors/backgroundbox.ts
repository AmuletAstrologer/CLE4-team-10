import { Actor, Engine, vec, Canvas } from "excalibur";

export class BackgroundBox extends Actor {
  #width: number;
  #height: number;
  #outerRadius = 20;

  #outerBorderWidth = 1;
  #innerBorderWidth = 4;
  #inlineGap = 32;

  constructor(x: number, y: number, width: number, height: number) {
    super({
      pos: vec(x, y),
      width,
      height,
    });
    this.#width = width;
    this.#height = height;
  }

  onInitialize(engine: Engine): void {
    const roundedGraphic = new Canvas({
      width: this.#width,
      height: this.#height,
      draw: (ctx: CanvasRenderingContext2D) => {
        const outerOffset = this.#outerBorderWidth / 2;
        const outerDrawW = this.#width - this.#outerBorderWidth;
        const outerDrawH = this.#height - this.#outerBorderWidth;

        ctx.beginPath();
        ctx.roundRect(
          outerOffset,
          outerOffset,
          outerDrawW,
          outerDrawH,
          this.#outerRadius,
        );

        ctx.fillStyle = "#305bab99"; // Main background fill
        ctx.fill();

        ctx.lineWidth = this.#outerBorderWidth;
        ctx.strokeStyle = "#305bab"; // Outer border color
        ctx.stroke();

        const innerOffset =
          this.#outerBorderWidth + this.#inlineGap + this.#innerBorderWidth / 2;
        const innerDrawW = this.#width - innerOffset * 2;
        const innerDrawH = this.#height - innerOffset * 2;

        const innerRadius = Math.max(0, this.#outerRadius);

        ctx.beginPath();
        ctx.roundRect(
          innerOffset,
          innerOffset,
          innerDrawW,
          innerDrawH,
          innerRadius,
        );

        ctx.lineWidth = this.#innerBorderWidth;
        ctx.strokeStyle = "#C6DCFF"; // Inner border color
        ctx.stroke();
      },
    });

    // 4. Instruct the actor to use your custom graphic
    this.graphics.use(roundedGraphic);
  }
}
