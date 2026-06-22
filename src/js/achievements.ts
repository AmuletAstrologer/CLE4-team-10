import { getScores } from "./scores"

export type AchievementNames = "Perfect Hooking" | "Scrap Collector"

type Achievement = {
    name: AchievementNames;
    description: string;
    unlocked: boolean;
}

type Achievements = {
    totalScrap: number,
    totalScore: number,
    achievements: Achievement[]
}

export function getAchievements(): Partial<Achievements> {
    const achievements = localStorage.getItem("achievements")

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
                }
            ]
        }
    }
    return JSON.parse(achievements)
}

export function checkAchievements(): void {
    const achievements = getAchievements()
    const scores = getScores()

    if (scores.levelOne === 10) {
        const perfectHooking = achievements.achievements?.find(
            achievement => achievement.name === "Perfect Hooking"
        );

        if (perfectHooking) {
            perfectHooking.unlocked = true
        }
    }

    localStorage.setItem("achievements", JSON.stringify(achievements))
}
