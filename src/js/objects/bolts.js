import { Actor, Engine, Vector, Animation, AnimationStrategy, Shape, Collider, CollisionType } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { UI } from "../scenes/levelone/ui.js";

export class Bolt extends Actor {
    #speed = 200;
    constructor() {
        super({
            width: 1,
            height: 1,
            collider: Shape.Box(250, 250),
            speed: 300,
        });
    }


    onInitialize(engine) {
        this.scale = new Vector(0.12, 0.12);
        this.on('pointerdown', () => {
            this.kill()
            this.scene?.addScore()
        });

}
    


}