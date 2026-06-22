import {
  Actor,
  Engine,
  vec,
  Canvas,
  TextAlign,
  Color,
  FontUnit,
  Label,
  PointerEvent,
  BaseAlign,
} from "excalibur";
import { Resources } from "../../resources.js";
import { PlusIcon } from "./plusIcon.js";

type UpgradeTypes =
  | "moreHookSpace"
  | "moreHookGetSpeed"
  | "moreHookThrowSpeed"
  | "";

type UpgradeObject = [
  {
    name: UpgradeTypes;
    value: number;
  },
];

export class RecycleCard extends Actor {
  #width: number;
  #height: number;
  #cornerRadius = 20;
  #borderWidth = 4;

  #backgroundColor = "#305bab99";
  #borderColor = "#C6DCFF60";

  #upgradeType: UpgradeTypes;

  #upgradeLevelLabel = new Label({
    text: "6",
    pos: vec(-275, -2),
    font: Resources.PixelFont.toFont({
      size: 50,
      unit: FontUnit.Px,
      textAlign: TextAlign.Center,
      baseAlign: BaseAlign.Middle,
      color: Color.White,
    }),
  });

  #upgradeNameLabel = new Label({
    text: "Add to card",
    pos: vec(0, -15),
    font: Resources.PixelFont.toFont({
      size: 30,
      unit: FontUnit.Px,
      textAlign: TextAlign.Center,
      baseAlign: BaseAlign.Middle,
      color: Color.White,
    }),
  });

  #upgradeCostLabel = new Label({
    text: "Cost: 1000",
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
    x: number,
    y: number,
    width: number,
    height: number,
    upgradeType: UpgradeTypes,
  ) {
    super({
      pos: vec(x, y),
      width,
      height,
    });
    this.#width = width;
    this.#height = height;

    this.#upgradeType = upgradeType;
  }

  onInitialize(engine: Engine): void {
    const roundedGraphic = new Canvas({
      width: this.#width,
      height: this.#height,
      draw: (ctx: CanvasRenderingContext2D) => {
        const offset = this.#borderWidth / 2;
        const drawWidth = this.#width - this.#borderWidth;
        const drawHeight = this.#height - this.#borderWidth;

        ctx.beginPath();
        ctx.roundRect(
          offset,
          offset,
          drawWidth,
          drawHeight,
          this.#cornerRadius,
        );

        ctx.fillStyle = this.#backgroundColor; // Main background fill
        ctx.fill();

        ctx.lineWidth = this.#borderWidth;
        ctx.strokeStyle = this.#borderColor; // Border Color fill
        ctx.stroke();
      },
    });

    this.graphics.use(roundedGraphic);

    this.addChild(this.#upgradeLevelLabel);
    this.addChild(this.#upgradeNameLabel);
    switch (this.#upgradeType) {
      case "moreHookSpace":
        this.#upgradeNameLabel.text = "more hook space";
        break;
      case "moreHookGetSpeed":
        this.#upgradeNameLabel.text = "More hook get speed";
        break;
      case "moreHookThrowSpeed":
        this.#upgradeNameLabel.text = "More hook throw speed";
        break;
      default:
        this.#upgradeNameLabel.text = "";
    }

    this.addChild(this.#upgradeCostLabel);

    const plus = new PlusIcon({
      position: vec(275, 0),
      size: 40,
      color: Color.White,
    });
    this.addChild(plus);

    plus.on("pointerenter", () => {
      plus.color = Color.Black;
    });

    plus.on("pointerleave", () => {
      plus.color = Color.White;
    });

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

    this.on("pointerenter", (event) => this.onPointerEnter(event));
    this.on("pointerleave", (event) => this.onPointerLeave(event));
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

  onPointerEnter(event: PointerEvent) {
    this.#backgroundColor = "#305babD9";
    this.#borderColor = "#C6DCFFA9";
  }

  onPointerLeave(event: PointerEvent) {
    this.#backgroundColor = "#305bab99";
    this.#borderColor = "#C6DCFF60";
  }

  getValueFromLocalStorage(upgradeType: UpgradeTypes): number {
    const localUpgrades = localStorage.getItem("upgrades");
    let returnValue = 0;

    if (localUpgrades !== null) {
      const localUpgradesJson: UpgradeObject = JSON.parse(localUpgrades);

      for (const localUpgrade of localUpgradesJson) {
        if (localUpgrade.name === upgradeType) {
          returnValue = localUpgrade.value;
        }
      }
    }

    return returnValue;
  }

  pushToLocalStorage(upgradeType: UpgradeTypes, value: number) {
    const localUpgrades = localStorage.getItem("upgrades");
    let newUpgrades: Partial<UpgradeObject> = [];

    if (localUpgrades !== null) {
      const localUpgradesJson: UpgradeObject = JSON.parse(localUpgrades);
      let inLocalUpgrades = false;

      for (const localUpgrade of localUpgradesJson) {
        if (localUpgrade.name === upgradeType) {
          localUpgrade.value = value;
          inLocalUpgrades = true;
        }
        newUpgrades.push({
          name: localUpgrade.name,
          value: localUpgrade.value,
        });
      }

      if (!inLocalUpgrades) {
        newUpgrades.push({
          name: upgradeType,
          value: value,
        });
      }
    } else {
      newUpgrades.push({
        name: upgradeType,
        value: value,
      });
    }

    localStorage.setItem("upgrades", JSON.stringify(newUpgrades));
  }

  getUpgradeCosts(): number {
    return (
      this.getValueFromLocalStorage(this.#upgradeType) *
        this.getValueFromLocalStorage(this.#upgradeType) *
        2 +
      5
    );
  }
}
