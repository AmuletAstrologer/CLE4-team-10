import { Color, FontUnit, Label, Scene } from 'excalibur';
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
    }

}