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
  Buttons,
  Actor,
} from "excalibur";
import { Background } from "../../background/background.js";
import { BackgroundBox } from "../../actors/backgroundbox.js";
import { Resources } from "../../resources.js";
import { AchievementCard } from "./achievementcard.js";
import { AchievementManager } from "../../lib/achievementmanager.js";
import { Cursor } from "../../objects/cursor.js";

export class AchievementMenu extends Scene {
  hovered: Actor | null = null;
  cursor!: Cursor;

  onInitialize(engine: Engine) {
    const cursor = new Cursor();
    this.add(cursor);
    this.cursor = cursor;

    const background = new Background();
    this.add(background);

    const title = new Label({
      text: "Achievements",
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

    const mainContainer = new BackgroundBox(
      engine.halfDrawWidth,
      engine.halfDrawHeight + 20,
      750,
      530,
    );
    this.add(mainContainer);

    const achievementContainer = new BackgroundBox(130, 125, 225, 150);
    this.add(achievementContainer);

    const moreHookSpace = new AchievementCard(
      vec(engine.halfDrawWidth, engine.halfDrawHeight - 145),
      650,
      100,
      "Perfect Hooking",
    );
    this.add(moreHookSpace);

    const moreHookGetSpeed = new AchievementCard(
      vec(engine.halfDrawWidth, engine.halfDrawHeight - 35),
      650,
      100,
      "Scrap Collector",
    );
    this.add(moreHookGetSpeed);

    const moreHookThrowSpeed = new AchievementCard(
      vec(engine.halfDrawWidth, engine.halfDrawHeight + 75),
      650,
      100,
      "High Score",
    );
    this.add(moreHookThrowSpeed);

    const card3 = new AchievementCard(
      vec(engine.halfDrawWidth, engine.halfDrawHeight + 185),
      650,
      100,
      "Recycle Master",
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
        engine.goToScene("levels");
      }
      if (evt.key === Keys.PageUp) {
        localStorage.setItem("scrap", "999");
      }
    });
  }

  onPreDraw(ctx: ExcaliburGraphicsContext, elapsed: number): void {
    this.#scrapLabel.text = ScrapManager.getScrap().toString();
  }
  onPreUpdate(engine: Engine, elapsed: number): void {
    const gamepad = engine.input.gamepads.at(0);
    if (gamepad?.wasButtonPressed(Buttons.Face2)) {
      engine.goToScene("levels");
    }
    this.hovered = null;
    this.hovered =
      this.actors.find((actor) => {
        if (!(actor instanceof RecycleCard)) {
          return false;
        }

        return (
          this.cursor.pos.x >= actor.pos.x - actor.width / 2 &&
          this.cursor.pos.x <= actor.pos.x + actor.width / 2 &&
          this.cursor.pos.y >= actor.pos.y - actor.height / 2 &&
          this.cursor.pos.y <= actor.pos.y + actor.height / 2
        );
      }) ?? null;
    if (gamepad?.wasButtonPressed(Buttons.Face1)) {
      if (this.hovered instanceof RecycleCard) {
        console.log(this.hovered.buyItem());
      }
    }
  }
}
