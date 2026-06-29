import { Actor, Shape, Vector } from "excalibur";
import { PlanetSpawner } from "./planetspawner";
import { Hook } from "../../actors/hook";

export class AlteredTrash extends Actor {
  #speed = 200;
  savedVelocity = null;

  constructor() {
    super({
      width: 1,
      height: 1,
      collider: Shape.Box(250, 250),
      // collisionType: CollisionType.Active,
    });
  }

  onInitialize(engine) {
    this.scale = new Vector(0.12, 0.12);
    this.on("pointerdown", () => {
      this.kill();
      this.scene?.addObjective();
    });
  }

  onCollisionStart(self, other) {
    if (other.owner instanceof PlanetSpawner) {
      const hook = this.scene.actors.find((a) => a instanceof Hook);

      if (hook?.hasObject) {
        return; // ❗ Haak heeft iets → trash mag NIET botsen met planeet
      }

      // Normale collision
      this.kill();
      this.scene.removeSpawned();
      if (!this.scene?.objective <= 0) {
        this.scene.removeObjective();
      }
    }
  }

  onPostUpdate(engine, delta) {
    if (this.scene?.isPaused) {
      if (!this.savedVelocity) {
        this.savedVelocity = this.vel.clone();
        this.vel = Vector.Zero;
      }

      return;
    }

    if (this.savedVelocity) {
      this.vel = this.savedVelocity;
      this.savedVelocity = null;
    }

    const bounds = engine.screen;

    if (this.pos.x < 0 || this.pos.x > engine.drawWidth) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > engine.drawHeight) {
      this.vel.y *= -1;
    }
  }
}
