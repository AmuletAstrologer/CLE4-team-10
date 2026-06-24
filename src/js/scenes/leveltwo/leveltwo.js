import { Color, FontUnit, Label, Scene, Vector } from "excalibur";
import { Background } from "../../background/background";
import { Resources } from "../../resources";
import { PlanetSpawner } from "./planetspawner";
import { Hook } from "../../actors/hook";
import { Spawner } from "./spawner";
// import { UI } from "./ui";
import { BaseLevelUI } from "../../actors/baselevelui.ts";
import { Backbutton } from "../../backbutton";

export class Level2 extends Scene {
  // score = 0;
  objective = 0;

  onInitialize(engine) {
    this.add(new Background());

    this.createLevel();

    this.spawned = 0;

    this.spawner = new Spawner();
    this.add(this.spawner);

    // this.add(new Backbutton());

    this.ui.updateTarget("trash can't hit the planet!");
  }

  addSpawned() {
    this.spawned++;
  }

  removeSpawned() {
    this.spawned--;
  }

  createLevel() {
    this.add(new PlanetSpawner());
    this.add(new Hook());
    this.ui = new BaseLevelUI({ level: 2 });
    this.add(this.ui);
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
  }

  removeObjective() {
    this.objective--;

    this.ui.updateObjective(this.objective);
  }
}
