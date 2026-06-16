import { Engine, Actor, Vector} from "excalibur"
import { Resources, ResourceLoader } from "../resources.js"


export class Background extends Actor {
    constructor() {
        super({ z: -100});
    }


    onInitialize (engine){
        this.graphics.use (Resources.Background.toSprite());
        this.anchor = new Vector(0,0);
    }
}