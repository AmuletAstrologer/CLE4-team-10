import { Actor, Color, Buttons, Shape, CollisionType } from "excalibur";

export class Planet extends Actor {
  constructor({ sprite, level, scale, hoversprite, pos }) {
    super({
      width: sprite.width,
      height: sprite.height,
      collider: Shape.Circle(100),
      collisionType: CollisionType.Passive,
    });
    this.sprite = sprite;
    this.level = level;
    this.scale = scale;
    this.hoversprite = hoversprite;
    this.pos = pos;
  }

  onInitialize(engine) {
    this.sprite = this.sprite;

    this.graphics.use(this.sprite);

    this.scale = this.scale;
    this.on("pointerup", () => {
      console.log(`Ga naar level ${this.level}`);
      engine.goToScene(this.level);
      console.log(this.level);
    });
    this.on("pointerenter", () => {
      this.graphics.use(this.hoversprite);
    });
    this.on("pointerleave", () => {
      this.graphics.use(this.sprite);
    });
    this.on("collisionstart", (evt) => {
      this.graphics.use(this.hoversprite);
    });
    this.on("collisionend", (evt) => {
      this.graphics.use(this.sprite);
    });
  }
}
