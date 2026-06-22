import { Scene, Label, Vector, Random, Font, FontUnit, Color } from "excalibur";
import { Bolt } from "../../objects/bolts.js";
import { Spawner } from "./spwaner.js";
import { UI } from "./ui.js";
import { Hook } from "../../actors/hook.ts";
import { Resources } from "../../resources.js";
import { Background } from "../../background/background.js";

//Metal Level

export class Level3 extends Scene {
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

    this.targetTimer = 0;
    this.pickNewTarget();
  }

  onPreUpdate(engine, delta) {
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

      this.engine.goToScene("level3Ending", {
        sceneActivationData: {
          score: this.score,
        },
      });
    }
  }

  createLevel() {
    const background = new Background();
    this.add(background);

    // Level intro
    this.title = new Label({
      text: "Level Three",
      pos: new Vector(640, 280),
      font: new Font({
        size: 60,
        unit: FontUnit.Px,
        color: Color.White,
      }),
    });

    this.title.anchor = new Vector(0.5, 0.5);
    this.title.opacity = 0;

    this.intro = new Label({
      text: "Metal Level",
      pos: new Vector(640, 360),
      font: new Font({
        size: 40,
        unit: FontUnit.Px,
        color: Color.White,
      }),
    });

    this.intro.anchor = new Vector(0.5, 0.5);
    this.intro.opacity = 0;

    this.ui = new UI();
    this.ui.z = 100;
    this.add(this.ui);

    this.spawner = new Spawner();
    this.add(this.spawner);

    this.hook = new Hook();
    this.add(this.hook);

    this.add(this.title);
    this.add(this.intro);
  }

  pickNewTarget() {
    const index = Math.floor(Math.random() * this.metalTrash.length);

    this.currentTarget = this.metalTrash[index];

    //Immeadantly remove old targets' tint color
    if (this.ui) {
      this.ui.updateTarget(this.currentTarget);
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

      this.score++;
    } else {
      console.log("Wrong trash:", trash.type, "Needed:", this.currentTarget);

      this.score--;
      this.objective--;
    }

    this.ui.updateScore(this.score);
    this.ui.updateObjective(this.objective);
  }

  addObjective() {
    this.objective++;

    this.ui.updateObjective(this.objective);

    //Add minus score for collecting wrong thrash
    if (this.objective >= 10) {
      this.engine.goToScene("level3Ending", {
        sceneActivationData: {
          score: this.score,
        },
      });
    }

    // Add proper condition for losing later
    // if (this.objective === 1) {
    //   this.engine.goToScene("defeatscreen", {
    //     sceneActivationData: {
    //       score: this.score,
    //       restartScene: "level3",
    //     },
    //   });
    // }
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
}
