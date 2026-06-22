import { Scene, Label, Vector, Random, Font, FontUnit, Color } from "excalibur";
import { Bolt } from "../../objects/bolts.js";
import { Spawner } from "./spwaner.js";
import { UI } from "./ui.js";
import { Hook } from "../../actors/hook.ts";
import { Resources } from "../../resources.js";
import { Background } from "../../background/background.js";
import { BaseScene, createGame } from "../../objects/createGame.ts";
import { saveScores } from "../../scores.ts";
import { checkAchievements } from "../../achievements.ts";

//Metal Level

export class Level3 extends BaseScene {
  levelNumber = 3;

  score = 0;
  objective = 0;

  //Game Timer
  gameTime = 120000; // 2 minutes
  timeLeft = 120000;

  //Trash Timer
  targetTimer = 0;
  targetChangeTime = 30000; //30 seconden

  metalTrash = ["Airtank", "Cilinder", "Plaat", "Satelliet"];

  currentTarget = "";

  onInitialize(engine) {
    this.engine = engine;
    this.createLevel();
  }

  onActivate() {
    this.score = 0;
    this.objective = 0;
    this.introTimer = 0;

    this.timeLeft = this.gameTime;

    // Remove old actors
    this.actors.forEach((actor) => {
      actor.kill();
    });

    this.createLevel();
  }

  createLevel() {
    const background = new Background();
    this.add(background);

    const title = new Label({
      text: "Level Three",
      pos: new Vector(50, 20),
      fontSize: 40,
    });

    this.add(title);

    this.ui = new UI();
    this.add(this.ui);
    this.spawner = new Spawner();
    this.add(this.spawner);

     const { hook } = createGame(
            this,
            this.spawner,
            this.ui,
            "Level Three"
        );

        this.hook = hook;
  }

  addScore() {
    this.score++;

    this.ui.updateScore(this.score);
  }

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

    if (this.objective === 1) {
      this.engine.goToScene("defeatscreen", {
        sceneActivationData: {
          score: this.score,
          restartScene: "level3",
        },
      });
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
    for (const dir of directions) {

        const bolt = new Bolt();
        const index =
            rand.integer(
                0,
                sprites.length - 1
            );

      bolt.graphics.use(sprites[index]);

        bolt.graphics.use(
            sprites[index]
        );

      bolt.vel = dir.scale(speed);
      bolt.pos = new Vector(x, y);
      this.add(bolt);
    }

        bolt.vel =
            dir.scale(speed);
        bolt.pos =
            new Vector(x, y);
        this.add(bolt);

    }

    this.removeScore();
  }

  removeScore() {
    this.score--;

    this.ui.updateScore(this.score);
  }
}
