import {
  Scene,
  Label,
  Vector,
  Random,
  Font,
  FontUnit,
  Color,
  Buttons,
} from "excalibur";
import { Bolt } from "../../objects/bolts.js";
import { Spawner } from "./spwaner.js";
import { Hook } from "../../actors/hook.ts";
import { Resources } from "../../resources.js";
import { Background } from "../../background/background.js";
import { BaseScene } from "../../objects/createGame.ts";
import { Trash } from "../../objects/trash.js";
import { saveScores } from "../../scores.ts";
import { BaseLevelUI } from "../../actors/baselevelui.ts";
import { LevelStart } from "../../actors/levelStart.ts";

export class Level4 extends BaseScene {
  levelNumber = 4;

  //Game Timer
  gameTime = 180000; // 3 minutes
  timeLeft = 120000;

  //Trash Timer
  targetTimer = 0;
  targetChangeTime = 30000; //30 seconden

  metalTrash = ["Airtank", "Cilinder", "Plaat", "Satelliet", "Piece"];

  currentTarget = "";

  onInitialize(engine) {
    this.engine = engine;
  }

  onActivate() {
    // this.score = 0;
    this.objective = 0;
    // this.introTimer = 0;

    this.timeLeft = this.gameTime;

    // Remove old actors
    this.actors.forEach((actor) => {
      actor.kill();
    });

    this.createLevel();

    this.targetTimer = 0;
    this.pickNewTarget();
  }

  onPreUpdate(engine, delta) {
    const gamepad = engine.input.gamepads.at(0);
    if (gamepad?.wasButtonPressed(Buttons.Face2)) {
      engine.goToScene("levels");
    }

    this.ui.z = 100;

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
  }

  createLevel() {
    const background = new Background();
    this.add(background);

    this.ui = new BaseLevelUI({ level: 4 });
    this.ui.z = this.add(this.ui);

    this.spawner = new Spawner();
    this.add(this.spawner);

    this.hook = new Hook();
    this.add(this.hook);

    this.levelStart = new LevelStart({
      levelNumber: "Level 4",
      levelName: "Metal Level",
    });
    this.add(this.levelStart);
  }

  pickNewTarget() {
    const index = Math.floor(Math.random() * this.metalTrash.length);

    this.currentTarget = this.metalTrash[index];

    if (this.ui) {
      this.ui.updateTarget(this.currentTarget);
    }

    for (const actor of this.actors) {
      if (actor instanceof Trash) {
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

    //Only plus points for correct trash
    if (trash.type === this.currentTarget) {
      console.log("Correct trash");
    } else {
      console.log("Wrong trash:", trash.type, "Needed:", this.currentTarget);
      this.objective--;
      this.ui.healthBar.decrease();
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
