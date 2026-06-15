import { Color, FontUnit, Actor, Shape, Vector, Label } from "excalibur"
import { Resources } from "./resources.js"

export class StartLabel extends Actor {
    
    constructor(){
        super();

        this.startlabel = new Label({
            text: "SUSTAINSPHERE",
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 28,
                color: Color.White
            })
        });
        this.startlabel.anchor = new Vector(0.5, 0.5);
        this.pos = new Vector(400, 25);
        this.addChild(this.startlabel);

        const metrics = this.startlabel.font.measureText(this.startlabel.text);
        this.collider.set(Shape.Box(metrics.width, metrics.height));
    }
}