export const upgradeTypes = [
  "moreHookSpace",
  "moreHookGetSpeed",
  "moreHookThrowSpeed",
  "",
] as const;
export type UpgradeTypes = (typeof upgradeTypes)[number];

type UpgradeObject = [
  {
    name: UpgradeTypes;
    value: number;
  },
];

export class ScrapManager {
  public static getScrap(): number {
    const scrap = localStorage.getItem("scrap");

    if (scrap !== null) {
      return Number(scrap);
    } else {
      return 0;
    }
  }

  public static removeScrap(amount: number): boolean {
    let scrap = ScrapManager.getScrap();

    if (amount <= scrap) {
      scrap -= amount;
      localStorage.setItem("scrap", scrap.toString());
      return true;
    }
    return false;
  }

  public static addScrap(amount = 1): void {
    const scrap = localStorage.getItem("scrap");

    if (scrap !== null) {
      localStorage.setItem("scrap", (Number(scrap) + amount).toString());
    } else {
      localStorage.setItem("scrap", `${amount}`);
    }
  }

  public static getUpgradeLevel(upgradeType: UpgradeTypes): number {
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

  public static setUpgradeLevel(upgradeType: UpgradeTypes, value: number) {
    const localUpgrades = localStorage.getItem("upgrades");
    let newUpgrades: Partial<UpgradeObject> = [];
    let inLocalUpgrades = false;

    if (localUpgrades !== null) {
      const localUpgradesJson: UpgradeObject = JSON.parse(localUpgrades);

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
    }

    if (localUpgrades === null || !inLocalUpgrades) {
      newUpgrades.push({
        name: upgradeType,
        value: value,
      });
    }

    localStorage.setItem("upgrades", JSON.stringify(newUpgrades));
  }

  public static getUpgradeCost(upgradeType: UpgradeTypes): number {
    const upgradeLevel = ScrapManager.getUpgradeLevel(upgradeType);
    let upgradeMultiplier: number;
    let upgradeStartValue: number;

    switch (upgradeType) {
      case "moreHookSpace":
        upgradeMultiplier = 25;
        upgradeStartValue = 25;
        break;
      default:
        upgradeMultiplier = 5;
        upgradeStartValue = 5;
    }

    return upgradeLevel * upgradeLevel * upgradeMultiplier + upgradeStartValue;
  }

  public static doUpgrade(upgradeType: UpgradeTypes): boolean {
    if (!ScrapManager.removeScrap(ScrapManager.getUpgradeCost(upgradeType))) {
      return false;
    }

    ScrapManager.setUpgradeLevel(
      upgradeType,
      ScrapManager.getUpgradeLevel(upgradeType) + 1,
    );
    return true;
  }
}
