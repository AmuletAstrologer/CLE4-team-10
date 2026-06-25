import {
  Actor,
  Color,
  FontUnit,
  Label,
  Vector,
  BaseAlign,
  TextAlign,
  vec,
} from "excalibur";
import { Resources } from "../../resources";
import { BackgroundBox } from "../../actors/backgroundbox";
import { Healthbar } from "../../actors/healthbar/healthbar";

export class UI extends Actor {
  #objective;
  #target;
  #timer;

  constructor(shot) {
    super({});
  }

  onInitialize(engine) {
    this.#objective = new Label({
      text: "0/10",
      pos: new Vector(engine.halfDrawWidth, 30),
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 40,
        color: Color.White,
        textAlign: TextAlign.Center,
        baseAlign: BaseAlign.Middle,
      }),
    });
    this.addChild(this.#objective);

    this.#target = new Label({
      text: `Target: ${this.scene?.currentTarget ?? "None"}`,
      pos: new Vector(engine.halfDrawWidth, 80),
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 32,
        color: Color.Yellow,
        textAlign: TextAlign.Center,
        baseAlign: BaseAlign.Middle,
      }),
    });
    this.addChild(this.#target);

    this.#timer = new Label({
      text: "02:00",
      pos: new Vector(1200, 30),
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 32,
        color: Color.White,
        textAlign: TextAlign.Center,
        baseAlign: BaseAlign.Middle,
      }),
    });

    this.addChild(this.#timer);

    this.health = new Healthbar({ pos: vec(40, engine.drawHeight - 50) });
    this.addChild(this.health);
  }

  updateObjective(objective) {
    this.#objective.text = `${objective}/10`;
  }
  updateTarget(target) {
    if (!this.#target) return;
    this.#target.text = `Target: ${target}`;
  }

  updateTimer(timeLeft) {
    if (!this.#timer) return;

    const seconds = Math.ceil(timeLeft / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    this.#timer.text = `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }
}
