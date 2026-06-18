import { Scene, Label, Actor, Vector, Random, FontSource, FontUnit, Color, Text, TextAlign, vec } from "excalibur";
import { Resources, ResourceLoader } from "../../resources.js";
import { Background } from "../../background/background.js"

export class Level1Ending extends Scene {

    onInitialize(engine) {
        const background = new Background();
        this.add(background);

        this.title = new Label({
            text: `You completed level 1! Your score is ${this.score}`,
            pos: new Vector(engine.halfDrawWidth, 360),
            font: Resources.Pixelfont.toFont({
                unit: FontUnit.Px,
                size: 40,
                color: Color.White,
                textAlign: TextAlign.Center
            })
        });

        this.continue = new Text({
            text: `Press spacebar to continue`,
            font: Resources.Pixelfont.toFont({
                unit: FontUnit.Px,
                size: 32,
                color: Color.White,
                textAlign: TextAlign.Center
            })
        });

        const continueActor = new Actor({
            pos: new Vector(engine.halfDrawWidth, 600),
            anchor: vec(0.5, 0.5)
        });

        continueActor.graphics.use(this.continue);
        continueActor.graphics.offset = vec(200, 0);

        continueActor.actions.repeatForever((ctx) => {
            ctx.fade(0.1, 800);
            ctx.fade(1, 800)
            
        });

        this.add(this.title)
        this.add(continueActor)
    }
    onActivate(ctx) {
        const data = ctx.data;
        this.score = data?.score ?? 0;
        this.title.text = `You completed level 1! Your score is ${this.score}`
    }
}
