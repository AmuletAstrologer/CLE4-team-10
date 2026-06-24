import {
  ScreenElement,
  Color,
  FontUnit,
  Label,
  vec,
  Vector,
  BaseAlign,
  TextAlign,
  Engine,
} from "excalibur";
import { Resources } from "../resources";
import { Healthbar } from "./healthbar/healthbar";
import { Backbutton } from "../backbutton";

export class BaseLevelUI extends ScreenElement {
  #target: Label | undefined;
  healthBar: Healthbar | undefined;

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

  #timer = new Label({
    text: "03:00",
    font: Resources.PixelFont.toFont({
      unit: FontUnit.Px,
      size: 32,
      color: Color.White,
      textAlign: TextAlign.Right,
      baseAlign: BaseAlign.Middle,
    }),
  });

  #backbutton = new Backbutton();

  constructor(config: { level: number }) {
    super({});

    if (config.level >= 3) {
      this.#target = new Label({
        // @ts-expect-error
        text: `Target: ${this.scene?.currentTarget ?? "None"}`,
        font: Resources.PixelFont.toFont({
          unit: FontUnit.Px,
          size: 32,
          color: Color.Yellow,
          textAlign: TextAlign.Center,
          baseAlign: BaseAlign.Middle,
        }),
      });
      this.addChild(this.#target);
    }

    if (config.level >= 4) {
      this.healthBar = new Healthbar({});
      this.addChild(this.healthBar);
    }

    this.addChild(this.#objective);
    this.addChild(this.#timer);
    this.addChild(this.#backbutton);
  }

  onInitialize(engine: Engine) {
    this.#objective.pos = vec(engine.halfDrawWidth, 30);
    this.#timer.pos = vec(engine.drawWidth - 40, 30);

    if (this.#target) this.#target.pos = vec(engine.halfDrawWidth, 80);
    if (this.healthBar) this.healthBar.pos = vec(100, engine.drawHeight - 100);
  }

  updateObjective(objective: string) {
    this.#objective.text = `${objective}/10`;
  }
  updateTarget(target: string) {
    if (!this.#target) return;
    this.#target.text = `Target: ${target}`;
  }

  updateTimer(timeLeft: number) {
    if (!this.#timer) return;

    const seconds = Math.ceil(timeLeft / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    this.#timer.text = `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }
}
