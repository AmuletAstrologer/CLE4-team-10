import { getScores } from "./scores"

export type Achievements = {
    [key:string]:{
        name: string
        description: string
        unlocked: boolean
    }
    
}
export function getAchievements(): Achievements {
    const achievements = localStorage.getItem("achievements")

    if (!achievements) {
        return {
            Achievement1: {
                 name: "Perfect Hooking",
                 description: "Get a perfect score on level 1", 
                 unlocked: false,
            },
            Achievement2:{
                name: "Scrap Collector",
                description: "Collect your first scrap",
                unlocked: false,
            }
        }
    }
    return JSON.parse(achievements)
}
export function checkAchievements(): void{
    const achievements = getAchievements();
    const scores = getScores();

    if(scores.levelOne === 10){
        achievements.Achievement1.unlocked = true
    }
    localStorage.setItem("achievements", JSON.stringify(achievements))
}
