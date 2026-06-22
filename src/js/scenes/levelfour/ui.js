import {
  Actor,
  Color,
  FontUnit,
  Label,
  Vector,
  TextAlign,
  BaseAlign,
  vec,
} from "excalibur";
import { Resources } from "../../resources";
import { Healthbar } from "../../actors/healthbar/healthbar.ts";

export class UI extends Actor {
  #label1;
  #objective;
  #target;
  #health;

  constructor(shot) {
    super({});
  }

  onInitialize(engine) {
    // When score gets in double minus, it starts going off screen.
    this.#label1 = new Label({
      text: "Score: 0",
      pos: new Vector(1130, 30),
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 32,
        color: Color.White,
      }),
    });
    this.addChild(this.#label1);

    this.#objective = new Label({
      text: "0/10",
      pos: new Vector(600, 30),
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
      pos: new Vector(500, 80),
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 32,
        color: Color.Yellow,
      }),
    });
    this.addChild(this.#target);

    this.#health = new Healthbar({ pos: vec(100, 50) });
    // this.#health.pos = new Vector(100, 30);
    this.addChild(this.#health);
  }

  updateScore(score) {
    this.#label1.text = `Score: ${score}`;
  }
  updateObjective(objective) {
    this.#objective.text = `${objective}/10`;
  }
  updateTarget(target) {
    if (!this.#target) return;
    this.#target.text = `Target: ${target}`;
  }
}
