import {
  ScreenElement,
  Color,
  FontUnit,
  Label,
  vec,
  Vector,
  BaseAlign,
  TextAlign,
  Engine,
} from "excalibur";
import { Resources } from "../resources";

export class LevelStart extends ScreenElement {
  #introTimer: number;

  #title = new Label({
    pos: new Vector(640, 280),
    opacity: 0,
    font: Resources.PixelFont.toFont({
      unit: FontUnit.Px,
      size: 60,
      color: Color.White,
      textAlign: TextAlign.Center,
      baseAlign: BaseAlign.Middle,
    }),
  });

  #intro = new Label({
    pos: new Vector(640, 360),
    opacity: 0,
    font: Resources.PixelFont.toFont({
      unit: FontUnit.Px,
      size: 40,
      color: Color.White,
      textAlign: TextAlign.Center,
      baseAlign: BaseAlign.Middle,
    }),
  });

  constructor(config: { levelNumber: string; levelName: string }) {
    super({});

    this.#title.text = config.levelNumber;
    this.#intro.text = config.levelName;

    this.addChild(this.#title);
    this.addChild(this.#intro);

    this.#introTimer = 0;
  }

  onPreUpdate(engine: Engine, elapsed: number): void {
    this.#introTimer += elapsed;

    if (this.#introTimer < 1000) {
      const alpha = this.#introTimer / 1000;

      this.#title.opacity = alpha;
      this.#intro.opacity = alpha;

      return;
    }

    if (this.#introTimer < 3000) {
      // Stay visible
      this.#title.opacity = 1;
      this.#intro.opacity = 1;

      return;
    }

    if (this.#introTimer < 4000) {
      // Fade out
      const alpha = 1 - (this.#introTimer - 3000) / 1000;

      this.#title.opacity = alpha;
      this.#intro.opacity = alpha;

      return;
    }

    this.kill();
  }
}
