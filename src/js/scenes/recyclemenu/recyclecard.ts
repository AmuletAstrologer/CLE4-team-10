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
import { PlusIcon } from "./plusIcon.js";
import { UpgradeTypes, ScrapManager } from "../../lib/scrapmanager.js";
import { GenericCard } from "../../actors/genericcard.js";

export class RecycleCard extends GenericCard {
  #upgradeType: UpgradeTypes;

  #upgradeLevelLabel = new Label({
    pos: vec(-275, -2),
    color: Color.White,
    font: Resources.PixelFont.toFont({
      size: 50,
      unit: FontUnit.Px,
      textAlign: TextAlign.Center,
      baseAlign: BaseAlign.Middle,
    }),
  });

  #upgradeNameLabel = new Label({
    pos: vec(0, -15),
    color: Color.White,
    font: Resources.PixelFont.toFont({
      size: 30,
      unit: FontUnit.Px,
      textAlign: TextAlign.Center,
      baseAlign: BaseAlign.Middle,
    }),
  });

  #upgradeCostLabel = new Label({
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
    upgradeType: UpgradeTypes,
  ) {
    super({ pos, width, height });
    this.#upgradeType = upgradeType;
  }

  onInitialize(engine: Engine): void {
    this.addChild(this.#upgradeLevelLabel);
    this.addChild(this.#upgradeNameLabel);
    this.addChild(this.#upgradeCostLabel);

    switch (this.#upgradeType) {
      case "moreHookSpace":
        this.#upgradeNameLabel.text = "Hook capacity";
        break;
      case "moreHookGetSpeed":
        this.#upgradeNameLabel.text = "Hook get speed";
        break;
      case "moreHookThrowSpeed":
        this.#upgradeNameLabel.text = "Hook throw speed";
        break;
      default:
        this.#upgradeNameLabel.text = "";
    }

    const plus = new PlusIcon({
      position: vec(275, 0),
      size: 40,
      color: "#FFFFFF",
    });
    this.addChild(plus);

    plus.on("pointerdown", () => {
      let scrap = ScrapManager.getScrap();

      // TODO: Set this to the ScrapManager Class so this logic isn't here
      if (ScrapManager.getUpgradeCost(this.#upgradeType) <= scrap) {
        scrap -= ScrapManager.getUpgradeCost(this.#upgradeType);

        ScrapManager.setUpgradeLevel(
          this.#upgradeType,
          ScrapManager.getUpgradeLevel(this.#upgradeType) + 1,
        );

        localStorage.setItem("scrap", scrap.toString());
      }
    });
  }

  onPreUpdate(engine: Engine, elapsed: number): void {
    this.#upgradeLevelLabel.text = ScrapManager.getUpgradeLevel(
      this.#upgradeType,
    ).toString();

    this.#upgradeCostLabel.text =
      ScrapManager.getUpgradeCost(this.#upgradeType).toString() + " Scrap";

    this.#upgradeCostLabel.color = Color.LightGray;
    if (
      ScrapManager.getUpgradeCost(this.#upgradeType) > ScrapManager.getScrap()
    ) {
      this.#upgradeCostLabel.color = Color.Red;
    }
  }
}
