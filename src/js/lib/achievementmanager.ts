import { getScores, LevelScores } from "../scores";
import { ScrapManager, upgradeTypes } from "./scrapmanager";

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
  totalScrap: number;
  totalScore: number;
  achievements: Achievement[];
};

export class AchievementManager {
  public static getAchievements(): Partial<Achievements> {
    const achievements = localStorage.getItem("achievements");

    if (!achievements) {
      return {
        totalScore: 0,
        totalScrap: 0,
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

  public static checkAchievements(): void {
    const achievements = AchievementManager.getAchievements();
    const scores = getScores();
    this.checkAchievement1(scores, achievements);
    this.checkAchievement2(achievements);
    // this.checkAchievement3(score)
    this.checkAchievement4(achievements);
    localStorage.setItem("achievements", JSON.stringify(achievements));
  }

  static checkAchievement1(
    scores: LevelScores,
    achievements: Partial<Achievements>,
  ) {
    if (scores.levelOne === 10) {
      const perfectHooking = achievements.achievements?.find(
        (achievement) => achievement.name === "Perfect Hooking",
      );

      if (perfectHooking) {
        perfectHooking.unlocked = true;
      }
    }
  }
  static checkAchievement2(achievements: Partial<Achievements>) {
    const scrap = ScrapManager.getScrap();
    if (scrap > 24) {
      const scrapCollector = achievements.achievements?.find(
        (achievement) => achievement.name === "Scrap Collector",
      );

      if (scrapCollector) {
        scrapCollector.unlocked = true;
      }
    }
  }
  static checkAchievement3(achievements: Partial<Achievements>, score: number) {
    if (score > 14) {
      const highscore = achievements.achievements?.find(
        (achievement) => achievement.name === "High Score",
      );

      if (highscore) {
        highscore.unlocked = true;
      }
    }
  }
  static checkAchievement4(achievements: Partial<Achievements>) {
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
        recycleMaster.unlocked = true;
      }
    }
  }
  public static isUnlocked(name: AchievementNames): boolean {
    return (
      this.getAchievements().achievements?.find((a) => a.name === name)
        ?.unlocked ?? false
    );
  }
}
