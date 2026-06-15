import { Actor, Engine, Vector, Animation, AnimationStrategy } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'

export class Trash extends Actor {
    #speed = 200;
    constructor() {
        super({
            width: 50,
            height: 20,
            pos: new Vector(1000, 400),
            vel: new Vector(Math.random() * 30 - 180, 0),
        });
    }


    onInitialize(engine) {
        this.graphics.use(Resources.AfvalFragment.toSprite());
        this.scale = new Vector(0.12, 0.12);
    }


}