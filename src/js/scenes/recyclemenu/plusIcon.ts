import { Actor, Canvas, Color, Vector } from "excalibur";

export class PlusIcon extends Actor {
  #color: string;
  #hoverColor: string | undefined;

  #activeColor: string;

  constructor(config: {
    position: Vector;
    size: number;
    color: string;
    hoverColor?: string;
  }) {
    super({
      pos: config.position,
      width: config.size,
      height: config.size,
    });
    this.#color = config.color;
    this.#hoverColor = config.hoverColor;

    this.#activeColor = this.#color;

    const size = config.size;
    const thickness = size * 0.2;

    const plusDrawing = new Canvas({
      width: size,
      height: size,
      draw: (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = this.#activeColor;
        ctx.fillRect(0, (size - thickness) / 2, size, thickness);
        ctx.fillRect((size - thickness) / 2, 0, thickness, size);
      },
    });

    this.on("pointerenter", () => {
      this.#activeColor = this.#hoverColor ?? "#C6DCFF";
    });

    this.on("pointerleave", () => {
      this.#activeColor = this.#color;
    });

    this.graphics.use(plusDrawing);
  }
}
