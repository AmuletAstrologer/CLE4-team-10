import {
  Actor,
  Engine,
  vec,
  Canvas,
  PointerEvent,
  Vector,
  ImageFiltering,
} from "excalibur";
import { Heart } from "./heart";

export class Healthbar extends Actor {
  #health = 3;

  constructor(config: { pos: Vector }) {
    super({
      pos: config.pos,
    });

    for (let i = 0; i < this.#health; i++) {
      this.addChild(new Heart({ pos: vec(0 + i * 60, 0) }));
    }
  }
}
