import {
  Scene,
  Label,
  Actor,
  Vector,
  Random,
  FontSource,
  FontUnit,
  Buttons,
  Color,
  Text,
  TextAlign,
  BaseAlign,
  vec,
  Keys,
} from "excalibur";
import { Resources, ResourceLoader } from "../resources.js";
import { Background } from "../background/background.js";
import { AchievementManager } from "../lib/achievementmanager.js";

export class LevelEnding extends Scene {
  onInitialize(engine) {
    const background = new Background();
    this.add(background);

    this.title = new Label({
      pos: new Vector(engine.halfDrawWidth, 360),
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 40,
        color: Color.White,
        textAlign: TextAlign.Center,
        baseAlign: BaseAlign.Middle,
      }),
    });

    this.continue = new Label({
      text: `Press X to continue`,
      pos: new Vector(engine.halfDrawWidth, 600),
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 32,
        color: Color.White,
        textAlign: TextAlign.Center,
        baseAlign: BaseAlign.Middle,
      }),
    });

    // const continueActor = new Actor({
    //   pos: new Vector(engine.halfDrawWidth, 600),
    //   anchor: vec(0.5, 0.5),
    // });

    // continueActor.graphics.use(this.continue);
    // continueActor.graphics.offset = vec(200, 0);

    this.continue.actions.repeatForever((ctx) => {
      ctx.fade(0.1, 800);
      ctx.fade(1, 800);
    });

    this.add(this.title);
    this.add(this.continue);

    engine.input.keyboard.on("press", (evt) => {
      if (evt.key === Keys.X) {
        engine.goToScene("levels");
      }
    });
  }
  onActivate(ctx) {
    const data = ctx.data;
    this.score = data?.score ?? 0;
    this.levelNumber = data?.levelNumber ?? 0;

    AchievementManager.completeLevel(this.levelNumber);

    this.title.text = `You completed level ${this.levelNumber}!`;
    if (this.levelNumber === 6) {
      this.title.text += ` Your score is ${this.score}`;
    }
  }
  onPreUpdate(engine) {
    const gamepad = engine.input.gamepads.at(0);
    if (
      gamepad?.wasButtonPressed(Buttons.Face2) ||
      engine.input.keyboard.wasPressed(Keys.X)
    ) {
      engine.goToScene("levels");
    }
  }
}
