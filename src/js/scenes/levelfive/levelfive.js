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
import { PlanetSpawner } from "../leveltwo/planetspawner.js";
import { LevelFiveTrash } from "./levelfivethrash.js";

export class Level5 extends BaseScene {
  levelNumber = 5;

  //Game Timer
  gameTime = 120000; // 2 minutes
  timeLeft = 120000;

  //Trash Timer
  targetTimer = 0;
  targetChangeTime = 30000; //30 seconden

  metalTrash = [
    "Airtank",
    "Cilinder",
    "Plaat",
    "Satelliet",
    "Piece",
    "Fragment",
    "Helm",
    "Module",
  ];

  currentTarget = "";

  onInitialize(engine) {
    this.engine = engine;
  }

  onActivate(engine) {
    this.objective = 0;
    this.introTimer = 0;

    this.timeLeft = this.gameTime;

    // Remove old actors
    this.actors.forEach((actor) => {
      actor.kill();
    });

    this.createLevel(engine);

    this.targetTimer = 0;
    this.pickNewTarget();
  }

  onPreUpdate(engine, delta) {
    this.ui.z = 100;
    // Intro animation
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

    // Target switching
    this.targetTimer += delta;

    if (this.targetTimer >= this.targetChangeTime) {
      this.targetTimer = 0;

      this.pickNewTarget();
    }

    this.timeLeft -= delta;

    if (this.ui) {
      this.ui.updateTimer(this.timeLeft);
    }

    if (this.timeLeft <= 0) {
      this.timeLeft = 0;

      if (this.objective >= 10) {
        this.levelEnding();
      } else {
        this.defeat();
      }

      return;
    }

    const gamepad = engine.input.gamepads.at(0);
    if (gamepad?.wasButtonPressed(Buttons.Face2)) {
      engine.goToScene("levels");
    }
  }

  createLevel() {
    const background = new Background();
    this.add(background);

    // Level intro
    this.title = new Label({
      text: "Level Five",
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
      text: "Combination Level",
      pos: new Vector(640, 360),
      font: Resources.PixelFont.toFont({
        unit: FontUnit.Px,
        size: 40,
        color: Color.White,
      }),
    });

    this.intro.anchor = new Vector(0.5, 0.5);
    this.intro.opacity = 0;

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

    this.ui = new UI();
    this.ui.z = this.add(this.ui);

    this.add(new PlanetSpawner());

    this.spawner = new Spawner();
    this.add(this.spawner);

    this.hook = new Hook();
    this.add(this.hook);

    this.add(this.title);
    this.add(this.intro);
  }

  //CHECK
  pickNewTarget() {
    const index = Math.floor(Math.random() * this.metalTrash.length);

    this.currentTarget = this.metalTrash[index];

    //Add higher chance of current

    if (this.ui) {
      this.ui.updateTarget(this.currentTarget);
    }

    for (const actor of this.actors) {
      if (actor instanceof LevelFiveTrash) {
        actor.setTargetTint(actor.type === this.currentTarget);
      }
    }

    console.log("Target:", this.currentTarget);
  }

  addScore() {
    const trash = this.hook.children[0];

    if (!trash) {
      console.log("No trash caught");
      return;
    }

    ///Check
    //Only plus points for correct trash
    if (trash.type === this.currentTarget) {
      console.log("Correct trash");
    } else {
      console.log("Wrong trash:", trash.type, "Needed:", this.currentTarget);
      this.objective--;
      this.ui.health.decrease();
    }

    this.ui.updateObjective(this.objective);
  }

  addObjective() {
    this.objective++;

    this.ui.updateObjective(this.objective);

    if (this.objective >= 10) {
      this.levelEnding();
    }
  }

  removeObjective() {
    this.objective--;

    if (this.objective < 0) {
      this.objective = 0;
    }

    this.ui.updateObjective(this.objective);
  }

  onCollision(x, y) {
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
  }
}
