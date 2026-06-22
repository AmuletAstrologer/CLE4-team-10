import { Actor, Color, FontUnit, Label, Vector } from "excalibur"
import { Resources } from "../../resources";

export class UI extends Actor {
    #label1;
    #objective
    constructor(shot) {
        super({
        })
    }

    onInitialize(engine) {
        this.#label1 = new Label({
            text: "Score: 0",
            pos: new Vector(1130, 30),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 32,
                color: Color.White
            })
        })
        this.addChild(this.#label1)

         this.#objective = new Label({
            text: "0/10",
            pos: new Vector(600, 30),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 40,
                color: Color.White
            })
        })
        this.addChild(this.#objective)
    }

    updateScore(score) {
        this.#label1.text = `Score: ${score}`
    }
    updateObjective(objective){
        this.#objective.text = `${objective}/10`
    }
}