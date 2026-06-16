import { Actor, Vector } from "excalibur";
import { Resources } from "../resources";

export class ArrowLayer extends Actor {
    constructor() {
        super({ z: 200});
    }
    
    
    onInitialize(engine) {
        this.graphics.use(Resources.levelArrows.toSprite());
        this.pos = new Vector(engine.drawWidth / 2, engine.drawHeight / 2);
        this.scale = new Vector(0.5, 0.5);
    }
}