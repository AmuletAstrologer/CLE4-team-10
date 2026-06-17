import { Color, FontUnit, Label, Scene, Vector } from 'excalibur';
import { Resources } from '../resources.js'
import { Background } from "../background/background.js"
import { StartLabel } from '../startlabel.js';
import { StartMenu } from '../startmenu.js';


export class Start extends Scene {

    onInitialize(engine) {
             const background = new Background();
        this.add(background);

        this.add(new StartLabel);
        this.add(new StartMenu);
    

        const title = new Label({
            text: "Start",
            pos: new Vector(50, 20),
            fontSize: 40
        });

        this.add(title);
    }

}