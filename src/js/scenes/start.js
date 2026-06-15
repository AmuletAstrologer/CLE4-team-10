import { Label, Scene } from 'excalibur';
import { Resources } from '../resources.js'
import { Background } from "../background/background.js"


export class Start extends Scene {
    
    onInitialize(engine) {
        const background = new Background();
        this.add(background);

        const nameLabel = new Label({
            text: "SUSTAINSPHERE",
        })
    }


}