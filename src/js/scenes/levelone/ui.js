import { Actor, Color, Font, Label, Vector } from "excalibur"

export class UI extends Actor {
    #label1;
    constructor(shot) {
        super({
        })
        this.shot = shot
    }

    onInitialize(engine) {
        this.#label1 = new Label({
            text: "Score: 0",
            pos: new Vector(1130, 30),
            font: new Font({ size: 32, family: 'VT323', color: Color.White })
        })
        this.addChild(this.#label1)
    }

    updateScore(score) {
        this.#label1.text = `Score: ${score}`
    }
}