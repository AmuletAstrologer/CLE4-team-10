import { Actor, Color, FontUnit, Label, Vector, vec } from "excalibur";
import { Resources } from "../../resources";
import { Healthbar } from "../../actors/healthbar/healthbar";

export class UI extends Actor {
  #label1;
  #objective;
  #target;
  #timer;

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

    this.#timer = new Label({
      text: "02:00",
      pos: new Vector(50, 30),
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 32,
        color: Color.White,
      }),
    });
    this.addChild(this.#timer);

    this.health = new Healthbar({ pos: vec(100, engine.drawHeight - 100) });
    this.addChild(this.health);
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

  updateTimer(timeLeft) {
    if (!this.#timer) return;

    const seconds = Math.ceil(timeLeft / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    this.#timer.text = `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }
}
