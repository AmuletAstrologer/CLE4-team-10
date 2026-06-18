export type UpgradeTypes =
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

export class ScrapManager {
  public static getScrap(): number {
    const scrap = localStorage.getItem("scrap");

    if (scrap !== null) {
      return Number(scrap);
    } else {
      return 0;
    }
  }

  public static addScrap(): void {
    const scrap = localStorage.getItem("scrap");

    if (scrap !== null) {
      localStorage.setItem("scrap", (Number(scrap) + 1).toString());
    } else {
      localStorage.setItem("scrap", "1");
    }
  }

  public static getValueFromLocalStorage(upgradeType: UpgradeTypes): number {
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

  public static pushUpgradeToLocalStorage(
    upgradeType: UpgradeTypes,
    value: number,
  ) {
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

  public static getUpgradeCosts(upgradeType: UpgradeTypes): number {
    const upgradeLevelCost =
      ScrapManager.getValueFromLocalStorage(upgradeType) + 1;

    switch (upgradeType) {
      case "moreHookSpace":
        return upgradeLevelCost * upgradeLevelCost * 2 + 25;
      default:
        return upgradeLevelCost * upgradeLevelCost * 2 + 5;
    }
  }
}
