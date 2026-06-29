import {
  Scene,
  Label,
  Engine,
  Color,
  vec,
  SceneActivationContext,
  FontUnit,
  TextAlign,
  BaseAlign,
  Keys,
  ExcaliburGraphicsContext,
  Buttons,
  Actor,
  ScreenElement,
  Vector,
  Canvas,
} from "excalibur";

export class ProgressBar extends ScreenElement {
  private progress: number = 1.0; // Value between 0 and 1
  progressBarColor = "#00ff00";
  //   width: number;
  //   height: number;
  private canvasGraphic!: Canvas;

  constructor(config: { x: number; y: number; width: number; height: number }) {
    super({
      pos: vec(config.x, config.y),
      anchor: Vector.Zero, // Keep anchor at top-left for easier drawing
      width: config.width,
      height: config.height,
    });
    // this.width = config.width;
    // this.height = height;
  }

  onInitialize(engine: ex.Engine) {
    // Create a dynamic canvas graphic to handle custom drawing
    this.canvasGraphic = new Canvas({
      width: this.width,
      height: this.height,
      draw: (ctx) => this.drawProgressBar(ctx),
    });

    this.graphics.use(this.canvasGraphic);
  }

  private drawProgressBar(ctx: CanvasRenderingContext2D) {
    // 1. Draw Background Bar (Gray)
    ctx.fillStyle = "#333333";
    ctx.fillRect(0, 0, this.width, this.height);

    // 2. Draw Filled Progress Bar (Green)
    ctx.fillStyle = this.progressBarColor;
    const filledWidth = this.width * this.progress;
    ctx.fillRect(0, 0, filledWidth, this.height);

    // 3. Optional: Border
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, this.width, this.height);
  }

  public setProgress(value: number) {
    // Clamp values safely between 0 and 1
    this.progress = Math.max(0, Math.min(1, value));

    // Flag the canvas to redraw its content
    // this.canvasGraphic.flagDirty();
  }
}
