import {
  Actor,
  Engine,
  Keys,
  Shape,
  vec,
  CollisionType,
  ExitViewPortEvent,
} from "excalibur";
import { Resources } from "../resources.js";

export class Haak extends Actor {
  #moveTime = 0;
  #isMoving = false;
  #hasObject = false;
  public x;
  public y;

  constructor(x = 900, y = 650) {
    super({
      name: "haak",
      pos: vec(x, y),
      width: 50,
      height: 50,
      collisionType: CollisionType.Active,
      collider: Shape.Circle(64),
    });
    this.x = x;
    this.y = y;

    const haakSprite = Resources.Haak.toSprite();
    haakSprite.scale = vec(0.2, 0.2);

    this.graphics.use(haakSprite);

    this.on("exitviewport", (event) => this.onViewportExit(event));
  }

  onPreUpdate(engine: Engine, delta: number): void {
    if (this.#moveTime >= 0 && this.#isMoving) {
      this.#moveTime -= delta;
    }

    if (
      this.#moveTime <= 20 &&
      this.#isMoving === true &&
      this.between(this.pos.x, this.x - 5, this.x + 5) &&
      this.between(this.pos.y, this.y - 5, this.y + 5)
    ) {
      this.pos = vec(this.x, this.y);
      this.vel = vec(0, 0);
      this.rotation = 0;
      this.#isMoving = false;
    }

    if (
      (engine.input.keyboard.isHeld(Keys.ArrowLeft) ||
        engine.input.keyboard.isHeld(Keys.A)) &&
      !this.#isMoving
    ) {
      this.rotation -= 0.025;
    }
    if (
      (engine.input.keyboard.isHeld(Keys.ArrowRight) ||
        engine.input.keyboard.isHeld(Keys.D)) &&
      !this.#isMoving
    ) {
      this.rotation += 0.025;
    }
    if (engine.input.keyboard.isHeld(Keys.Space) && !this.#isMoving) {
      const dx = Math.sin(this.rotation);
      const dy = Math.cos(this.rotation);

      this.vel.x = dx * 500;
      this.vel.y = dy * -500;

      this.#moveTime = 500;
      this.#isMoving = true;
    }
  }

  onViewportExit(event: ExitViewPortEvent) {
    this.vel.x = -this.vel.x;
    this.vel.y = -this.vel.y;

    // this.vel.x = -this.vel.x / 5;
    // this.vel.y = -this.vel.y / 5;
  }

  between(x: number, min: number, max: number) {
    return x >= min && x <= max;
  }
}
