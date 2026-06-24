import { Scene, Label, Actor, Buttons, Vector, Random, Keys } from "excalibur";
import { Trash } from "../../objects/trash.js";
import { Bolt } from "../../objects/bolts.js";
import { Spawner } from "./spawner.js";
import { BaseLevelUI } from "../../actors/baselevelui.ts";
import { Hook } from "../../actors/hook.ts";
import { Resources, ResourceLoader } from "../../resources.js";
import { Background } from "../../background/background.js";
import { saveScores } from "../../scores.ts";
import { BaseScene, createGame } from "../../objects/createGame.ts";

export class Level1 extends BaseScene {
  levelNumber = 1;
  objective = 0;

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
    this.ui = new BaseLevelUI({ level: 1 });
    this.ui.updateTarget("Grab the trash!");

    this.spawner = new Spawner();
    const { hook } = createGame(this, this.spawner, this.ui, "Level One");
    console.log(this.spawner);

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
    this.addScore();
  }

  addScore() {
    const trash = this.hook.children[0];

    if (!trash) {
      console.log("No trash caught");
      return;
    }

    this.ui.updateObjective(this.objective);
  }

  onPreUpdate(engine) {
    const gamepad = engine.input.gamepads.at(0);
    if (
      gamepad?.wasButtonPressed(Buttons.Face2) ||
      engine.input.keyboard.wasPressed(Keys.X)
    ) {
      engine.goToScene("levels");
    }
  }
}
