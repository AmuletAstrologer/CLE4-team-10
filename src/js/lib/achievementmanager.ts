import { getScores, LevelScores } from "../scores";
import { UpgradeTypes } from "./scrapmanager";

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
            description: "Get a perfect score on level 1",
            unlocked: false,
          },
          {
            name: "Scrap Collector",
            description: "Collect your first scrap",
            unlocked: false,
          },
          {
            name: "High Score",
            description: "Get a score of 15 in endless",
            unlocked: false,
          },
          {
            name: "Recycle Master",
            description: "Get a total of 5 upgrades",
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

    localStorage.setItem("achievements", JSON.stringify(achievements));
  }
}
