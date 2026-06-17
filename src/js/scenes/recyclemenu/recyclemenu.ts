import {
  Scene,
  Label,
  Engine,
  Color,
  vec,
  SceneActivationContext,
  FontUnit,
  TextAlign,
  BaseAlign,
  Keys,
  ExcaliburGraphicsContext,
} from "excalibur";
import { Background } from "../../background/background.js";
import { BackgroundBox } from "../../actors/backgroundbox.js";
import { Resources } from "../../resources.js";
import { RecycleCard } from "./recyclecard.js";

export class RecycleMenu extends Scene {
  #scrapLabel = new Label({
    text: "0",
    pos: vec(75, 120),

    font: Resources.PixelFont.toFont({
      size: 40,
      unit: FontUnit.Px,
      textAlign: TextAlign.Left,
      baseAlign: BaseAlign.Middle,
      color: Color.White,
    }),
  });

  onInitialize(engine: Engine) {
    const background = new Background();
    this.add(background);

    const title = new Label({
      text: "Recycle Menu",
      pos: vec(engine.halfDrawWidth, 60),

      font: Resources.PixelFont.toFont({
        size: 50,
        unit: FontUnit.Px,
        textAlign: TextAlign.Center,
        baseAlign: BaseAlign.Middle,
        color: Color.White,
      }),
    });
    this.add(title);

    const mainBox = new BackgroundBox(
      engine.halfDrawWidth,
      engine.halfDrawHeight + 20,
      750,
      530,
    );
    this.add(mainBox);

    const scrapBox = new BackgroundBox(130, 125, 225, 150);
    this.add(scrapBox);

    this.add(this.#scrapLabel);

    const moreHookSpace = new RecycleCard(
      engine.halfDrawWidth,
      engine.halfDrawHeight - 145,
      650,
      100,
      "moreHookSpace",
    );
    this.add(moreHookSpace);

    const moreHookGetSpeed = new RecycleCard(
      engine.halfDrawWidth,
      engine.halfDrawHeight - 35,
      650,
      100,
      "moreHookGetSpeed",
    );
    this.add(moreHookGetSpeed);

    const moreHookThrowSpeed = new RecycleCard(
      engine.halfDrawWidth,
      engine.halfDrawHeight + 75,
      650,
      100,
      "moreHookThrowSpeed",
    );
    this.add(moreHookThrowSpeed);

    const card3 = new RecycleCard(
      engine.halfDrawWidth,
      engine.halfDrawHeight + 185,
      650,
      100,
      "",
    );
    this.add(card3);

    const backLabel = new Label({
      text: "Press X to go back",
      pos: vec(engine.halfDrawWidth, 675),

      font: Resources.PixelFont.toFont({
        size: 35,
        unit: FontUnit.Px,
        textAlign: TextAlign.Center,
        baseAlign: BaseAlign.Middle,
        color: Color.White,
      }),
    });
    this.add(backLabel);
  }

  onActivate(context: SceneActivationContext) {
    const engine = context.engine;

    engine.input.keyboard.on("press", (evt) => {
      if (evt.key === Keys.X) {
        engine.goToScene("start");
      }
      // if (evt.key === Keys.PageUp) {
      //   localStorage.setItem("scrap", "999");
      // }
    });
  }

  onPreDraw(ctx: ExcaliburGraphicsContext, elapsed: number): void {
    const scrap = localStorage.getItem("scrap");
    if (scrap !== null) {
      this.#scrapLabel.text = scrap.toString();
    } else {
      this.#scrapLabel.text = "0";
    }
  }
}
