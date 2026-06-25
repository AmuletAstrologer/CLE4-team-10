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
    AchievementManager.checkAchievements();
    this.actors.forEach((a) => a.kill());
    this.buildScene(engine);
  }

  buildScene(engine: Engine) {
    const uncompletedBackgroundColor = "#ed405a";
    const completedBackgroundColor = "#40ed5d";
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

    const perfectHooking = new AchievementCard(
      vec(engine.halfDrawWidth, engine.halfDrawHeight - 145),
      650,
      100,
      "Perfect Hooking",
      AchievementManager.isUnlocked("Perfect Hooking")
        ? completedBackgroundColor
        : uncompletedBackgroundColor,
    );
    this.add(perfectHooking);

    const scrapCollector = new AchievementCard(
      vec(engine.halfDrawWidth, engine.halfDrawHeight - 35),
      650,
      100,
      "Scrap Collector",
      AchievementManager.isUnlocked("Scrap Collector")
        ? completedBackgroundColor
        : uncompletedBackgroundColor,
    );
    this.add(scrapCollector);

    const highScore = new AchievementCard(
      vec(engine.halfDrawWidth, engine.halfDrawHeight + 75),
      650,
      100,
      "High Score",
      AchievementManager.isUnlocked("High Score")
        ? completedBackgroundColor
        : uncompletedBackgroundColor,
    );
    this.add(highScore);

    const recycleMaster = new AchievementCard(
      vec(engine.halfDrawWidth, engine.halfDrawHeight + 185),
      650,
      100,
      "Recycle Master",
      AchievementManager.isUnlocked("Recycle Master")
        ? completedBackgroundColor
        : uncompletedBackgroundColor,
    );
    this.add(recycleMaster);

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
    AchievementManager.checkAchievements();
    const engine = context.engine;
    this.actors.forEach((a) => a.kill());
    this.buildScene(engine);

    engine.input.keyboard.on("press", (evt) => {
      if (evt.key === Keys.X) {
        engine.goToScene("levels");
      }
      if (evt.key === Keys.PageUp) {
        localStorage.setItem("scrap", "999");
      }
    });
  }

  onPreUpdate(engine: Engine, elapsed: number): void {
    const gamepad = engine.input.gamepads.at(0);
    if (gamepad?.wasButtonPressed(Buttons.Face2)) {
      engine.goToScene("levels");
    }
    this.hovered = null;
    this.hovered =
      this.actors.find((actor) => {
        if (!(actor instanceof AchievementCard)) {
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
      if (this.hovered instanceof AchievementCard) {
        console.log(this.hovered);
      }
    }
  }
}
