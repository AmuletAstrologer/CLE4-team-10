import { Scene, Label, Vector, Random, Buttons } from "excalibur";
import { Bolt } from "../../objects/bolts.js";
import { Spawner } from "./spwaner.js";
import { UI } from "./ui.js";
import { Hook } from "../../actors/hook.ts";
import { Resources } from "../../resources.js";
import { Background } from "../../background/background.js";
import { BaseScene, createGame } from "../../objects/createGame.ts";
import { saveScores } from "../../scores.ts";
import { AchievementManager } from "../../lib/achievementmanager.ts";

//Metal Level

export class Level3 extends BaseScene {
  levelNumber = 3;

  onInitialize(engine) {
    this.engine = engine;
    // this.createLevel();
  }

  onActivate() {
    this.score = 0;
    this.objective = 0;

    // Remove old actors
    this.actors.forEach((actor) => {
      actor.kill();
    });

    this.createLevel();
  }
  createLevel() {
    this.ui = new UI();
    this.spawner = new Spawner();
    const { hook } = createGame(this, this.spawner, this.ui, "Level Three");

    this.hook = hook;
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

    this.removeScore();
  }

  removeScore() {
    this.score--;

    this.ui.updateScore(this.score);
  }
  onPreUpdate(engine) {
    const gamepad = engine.input.gamepads.at(0);
    if (gamepad?.wasButtonPressed(Buttons.Face2)) {
      engine.goToScene("levels");
    }
  }
}
