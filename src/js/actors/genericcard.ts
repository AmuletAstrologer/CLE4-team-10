import { Actor, Engine, vec, Canvas, PointerEvent, Vector } from "excalibur";

export class GenericCard extends Actor {
  #width: number;
  #height: number;
  #cornerRadius = 20;
  #borderWidth = 4;

  #backgroundColor: string;
  #borderColor: string;

  #activeBackgroundColor: string;
  #activeBorderColor: string;

  constructor(config: {
    pos: Vector;
    width: number;
    height: number;
    backgroundColor?: string;
    borderColor?: string;
  }) {
    super({
      pos: config.pos,
      width: config.width,
      height: config.height,
    });
    this.#width = config.width;
    this.#height = config.height;

    this.#backgroundColor = config.backgroundColor ?? "#305bab";
    this.#borderColor = config.borderColor ?? "#C6DCFF";

    this.#activeBackgroundColor = this.#backgroundColor + "99";
    this.#activeBorderColor = this.#borderColor + "60";

    const roundedGraphic = new Canvas({
      width: this.#width,
      height: this.#height,
      draw: (ctx: CanvasRenderingContext2D) => {
        const offset = this.#borderWidth / 2;
        const drawWidth = this.#width - this.#borderWidth;
        const drawHeight = this.#height - this.#borderWidth;

        ctx.beginPath();
        ctx.roundRect(
          offset,
          offset,
          drawWidth,
          drawHeight,
          this.#cornerRadius,
        );

        ctx.fillStyle = this.#activeBackgroundColor; // Main background fill
        ctx.fill();

        ctx.lineWidth = this.#borderWidth;
        ctx.strokeStyle = this.#activeBorderColor; // Border Color fill
        ctx.stroke();
      },
    });

    this.graphics.use(roundedGraphic);

    this.on("pointerenter", (event) => this.onPointerEnter(event));
    this.on("pointerleave", (event) => this.onPointerLeave(event));
  }

  onInitialize(engine: Engine): void {}

  onPointerEnter(event: PointerEvent) {
    this.#activeBackgroundColor = this.#backgroundColor + "D9";
    this.#activeBorderColor = this.#borderColor + "A9";
  }

  onPointerLeave(event: PointerEvent) {
    this.#activeBackgroundColor = this.#backgroundColor + "99";
    this.#activeBorderColor = this.#borderColor + "60";
  }
}
