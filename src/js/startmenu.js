import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";

export class StartMenu extends Actor {
    constructor() {
        super();
        this.graphics.use(Resources.StartsceneLabel.toSprite());
    }

    onInitialize(engine) {
        this.pos = new Vector(engine.drawWidth / 2, engine.drawHeight / 2 - 100);
        this.scale = new Vector(0.5, 0.5);
    }
}