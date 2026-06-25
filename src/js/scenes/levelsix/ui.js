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
  #timer;
  #score;
  #objective;
  health;

  constructor(shot) {
    super({});
  }

  onInitialize(engine) {
    const endlessLabel = new Label({
      text: "ENDLESS MODE",
      pos: new Vector(engine.halfDrawWidth, 60),
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 32,
        color: Color.Yellow,
        textAlign: TextAlign.Center,
        baseAlign: BaseAlign.Middle,
      }),
    });

    this.addChild(endlessLabel);

    this.#objective = new Label({
      text: "Collected: 0",
      pos: new Vector(190, 35),
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 32,
        color: Color.White,
        textAlign: TextAlign.Center,
        baseAlign: BaseAlign.Middle,
      }),
    });

    this.addChild(this.#objective);

    this.#timer = new Label({
      text: "00:00",
      pos: new Vector(1200, 35),
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 32,
        color: Color.White,
        textAlign: TextAlign.Center,
        baseAlign: BaseAlign.Middle,
      }),
    });

    this.addChild(this.#timer);

    this.health = new Healthbar({ pos: vec(40, engine.drawHeight - 50), maxHealth: 1 });
    this.addChild(this.health);

    //Arcade score ui
    this.#score = new Label({
      text: "Score: 00000000",
      pos: new Vector(engine.halfDrawWidth, 30),
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 32,
        color: Color.White,
        textAlign: TextAlign.Center,
        baseAlign: BaseAlign.Middle,
      }),
    });

    this.addChild(this.#score);
  }

  updateTimer(timeElapsed) {
    if (!this.#timer) return;

    const totalSeconds = Math.floor(timeElapsed / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    this.#timer.text = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  updateObjective(objective) {
    this.#objective.text = `Collected: ${objective}`;
  }

  updateScore(score) {
    if (!this.#score) return;

    this.#score.text = `SCORE ${score.toString().padStart(8, "0")}`;
  }
}
