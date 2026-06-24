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
import { UI } from "../scenes/levelone/ui.js";
import { Trash } from "./trash.js";

export class Meteor extends Actor {
  #speed = 200;
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
      const other = evt.other.owner;

      if (other instanceof Trash) {
        this.scene?.onCollision(other.pos.x, other.pos.y);

        other.kill();
        // this.kill();
      }
    });
  }
}
