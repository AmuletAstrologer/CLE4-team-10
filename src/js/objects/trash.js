import { Actor, Engine, Vector, Animation, AnimationStrategy } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'

export class Trash extends Actor {
    #speed = 200;
    constructor() {
        super({
            width: 90,
            height: 40,
            pos: new Vector(1000, 400),
            vel: new Vector(Math.random() * 30 - 180, 0),
        });
    }


    onInitialize(engine) {
        this.graphics.use(Resources.Trash.toSprite());

    }


}