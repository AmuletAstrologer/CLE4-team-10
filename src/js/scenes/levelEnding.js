import {
  Scene,
  Label,
  Actor,
  Vector,
  Random,
  FontSource,
  FontUnit,
  Color,
  Text,
  TextAlign,
  vec,
} from "excalibur";
import { Resources, ResourceLoader } from "../resources.js";
import { Background } from "../background/background.js";

export class LevelEnding extends Scene {
  onInitialize(engine) {
    const background = new Background();
    this.add(background);
    // console.log(this.levelNumber)

    this.title = new Label({
      pos: new Vector(engine.halfDrawWidth, 360),
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 40,
        color: Color.White,
        textAlign: TextAlign.Center,
      }),
    });

    this.continue = new Text({
      text: `Press spacebar to continue`,
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 32,
        color: Color.White,
        textAlign: TextAlign.Center,
      }),
    });

    const continueActor = new Actor({
      pos: new Vector(engine.halfDrawWidth, 600),
      anchor: vec(0.5, 0.5),
    });

    continueActor.graphics.use(this.continue);
    continueActor.graphics.offset = vec(200, 0);

    continueActor.actions.repeatForever((ctx) => {
      ctx.fade(0.1, 800);
      ctx.fade(1, 800);
    });

    this.add(this.title);
    this.add(continueActor);
  }
  onActivate(ctx) {
    console.log("LevelEnding scene activated with data:", ctx.data);

    const data = ctx.data;
    this.score = data?.score ?? 0;
    this.levelNumber = data?.levelNumber ?? 0;
    this.title.text = `You completed level ${this.levelNumber}! Your score is ${this.score}`;
  }
}
