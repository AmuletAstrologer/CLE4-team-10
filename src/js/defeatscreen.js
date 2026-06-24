import {
  Scene,
  Actor,
  Label,
  Vector,
  Font,
  FontUnit,
  Color,
  Keys,
  Buttons
} from "excalibur";
import { Resources } from "./resources.js";

export class DefeatScreen extends Scene {
  // levelToRestart = null;

  constructor() {
    super();
    // this.levelToRestart = null;
  }

  onActivate(context) {
    if (context.data) {
      this.levelToRestart = context.data.restartScene;

      // console.log("Restart scene:", this.levelToRestart);
    }
  }

  onInitialize(engine) {
    console.log("Restart scene:", this.levelToRestart);
    const bg = new Actor({
      pos: new Vector(0, 0),
      anchor: new Vector(0, 0),
    });

    bg.graphics.use(Resources.Background.toSprite());
    this.add(bg);

    // Checks if player already saw defeat scene
    this.firstDefeat = localStorage.getItem("defeatSeen") === null;

    this.scrollSpeed = 80;
    this.crawlFinished = false;
    this.time = 0;
    this.crawlLines = [];
    this.titleTimer = 0;
    this.titleFadeStarted = false;

    this.title = new Label({
      text: "YOU GOT DEFEATED...",
      pos: new Vector(640, 100),
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 52,
        color: Color.White,
      }),
    });

    this.title.anchor = new Vector(0.5, 0);
    this.add(this.title);

    // Crawl text
    const lines = [
      "IN A GALAXY FAR... FAR... RIGHT HERE",
      "",
      "A TERRIBLE DEFEAT HAS OCCURRED.",
      "",
      "THE MISSION HAS FAILED.",
      "",
      "THE SHIP IS BROKEN.",
      "THE CREW IS PANICKING.",
      "THE ENGINEER CLAIMS THIS IS",
      "SOMEONE ELSE'S FAULT.",
      "",
      "SEVERAL IMPORTANT BUTTONS",
      "WERE PRESSED.",
      "",
      "THE WRONG ONES.",
      "",
      "THE ENEMY IS CELEBRATING.",
      "SPACE IS DOOMED.",
      "HUMANITY IS PROBABLY DOOMED.",
      "",
      "HOWEVER...",
      "",
      "THE COMMANDER MAY ATTEMPT",
      "THIS MISSION ONCE MORE.",
      "",
      "AFTER ALL,",
      "WHAT COULD POSSIBLY GO WRONG",
      "A SECOND TIME?",
    ];

    //After first defeat
    if (this.firstDefeat) {
      const startY = 900;
      const spacing = 50;

      for (let i = 0; i < lines.length; i++) {
        const label = new Label({
          text: lines[i],

          pos: new Vector(engine.drawWidth / 2, startY + i * spacing),

          font: Resources.PixelFont.toFont({
            unit: FontUnit.Px,
            size: 46,
            color: Color.White,
          }),
        });

        label.anchor = new Vector(0.5, 0);

        this.add(label);

        this.crawlLines.push(label);
      }
    } else {
      // Skip story instantly
      this.crawlFinished = true;
    }

    // Restart text

    this.restart = new Label({
      text: "PRESS ENTER TO TRY AGAIN",

      pos: new Vector(engine.drawWidth / 2, 620),

      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 32,
        color: Color.White,
      }),
    });

    this.restart.anchor = new Vector(0.5, 0.5);

    if (this.firstDefeat) {
      this.restart.opacity = 0;
    } else {
      this.restart.opacity = 1;
    }

    this.add(this.restart);

    this.returnMenu = new Label({
      text: "PRESS X TO RETURN",

      pos: new Vector(engine.drawWidth / 2, 660),

      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 28,
        color: Color.White,
      }),
    });

    this.returnMenu.anchor = new Vector(0.5, 0.5);
    this.returnMenu.opacity = 0;

    this.add(this.returnMenu);

    console.log("I AM DEFEAT!!!");
  }

  onPreUpdate(engine, delta) {
    this.time += delta;

    // First time crawl

    if (this.firstDefeat && !this.crawlFinished) {
      let visibleLines = 0;

      for (const line of this.crawlLines) {
        // Move upward

        line.pos.y -= this.scrollSpeed * (delta / 1000);

        const horizonY = 120;

        const scale = Math.max(0.15, (line.pos.y - horizonY) / 900);

        line.scale = new Vector(scale, scale);

        // Tilt

        line.rotation = -0.05;

        // Fade into distance

        line.opacity = Math.max(0, Math.min(1, (line.pos.y - horizonY) / 250));

        if (line.pos.y > -100) {
          visibleLines++;
        }
      }

      // Remove crawl when finished

      if (visibleLines === 0) {
        this.crawlFinished = true;

        localStorage.setItem("defeatSeen", "true");

        for (const line of this.crawlLines) {
          line.kill();
        }
      }
    }

    // Fade title while crawl is happening

    if (this.firstDefeat && !this.crawlFinished) {
      this.titleTimer += delta;

      // Start title fading after 30 second
      if (this.titleTimer > 30000) {
        this.titleFadeStarted = true;
      }

      if (this.titleFadeStarted && this.title.opacity > 0) {
        this.title.opacity -= delta / 1000;
      }
    }

    //Make comments clearer
    // Restart fade in blinking

    if (this.crawlFinished && this.restart.opacity < 1) {
      this.restart.opacity += 0.5 * (delta / 1000);

      this.returnMenu.opacity = this.restart.opacity;
    }

    // Restart text fade speed

    if (this.restart.opacity >= 1) {
      //Add const instead of magic numbers
      this.restart.opacity = 0.75 + Math.sin(this.time / 250) * 0.25;
    }

    //localStorage.removeItem("defeatSeen")

    // Restart

    if (engine.input.keyboard.wasPressed(Keys.Enter)) {
      console.log("Restarting level:", this.levelToRestart);
      engine.goToScene(this.levelToRestart);
    }

    const gamepad = engine.input.gamepads.at(0);

    if (
      gamepad?.wasButtonPressed(Buttons.Face2) ||
      engine.input.keyboard.wasPressed(Keys.X)
    ) {
      engine.goToScene("start");
    }
  }
}
