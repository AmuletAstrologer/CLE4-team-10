import {
  Actor,
  Engine,
  Vector,
  Animation,
  AnimationStrategy,
  Shape,
  Collider,
  CollisionType,
} from "excalibur";
import { Resources, ResourceLoader } from "../resources.js";
import { UI } from "../scenes/levelfive/ui.js";
import { Trash } from "./trash.js";

export class Meteor extends Actor {
  #speed = 200;
  #oldVelocity = null;

  constructor() {
    super({
      width: 1,
      height: 1,
      collider: Shape.Box(250, 250),
      collisionType: CollisionType.Passive,
    });
    const meteorSprite = Resources.Meteor.toSprite();

    this.graphics.use(meteorSprite);
    this.scale = new Vector(0.24, 0.24);
  }

  onInitialize(engine) {
    this.on("collisionstart", (evt) => {
      if (this.scene?.isPaused) {
        return;
      }

      const other = evt.other.owner;

      if (other instanceof Trash) {
        this.scene?.onCollision(other.pos.x, other.pos.y);

        other.kill();
        // this.kill();
      }
    });
  }

  onPostUpdate(engine) {
    // Pause
    if (this.scene?.isPaused) {
      if (this.#oldVelocity === null) {
        this.#oldVelocity = this.vel.clone();
        this.vel = Vector.Zero;
      }

      return;
    }

    // Resume
    if (this.#oldVelocity !== null) {
      this.vel = this.#oldVelocity;
      this.#oldVelocity = null;
    }
  }
}
