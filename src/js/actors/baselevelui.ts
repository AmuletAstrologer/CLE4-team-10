import {
  ScreenElement,
  Color,
  FontUnit,
  Label,
  vec,
  BaseAlign,
  TextAlign,
  Engine,
  Buttons,
  Keys,
} from "excalibur";
import { Resources } from "../resources";
import { Healthbar } from "./healthbar/healthbar";
import { Backbutton } from "../backbutton";
import { AchievementManager } from "../lib/achievementmanager";
import { AchievementPopup } from "./achievementPopup";

export class BaseLevelUI extends ScreenElement {
  healthBar: Healthbar | undefined;
  #timer: Label | undefined;

  #objective = new Label({
    text: "0/10",
    font: Resources.PixelFont.toFont({
      unit: FontUnit.Px,
      size: 40,
      color: Color.White,
      textAlign: TextAlign.Center,
      baseAlign: BaseAlign.Middle,
    }),
  });

  #target = new Label({
    // @ts-expect-error
    text: `Objective: ${this.scene?.currentTarget ?? "None"}`,
    font: Resources.PixelFont.toFont({
      unit: FontUnit.Px,
      size: 32,
      color: Color.Yellow,
      textAlign: TextAlign.Center,
      baseAlign: BaseAlign.Middle,
    }),
  });

  #backbutton = new Backbutton();

  constructor(config: { level: number }) {
    super({});

    if (config.level >= 4) {
      this.healthBar = new Healthbar({});
      this.addChild(this.healthBar);
    }

    if (config.level >= 3) {
      this.#timer = new Label({
        text: "03:00",
        font: Resources.PixelFont.toFont({
          unit: FontUnit.Px,
          size: 32,
          color: Color.White,
          textAlign: TextAlign.Right,
          baseAlign: BaseAlign.Middle,
        }),
      });
      this.addChild(this.#timer);
    }

    this.addChild(this.#objective);
    this.addChild(this.#target);
    this.addChild(this.#backbutton);
  }

  onInitialize(engine: Engine) {
    this.#objective.pos = vec(engine.halfDrawWidth, 30);
    this.#target.pos = vec(engine.halfDrawWidth, 80);

    if (this.#timer) this.#timer.pos = vec(engine.drawWidth - 40, 30);
    if (this.healthBar) this.healthBar.pos = vec(100, engine.drawHeight - 100);
  }

  updateObjective(objective: number | string) {
    this.#objective.text = `${objective}/10`;
  }

  updateTarget(target: string) {
    if (!this.#target) return;
    this.#target.text = `Objective: ${target}`;
  }

  updateTimer(timeLeft: number) {
    if (!this.#timer) return;

    const seconds = Math.ceil(timeLeft / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    this.#timer.text = `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  onPreUpdate(engine: Engine, elapsed: number): void {
    const gamepad = engine.input.gamepads.at(0);
    if (
      gamepad?.wasButtonPressed(Buttons.Face2) ||
      engine.input.keyboard.wasPressed(Keys.X)
    ) {
      engine.goToScene("levels");
    }
    const achievements = AchievementManager.checkAchievements();
    for (const a of achievements)
      switch (a) {
        case 1:
          engine.currentScene.add(new AchievementPopup("Perfect Hooking"));
          break;
        case 2:
          engine.currentScene.add(new AchievementPopup("Scrap Collector"));
          break;
        case 3:
          engine.currentScene.add(new AchievementPopup("High Score"));
          break;
        case 4:
          engine.currentScene.add(new AchievementPopup("Recycle Master"));
          break;
      }
  }
}
