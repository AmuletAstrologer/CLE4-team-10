import { Engine, Actor} from "excalibur"
import { Resources, ResourceLoader } from "../resources.js"


export class Background extends Actor {

    constructor() {
        super({
            width: 1280,
            height: 720,
            x: 1280/2,
            y: 720/2, 

        })
        
    }

    onInitialize (engine){
        this.graphics.use (Resources.Background.toSprite());
        this.z = -1; 
    }
}