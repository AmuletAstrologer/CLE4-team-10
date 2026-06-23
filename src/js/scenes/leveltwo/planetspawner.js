import { Actor, Random, Vector } from "excalibur";
import { Resources } from "../../resources";

export class PlanetSpawner extends Actor {
    constructor() {
        super({ radius: Resources.yellowringPlanet.height / 2});
    }

    onInitialize(engine) {
        this.rand = new Random();
        this.graphics.use(Resources.yellowringPlanet.toSprite());
        this.scale = new Vector(0.5, 0.5);
        this.pos = new Vector(
            this.rand.integer(this.width, engine.drawWidth - this.width),
            this.rand.integer(this.height, engine.drawHeight - this.height),
        );
        this.vel = new Vector(this.rand.integer(30, 60), this.rand.integer(30, 60));
    }

    onPostUpdate(engine) {
        if (this.pos.x < 0 || this.pos.x + this.width > engine.drawWidth) {
            this.vel.x = -this.vel.x;
        }
        if (this.pos.y < 0 || this.pos.y + this.height > engine.drawHeight) {
            this.vel.y = -this.vel.y;
        }
    }
}