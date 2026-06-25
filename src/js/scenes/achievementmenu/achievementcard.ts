import { GenericCard } from "../../actors/genericcard";
import {
  Engine,
  vec,
  TextAlign,
  Color,
  FontUnit,
  Label,
  Vector,
  BaseAlign,
} from "excalibur";
import { Resources } from "../../resources.js";
import {
  AchievementManager,
  AchievementNames,
} from "../../lib/achievementmanager.js";

export class AchievementCard extends GenericCard {
  #achievementName: AchievementNames;

  #achievementLevelLabel = new Label({
    pos: vec(-275, -2),
    color: Color.White,
    font: Resources.PixelFont.toFont({
      size: 50,
      unit: FontUnit.Px,
      textAlign: TextAlign.Center,
      baseAlign: BaseAlign.Middle,
    }),
  });

  #achievementNameLabel = new Label({
    pos: vec(0, -15),
    color: Color.White,
    font: Resources.PixelFont.toFont({
      size: 30,
      unit: FontUnit.Px,
      textAlign: TextAlign.Center,
      baseAlign: BaseAlign.Middle,
    }),
  });

  #achievementDescriptionLabel = new Label({
    pos: vec(0, 15),
    color: Color.LightGray,
    font: Resources.PixelFont.toFont({
      size: 25,
      unit: FontUnit.Px,
      textAlign: TextAlign.Center,
      baseAlign: BaseAlign.Middle,
    }),
  });

  constructor(
    pos: Vector,
    width: number,
    height: number,
    achievementName: AchievementNames,
    backgroundColor: string,
  ) {
    super({ pos, width, height, backgroundColor });
    this.#achievementName = achievementName;
  }

  onInitialize(engine: Engine): void {
    this.addChild(this.#achievementLevelLabel);
    this.addChild(this.#achievementNameLabel);
    this.addChild(this.#achievementDescriptionLabel);

    this.#achievementNameLabel.text = this.#achievementName;
    const achievement = AchievementManager.getAchievements();

    if (achievement.achievements !== undefined) {
      this.#achievementDescriptionLabel.text =
        achievement.achievements.find(
          (achievement) => achievement.name === this.#achievementName,
        )?.description ?? "";
    }
  }
}
