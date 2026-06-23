import { Color, FontUnit, Label, Scene, Vector } from "excalibur";
import { Resources } from "../resources.js";
import { Background } from "../background/background.js";
import { StartLabel } from "../startlabel.js";
import { StartMenu } from "../startmenu.js";
import { Cursor } from "../objects/cursor.js";

export class Start extends Scene {
  onInitialize(engine) {
    const background = new Background();
    this.add(background);
    const cursor = new Cursor();
    this.add(cursor);

    this.add(new StartLabel());
    this.add(new StartMenu());

    const title = new Label({
      text: "Start",
      pos: new Vector(50, 20),
      fontSize: 40,
    });

    this.add(title);
  }

  onActivate(context) {
    const engine = context.engine;

    engine.input.keyboard.on("press", (evt) => {
      if (evt.key === "Enter") {
        // engine.goToScene("level1");
        // engine.goToScene("level3");
      }
    });
  }
}
