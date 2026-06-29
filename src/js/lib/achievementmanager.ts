import { getScores, LevelScores } from "../scores";
import { ScrapManager, upgradeTypes } from "./scrapmanager";
import { AchievementPopup } from "../actors/achievementPopup";
import { Engine } from "excalibur";

export type AchievementNames =
  | "Perfect Hooking"
  | "Scrap Collector"
  | "High Score"
  | "Recycle Master";

type Achievement = {
  name: AchievementNames;
  description: string;
  unlocked: boolean;
};

type Achievements = {
  achievements: Achievement[];
};

export class AchievementManager {
  public static getAchievements(): Partial<Achievements> {
    const achievements = localStorage.getItem("achievements");

    if (!achievements) {
      return {
        achievements: [
          {
            name: "Perfect Hooking",
            description: "Finish the tutorial!",
            unlocked: false,
          },
          {
            name: "Scrap Collector",
            description: "Collect 25 scrap",
            unlocked: false,
          },
          {
            name: "High Score",
            description: "Get a score of 15 in endless",
            unlocked: false,
          },
          {
            name: "Recycle Master",
            description: "Get a total of 15 upgrades",
            unlocked: false,
          },
        ],
      };
    }
    return JSON.parse(achievements);
  }

  public static checkAchievements(): number[] {
    const unlocked: number[] = [];
    const achievements = AchievementManager.getAchievements();
    if (this.checkAchievement1(achievements)) unlocked.push(1);
    if (this.checkAchievement2(achievements)) unlocked.push(2);
    // if (this.checkAchievement3(score)) unlocked.push(3);
    if (this.checkAchievement4(achievements)) unlocked.push(4);
    localStorage.setItem("achievements", JSON.stringify(achievements));
    return unlocked;
  }

  static checkAchievement1(achievements: Partial<Achievements>): boolean {
    const levelCompletion = this.getLevelCompletion();
    const levelOne = levelCompletion.levels?.find(
      (level: any) => level.number === 1,
    );
    if (levelOne?.completed) {
      const perfectHooking = achievements.achievements?.find(
        (achievement) => achievement.name === "Perfect Hooking",
      );

      if (perfectHooking) {
        if (perfectHooking.unlocked !== true) {
          perfectHooking.unlocked = true;
          return true;
        }
      }
    }
    return false;
  }
  static checkAchievement2(achievements: Partial<Achievements>): boolean {
    const scrap = ScrapManager.getScrap();
    if (scrap > 24) {
      const scrapCollector = achievements.achievements?.find(
        (achievement) => achievement.name === "Scrap Collector",
      );

      if (scrapCollector) {
        if (!scrapCollector.unlocked) {
          scrapCollector.unlocked = true;
          return true;
        }
      }
    }
    return false;
  }
  static checkAchievement3(
    achievements: Partial<Achievements>,
    score: number,
  ): boolean {
    if (score > 14) {
      const highscore = achievements.achievements?.find(
        (achievement) => achievement.name === "High Score",
      );

      if (highscore) {
        if (!highscore.unlocked) {
          highscore.unlocked = true;
          return true;
        }
      }
    }
    return false;
  }
  static checkAchievement4(achievements: Partial<Achievements>): boolean {
    let values = 0;
    for (let index = 0; index < upgradeTypes.length; index++) {
      const element = upgradeTypes[index];
      const value = ScrapManager.getUpgradeLevel(element);
      values += value;
    }
    if (values > 14) {
      const recycleMaster = achievements.achievements?.find(
        (achievement) => achievement.name === "Recycle Master",
      );

      if (recycleMaster) {
        if (!recycleMaster.unlocked) {
          recycleMaster.unlocked = true;
          return true;
        }
      }
    }
    return false;
  }
  public static isUnlocked(name: AchievementNames): boolean {
    return (
      this.getAchievements().achievements?.find((a) => a.name === name)
        ?.unlocked ?? false
    );
  }

  public static getLevelCompletion() {
    const levels = localStorage.getItem("levels");
    if (!levels) {
      return {
        levels: [
          {
            number: 1,
            completed: false,
          },
          {
            number: 2,
            completed: false,
          },
          {
            number: 3,
            completed: false,
          },
          {
            number: 4,
            completed: false,
          },
        ],
      };
    }
    return JSON.parse(levels);
  }
  public static completeLevel(levelNumber: number) {
    const data = this.getLevelCompletion();

    const levels = data.levels ?? [];

    const level = levels.find((l: any) => l.number === levelNumber);

    if (level) {
      level.completed = true;
    }
    localStorage.setItem("levels", JSON.stringify(data));
  }
  public static addAchievementPopup(engine: Engine) {
    const achievements = AchievementManager.checkAchievements();
    for (const a of achievements)
      switch (a) {
        case 1:
          engine.currentScene.add(new AchievementPopup("Perfect Hooking"));
          break;
        case 2:
          engine.currentScene.add(new AchievementPopup("Scrap Collector"));
          break;
        case 3:
          engine.currentScene.add(new AchievementPopup("High Score"));
          break;
        case 4:
          engine.currentScene.add(new AchievementPopup("Recycle Master"));
          break;
      }
  }
}
