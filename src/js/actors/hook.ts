import {
  Actor,
  Engine,
  Keys,
  Shape,
  vec,
  CollisionType,
  ExitViewPortEvent,
  Collider,
  CollisionContact,
  Side,
  Buttons,
  Axes,
} from "excalibur";
import { Resources } from "../resources.js";
import { Trash } from "../objects/trash.js";
import { Meteor } from "../objects/meteor.js";
import {
  UpgradeTypes,
  RecycleCard,
} from "../scenes/recyclemenu/recyclecard.js";
import { BaseScene } from "../objects/createGame.js";
import { ScrapManager } from "../lib/scrapmanager.js";

export class Hook extends Actor {
  #moveTime = 0;
  #isMoving = false;
  #amountOfObjects = 0;
  public x;
  public y;

  constructor(x = 900, y = 650) {
    super({
      name: "hook",
      pos: vec(x, y),
      collider: Shape.Circle(64),
      collisionType: CollisionType.Passive,
    });
    this.x = x;
    this.y = y;

    const haakSprite = Resources.Hook.toSprite();
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
      if (this.children.length > 0) {
        for (const child in this.children) {
          ScrapManager.addScrap();

          (this.scene as BaseScene)?.addScore?.();

          (this.scene as BaseScene)?.addObjective();
        }
      }

      if (this.#amountOfObjects > 0) {
        this.removeAllChildren();
      }

      this.pos = vec(this.x, this.y);
      this.vel = vec(0, 0);
      this.rotation = 0;
      this.#isMoving = false;
    }
    const gamepad = engine.input.gamepads.at(0);
    const x = gamepad?.getAxes(Axes.LeftStickX) ?? 0;
    const y = gamepad?.getAxes(Axes.LeftStickY) ?? 0;
    if (!this.#isMoving) {
      this.rotation += x * 0.025;
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

    if (
      engine.input.keyboard.isHeld(Keys.Space) ||
      (gamepad?.wasButtonPressed(Buttons.Face1) && !this.#isMoving)
    ) {
      const dx = Math.sin(this.rotation);
      const dy = -Math.cos(this.rotation);

      this.vel.x =
        dx * (500 + ScrapManager.getUpgradeLevel("moreHookThrowSpeed") * 50);
      this.vel.y =
        dy * (500 + ScrapManager.getUpgradeLevel("moreHookThrowSpeed") * 50);

      this.#moveTime = 500;
      this.#isMoving = true;

      this.removeAllChildren();
      this.#amountOfObjects = 0;
    }
  }

  onViewportExit(event: ExitViewPortEvent) {
    this.actions.moveTo(this.x, this.y, 500);
  }

  onCollisionStart(
    self: Collider,
    other: Collider,
    side: Side,
    contact: CollisionContact,
  ): void {
    if (
      other.owner instanceof Trash &&
      this.#amountOfObjects < 1 + ScrapManager.getUpgradeLevel("moreHookSpace")
    ) {
      other.owner.body.collisionType = CollisionType.PreventCollision;
      other.owner.vel = vec(0, 0);
      other.owner.pos = vec(-10, -25);

      this.addChild(other.owner);
      this.#amountOfObjects++;
      // this.#hasObject = true;

      // this.actions.clearActions();
      // this.actions.moveTo(
      //   this.x,
      //   this.y,
      //   500 / 4 + RecycleCard.getValueFromLocalStorage("moreHookGetSpeed") * 25,
      // );
    }
    if (other.owner instanceof Meteor) {
      this.#amountOfObjects = 1 + ScrapManager.getUpgradeLevel("moreHookSpace");
      // this.#hasObject = true;
      // this.actions.moveTo(
      //   this.x,
      //   this.y,
      //   500 / 4 +
      //     RecycleCard.getValueFromLocalStorage("moreHookGetSpeed") * 25,
      // );
    }
    // this.#hasObject = true;

    if (
      this.#amountOfObjects >=
      1 + ScrapManager.getUpgradeLevel("moreHookSpace")
    ) {
      this.actions.clearActions();
      this.actions.moveTo(
        this.x,
        this.y,
        500 / 4 + ScrapManager.getUpgradeLevel("moreHookGetSpeed") * 25,
      );
    }
  }

  between(x: number, min: number, max: number) {
    return x >= min && x <= max;
  }
}
