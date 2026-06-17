import { Scene, Label, Actor, Vector, Random } from "excalibur";
import { Trash } from "../../objects/trash.js";
import { Bolt } from "../../objects/bolts.js";
import { Spawner } from "./spawner.js";
import { UI } from "./ui.js";
import { Hook } from "../../actors/hook.ts";
import { Resources, ResourceLoader } from "../../resources.js";
import { Background } from "../../background/background.js"

export class Level1 extends Scene {
    score = 0;
    objective = 0;
    onDeactivate(context = SceneActivationContext) {
    this.clear();
    
  }

    onInitialize(engine) {
        const background = new Background();
        this.add(background);

        this.engine = engine
        const title = new Label({
            text: "Level One",
            pos: new Vector(50, 20),
            fontSize: 40,
        });

        this.ui = new UI();
        this.add(this.ui);

        this.spawner = new Spawner();
        this.add(this.spawner);

        this.hook = new Hook();
        this.add(this.hook);

        this.add(title);
    }
    addScore() {
        this.score++;
        this.ui.updateScore(this.score);
    }
    addObjective() {
        this.objective++;
        this.ui.updateObjective(this.objective);
        if (this.objective >= 2) {
            this.engine.goToScene("level1Ending", {
                sceneActivationData: {
                    score: this.score
                }
            })
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
            bolt.pos = new Vector(x, y)
            this.add(bolt);

        }
        this.removeScore()

    }
    removeScore() {
        this.score--;
        this.ui.updateScore(this.score)
    }

}
