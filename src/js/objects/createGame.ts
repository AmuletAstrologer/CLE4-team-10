import { Scene, Label, Actor, Vector, Random, Font } from "excalibur";
import { Hook } from "../actors/hook";
import { Background } from "../background/background";
import { Spawner } from "../scenes/levelone/spawner";
import { UI } from "../scenes/levelone/ui";
import { Resources, ResourceLoader } from "../resources";
import { LevelScores, saveScores, getScores } from "../scores";
import { AchievementManager } from "../lib/achievementmanager";

export abstract class BaseScene extends Scene {
  score = 0;
  objective = 0;
  abstract levelNumber: number;

  ui!: UI;
  hook!: Hook;
  spawner!: Spawner;

  addScore() {
    this.score++;
    this.ui.updateScore(this.score);
  }

  addObjective() {
    this.objective++;
    this.ui.updateObjective(this.objective);
    console.log(this.levelNumber);
    if (this.objective >= 1) {
      getScores();
      AchievementManager.checkAchievements();
      this.engine.goToScene("levelEnding", {
        sceneActivationData: {
          levelNumber: this.levelNumber,
          score: this.score,
        },
      });
    }
  }
}
export abstract class BaseUi extends Actor {}

export function createGame(
  scene: BaseScene,
  spawner: Spawner,
  ui: UI,
  levelTitle: string,
) {
  const background = new Background();
  scene.add(background);

  const title = new Label({
    text: levelTitle,
    pos: new Vector(50, 20),
    font: Resources.PixelFont.toFont({
      size: 40,
    }),
  });

  scene.add(title);

  scene.add(ui);
  scene.add(spawner);
  const hook = new Hook();
  scene.add(hook);

  return { hook };
}
