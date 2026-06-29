import {
  Actor,
  Engine,
  Vector,
  Axes,
  Shape,
  Collider,
  CollisionType,
} from "excalibur";
import { Resources, ResourceLoader } from "../resources.js";

export class Cursor extends Actor {
  constructor() {
    super({
      width: 1,
      height: 1,
      collider: Shape.Circle(100),
      pos: new Vector(640, 360),
    });
    this.scale = new Vector(0.12, 0.12);
    this.z = 9999;
    const cursorSprite = Resources.Cursor.toSprite();
    this.graphics.use(cursorSprite);
  }
  onPreUpdate(engine) {
    const gamepad = engine.input.gamepads.at(0);
    if (!gamepad.connected) {
      this.graphics.visible = false;
    } else {
      const x = gamepad?.getAxes(Axes.LeftStickX) ?? 0;
      const y = gamepad?.getAxes(Axes.LeftStickY) ?? 0;

      const speed = 5;

      this.pos.x += x * speed;
      this.pos.y += y * speed;
    }
  }
}
