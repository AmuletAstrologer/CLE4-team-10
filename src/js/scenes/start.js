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
    this.music = Resources.tempMainMenuSong;

    if (!this.music.isPlaying()) {
      this.music.loop = true;
      this.music.play(0.65);
    }
    const engine = context.engine;

    engine.input.keyboard.on("press", (evt) => {
      if (evt.key === "Enter") {
        // engine.goToScene("level1");
        // engine.goToScene("level3");
      }
    });
  }
  onDeactivate(context) {
    let volume = 0.65;
    this.music.volume = 0.65;

    const interval = setInterval(() => {
      volume -= 0.05;

      if (volume <= 0) {
        volume = 0;
        clearInterval(interval);
        Resources.tempMainMenuSong.stop();
      }

      this.music.volume = volume;
    }, 50);
  }
}
