import { Color, FontUnit, Label, Scene, Vector } from "excalibur";
import { Background } from "../../background/background";
import { Resources } from "../../resources";
import { PlanetSpawner } from "./planetspawner";
import { Hook } from "../../actors/hook";
import { Spawner } from "./spawner";
import { UI } from "./ui";
import { Backbutton } from "../../backbutton";
import { BaseScene, createGame } from "../../objects/createGame.ts";
import { InGameHandleiding } from "../../actors/ingamehandleiding.js";
import { LevelText } from "../../actors/leveltext.js";

export class Level2 extends BaseScene {
  // score = 0;
  objective = 0;
  isPaused = false;

  onInitialize(engine) {
    this.add(new Background());

    this.createLevel();

    this.spawned = 0;

    this.spawner = new Spawner();
    this.add(this.spawner);

    this.add(new Backbutton());

    this.introTimer = 0;
  }

  addSpawned() {
    this.spawned++;
  }

  removeSpawned() {
    this.spawned--;
  }

  onPreUpdate(engine, delta) {
    this.introTimer += delta;

    if (this.introTimer < 1000) {
      // Fade in
      const alpha = this.introTimer / 1000;

      if (this.title) {
        this.title.opacity = alpha;
      }

      if (this.intro) {
        this.intro.opacity = alpha;
      }
    } else if (this.introTimer < 3000) {
      // Stay visible
      if (this.title) {
        this.title.opacity = 1;
      }

      if (this.intro) {
        this.intro.opacity = 1;
      }
    } else if (this.introTimer < 4000) {
      // Fade out
      const alpha = 1 - (this.introTimer - 3000) / 1000;

      if (this.title) {
        this.title.opacity = alpha;
      }

      if (this.intro) {
        this.intro.opacity = alpha;
      }
    } else {
      // Remove intro labels
      if (this.title) {
        this.title.kill();
        this.title = null;
      }

      if (this.intro) {
        this.intro.kill();
        this.intro = null;
      }
    }
  }

  createLevel() {
    this.add(new PlanetSpawner());
    this.add(new Hook());
    this.ui = new UI();
    this.add(this.ui);

    this.handleiding = new InGameHandleiding();
    this.add(this.handleiding);

    this.handleiding.updateObjective(LevelText.level2.objective);

    this.title = new Label({
      text: "Level Two",
      pos: new Vector(640, 280),
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 60,
        color: Color.White,
      }),
    });

    this.title.anchor = new Vector(0.5, 0.5);
    this.title.opacity = 0;

    this.intro = new Label({
      text: "collect trash while preventing collisions with the planet",
      pos: new Vector(640, 360),
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 30,
        color: Color.White,
      }),
    });

    this.intro.anchor = new Vector(0.5, 0.5);
    this.intro.opacity = 0;

    this.add(this.title);
    this.add(this.intro);
  }

  // addScore() {
  //     this.score++;

  //     this.ui.updateScore(
  //         this.score
  //     );

  // }

  addObjective() {
    this.objective++;

    this.ui.updateObjective(this.objective);

    if (this.objective >= 10) {
      this.engine.goToScene("level3Ending", {
        sceneActivationData: {
          score: this.score,
        },
      });
    }
  }

  removeObjective() {
    this.objective--;

    this.ui.updateObjective(this.objective);
  }
}
