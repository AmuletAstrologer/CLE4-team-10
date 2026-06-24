import { Actor, Color, FontUnit, Label, Vector, TextAlign } from "excalibur";
import { Resources } from "./resources";

export class Backbutton extends Actor {
  constructor() {
    super({ z: 50 });
  }

  onInitialize(engine) {
    const backbutton = new Label({
      text: "⇜",
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 60,
        color: Color.White,
        textAlign: TextAlign.Left,
      }),
    });

    backbutton.anchor = new Vector(0.5, 0.5);
    backbutton.pos = new Vector(50, 40);

    this.addChild(backbutton);

    backbutton.on("pointerenter", () => {
      backbutton.font.color = Color.Orange;
    });

    backbutton.on("pointerleave", () => {
      backbutton.font.color = Color.White;
    });

    backbutton.on("pointerup", () => {
      engine.goToScene("levels");
    });
  }
}
