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

  #achievementCostLabel = new Label({
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
  ) {
    super({ pos, width, height });
    this.#achievementName = achievementName;
  }

  onInitialize(engine: Engine): void {
    this.addChild(this.#achievementLevelLabel);
    this.addChild(this.#achievementNameLabel);
    this.addChild(this.#achievementCostLabel);

    switch (this.#achievementName) {
      case "Perfect Hooking":
        this.#achievementNameLabel.text = "Perfect Hooking";
        break;
      case "Scrap Collector":
        this.#achievementNameLabel.text = "Scrap Collector";
        break;
      case "High Score":
        this.#achievementNameLabel.text = "High score!";
        break;
      default:
        this.#achievementNameLabel.text = "";
    }
  }
}
