import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";

export class Startpoint extends Actor {
    onInitialize(engine) {
        this.graphics.use(Resources.startpoint.toSprite());
        this.pos = new Vector(385, 575);
        this.scale = new Vector(0.07, 0.07);
        this.rotation = 15 * (Math.PI / 180);
    }
}