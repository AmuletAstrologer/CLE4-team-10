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
import { BaseScene } from "../../objects/createGame";

export class Healthbar extends Actor {
  #health = 3;

  constructor(config: { pos?: Vector, maxHealth?: number }) {
    super({
      pos: config.pos,
    });
    this.#health = config.maxHealth ?? 3;

    for (let i = 0; i < this.#health; i++) {
      this.addChild(new Heart({ pos: vec(0 + i * 75, 0) }).addTag(`heart${i}`));
    }
  }

  decrease(): void {
    if (this.#health - 1 <= 0) {
      if (this.scene instanceof BaseScene) this.scene.defeat();
      return;
    }

    const target = this.children.find((c) =>
      c.hasTag(`heart${this.#health - 1}`),
    );

    if (target) {
      this.removeChild(target);
      this.#health--;
    }
  }
}
