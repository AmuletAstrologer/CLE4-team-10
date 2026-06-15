import { Color, FontUnit, Label, Scene } from 'excalibur';
import { Resources } from '../resources.js'
import { Background } from "../background/background.js"


export class Start extends Scene {
    onInitialize(engine) {
        const background = new Background();
        this.add(background);

        this.nameLabel = new Label({
            text: "SUSTAINSPHERE",
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 28,
                color: Color.White
            }),
            x: 10,
            y: 10,
        })

        this.add(this.nameLabel);
    }


}