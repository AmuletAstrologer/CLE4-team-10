import {
  Scene,
  Label,
  Vector,
  Random,
  Font,
  FontUnit,
  Color,
  Buttons,
  Engine,
} from "excalibur";
import { Bolt } from "../../objects/bolts.js";
import { Spawner } from "./spawner.js";
import { UI } from "./ui.js";
import { Hook } from "../../actors/hook.ts";
import { Resources } from "../../resources.js";
import { Background } from "../../background/background.js";
import { DefeatScreen } from "../../defeatscreen.js";
import { Trash } from "../../objects/trash.js";
import { BaseScene, createGame } from "../../objects/createGame.ts";
import { saveScores } from "../../scores.ts";
import { AchievementManager } from "../../lib/achievementmanager.ts";
import { LevelEnding } from "../levelEnding.js";
import { LevelStart } from "../../actors/levelStart.ts";
import { InGameHandleiding } from "../../actors/ingamehandleiding.js";

//Metal Level
export class Level6 extends BaseScene {
  levelNumber = 6;

  score = 0;
  timeSurvived = 0;

  isPaused = false;

  onActivate() {
    this.score = 0;
    this.timeSurvived = 0;

    this.actors.forEach((actor) => {
      actor.kill();
    });

    this.createLevel();

    if (this.ui) {
      this.ui.updateScore(0);
    }
  }

  onPreUpdate(engine, delta) {
    this.ui.z = 100;

    if (this.isPaused) {
      return;
    }

    this.timeSurvived += delta;

    if (this.ui) {
      this.ui.updateTimer(this.timeSurvived);
    }

    const gamepad = engine.input.gamepads.at(0);

    if (gamepad?.wasButtonPressed(Buttons.Face2)) {
      this.engine.goToScene("levels");
    }
  }

  createLevel() {
    const background = new Background();
    this.add(background);

    this.ui = new UI();
    this.add(this.ui);

    this.handleiding = new InGameHandleiding();
    this.add(this.handleiding);

    this.spawner = new Spawner();
    this.add(this.spawner);

    this.hook = new Hook();
    this.add(this.hook);

    this.levelStart = new LevelStart({
      levelNumber: "Level 6",
      levelName: "Endless Level",
    });
    this.add(this.levelStart);

    const backbutton = new Label({
      text: "⇜",
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 60,
        color: Color.White,
      }),
    });

    backbutton.anchor = new Vector(0.5, 0.5);
    backbutton.pos = new Vector(40, 40);

    this.add(backbutton);

    backbutton.on("pointerenter", () => {
      backbutton.font.color = Color.Orange;
    });

    backbutton.on("pointerleave", () => {
      backbutton.font.color = Color.White;
    });

    backbutton.on("pointerup", () => {
      this.engine.goToScene("levels");
    });
  }

  addScore() {
    const trash = this.hook.children[0];

    if (!trash) {
      console.log("No trash caught");
      return;
    }

    this.score++;

    if (this.ui) {
      this.ui.updateScore(this.score);
    } else {
      this.score--;
      this.loseHealth();
      this.removeScore();
    }
  }

  loseHealth() {
    if (this.ui?.health) {
      this.ui.health.decrease();
    }

    if (this.scene?.isPaused) {
      return;
    }
  }

  removeScore() {
    this.score--;

    if (this.score < 0) {
      this.score = 0;
    }

    if (this.ui) {
      this.ui.updateScore(this.score);
      this.ui.health.decrease();
    }
  }

  onCollision(x, y, other) {
    const rand = new Random(1244);
    const speed = 200;

    const sprites = [
      Resources.AfvalSchroef1.toSprite(),
      Resources.AfvalSchroef2.toSprite(),
      Resources.AfvalSchroef3.toSprite(),
      Resources.AfvalSchroef4.toSprite(),
    ];

    const directions = [
      new Vector(1, 0),
      new Vector(-1, 0),
      new Vector(0, 1),
      new Vector(0, -1),
    ];

    for (const dir of directions) {
      const bolt = new Bolt();
      const index = rand.integer(0, sprites.length - 1);

      bolt.graphics.use(sprites[index]);

      bolt.vel = dir.scale(speed);
      bolt.pos = new Vector(x, y);
      this.add(bolt);
    }

    if (!(other instanceof Bolt)) {
      this.score--;
      this.loseHealth();
      this.removeScore();
    }
  }
}
