import { Actor, Canvas, Color, Vector } from "excalibur";

export class PlusIcon extends Actor {
  constructor(config: { position: Vector; size: number; color: Color }) {
    super({
      pos: config.position,
      width: config.size,
      height: config.size,
    });
    this.color = config.color;

    const size = config.size;
    const thickness = size * 0.2;

    const plusDrawing = new Canvas({
      width: size,
      height: size,
      draw: (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = this.color.toRGBA();
        ctx.fillRect(0, (size - thickness) / 2, size, thickness);
        ctx.fillRect((size - thickness) / 2, 0, thickness, size);
      },
    });

    this.graphics.use(plusDrawing);
  }
}
