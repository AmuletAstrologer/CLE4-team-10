import {
  Actor,
  Vector,
  Label,
  Color,
  FontUnit,
  TextAlign,
  BaseAlign,
  Engine,
  vec,
} from "excalibur";
import { Resources, ResourceLoader } from "../resources";
export class AchievementPopup extends Actor {
  #popupLabel = new Label({
    pos: Vector.Zero,
    font: Resources.PixelFont.toFont({
      size: 20,
      unit: FontUnit.Px,
      textAlign: TextAlign.Center,
      baseAlign: BaseAlign.Middle,
      color: Color.White,
    }),
  });

  private timer = 0;
  private duration = 2000;
  constructor(text: string) {
    super({ pos: new Vector(1200, 680), z: 1000 });
    this.#popupLabel.text = `Achievement Unlocked: ${text}`;

    this.addChild(this.#popupLabel);
  }
  onInitialize(engine: Engine): void {
    this.pos = vec(engine.drawWidth - 250, engine.drawHeight - 30);
    const music = Resources.achievementSound;
    music.play(0.65);
  }

  onPreUpdate(engine: Engine, elapsed: number): void {
    this.timer += elapsed;
    this.pos.y -= 0.05 * elapsed;
    const t = Math.min(this.timer / this.duration, 1);
    this.graphics.opacity = 1 - t;
    if (t >= 1 && this.#popupLabel !== undefined) {
      this.kill();
    }
  }
}
