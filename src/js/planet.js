import { Actor, Color, Buttons, Shape, CollisionType } from "excalibur";

export class Planet extends Actor {
  constructor({ sprite, level, scale, hoversprite }) {
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
  }

  onInitialize(engine) {
    this.sprite = this.sprite;

    this.graphics.use(this.sprite.toSprite());

    this.scale = this.scale;
    this.on("pointerup", () => {
      console.log(`Ga naar level ${this.level}`);
      engine.goToScene(this.level);
      console.log(this.level);
    });
    this.on("pointerenter", () => {
      this.graphics.use(this.hoversprite.toSprite());
    });
    this.on("pointerleave", () => {
      this.graphics.use(this.sprite.toSprite());
    });
    this.on("collisionstart", (evt) => {
      this.graphics.use(this.hoversprite.toSprite());
    });
    this.on("collisionend", (evt) => {
      this.graphics.use(this.sprite.toSprite());
    });
  }
}
