import { Actor, Engine, Vector, Animation, AnimationStrategy, Shape, Collider, CollisionType } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { UI } from "../scenes/levelone/ui.js";

export class Trash extends Actor {
    #speed = 200;
    constructor() {
        super({
            width: 1,
            height: 1,
            collider: Shape.Box(250, 250),
            collisionType: CollisionType.Active,
        });
    }


    onInitialize(engine) {
        this.scale = new Vector(0.12, 0.12);
        this.on('pointerdown', () => {
            this.kill()
            this.scene?.addScore()
        });

        this.on('collisionstart', (e) => {
            if (e.other.owner instanceof Trash) {
                this.kill()
                e.other.owner.kill()
                const self = this.pos;
                const other = e.other.owner.pos;

                const x = (self.x + other.x) / 2;
                const y = (self.y + other.y) / 2;
                this.scene?.onCollision(x, y)
            }
        })
    }
    onPostUpdate(engine, delta) {
        const bounds = engine.screen;

        if (this.pos.x < 0 || this.pos.x > engine.drawWidth) {
            this.vel.x *= -1;
        }
        if (this.pos.y < 0 || this.pos.y > engine.drawHeight) {
            this.vel.y *= -1;
        }
    }


}