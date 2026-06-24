import { Color, FontUnit, Label, Scene, Sound, Vector } from "excalibur";
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
    const music = Resources.tempMainMenuSong;

    if (!music.isPlaying()) {
      music.loop = true;
      music.play(0.65);
    }

    engine.input.keyboard.on("press", (evt) => {
      if (evt.key === "Enter") {
        // engine.goToScene("level1");
        // engine.goToScene("level3");
      }
    });
  }
}
