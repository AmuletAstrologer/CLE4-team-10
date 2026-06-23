import { Scene, Label, Actor, Vector, Random, FontSource, FontUnit, Color } from "excalibur";
import { Resources, ResourceLoader } from "../../resources.js";
import { Background } from "../../background/background.js"

export class Level3Ending extends Scene {

    onInitialize(engine) {
        const background = new Background();
        this.add(background);
        this.title = new Label({
            text: `You completed level 3! Your score is ${this.score}`,
            pos: new Vector(300, 360),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 40,
                color: Color.White
            })
        });

        this.add(this.title)
    }
    onActivate(ctx) {
        const data = ctx.data;
        this.score = data?.score ?? 0;
        this.title.text = `You completed level 3! Your score is ${this.score}`
    }
}
