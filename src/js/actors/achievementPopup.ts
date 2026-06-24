import {
  Actor,
  Vector,
  Label,
  Color,
  FontUnit,
  TextAlign,
  BaseAlign,
  Engine,
} from "excalibur";
import { Resources, ResourceLoader } from "../resources";
export class AchievementPopup extends Actor {
  private timer = 0;
  constructor(text: string) {
    super({ pos: new Vector(800, 100), z: 1000 });
    const popupLabel = new Label({
      text,
      pos: Vector.Zero,
      font: Resources.PixelFont.toFont({
        size: 35,
        unit: FontUnit.Px,
        textAlign: TextAlign.Center,
        baseAlign: BaseAlign.Middle,
        color: Color.White,
      }),
    });
    this.addChild(popupLabel);
  }
  onPreUpdate(engine: Engine, elapsed: number): void {
    this.timer += elapsed;
    this.pos.y -= 0.05 * elapsed;
    if (this.timer > 2000) {
      this.kill();
    }
  }
}
