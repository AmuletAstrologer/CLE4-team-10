export type LevelScores = {
    levelOne: number;
    levelTwo: number;
    levelThree: number;
    levelFour: number;
}

export function getScores(): LevelScores {
    const savedScores = localStorage.getItem("levelScores")

    if (!savedScores) {
        return {
            levelOne: 0,
            levelTwo: 0,
            levelThree: 0,
            levelFour: 0
        }
    }
    return JSON.parse(savedScores)
}

export function saveScores(score: number, level: keyof LevelScores): void {
    const scores = getScores()
    if (score > scores[level]) {
        scores[level] = score
        localStorage.setItem(
            "levelScores",
            JSON.stringify(scores)
        )
    }
    else{
        localStorage.setItem(
            "levelScore",
            JSON.stringify(scores)
        )
    }

}
