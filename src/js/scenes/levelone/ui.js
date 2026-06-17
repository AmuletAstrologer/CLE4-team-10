import { Actor, Color, FontUnit, Label, Vector } from "excalibur"
import { Resources, ResourceLoader } from "../../resources";

export class UI extends Actor {
    #label1;
    #objective
    constructor() {
        super({
        })
    }

    onInitialize(engine) {
        this.#label1 = new Label({
            text: "Score: 0",
            pos: new Vector(1130, 30),
            font: Resources.Pixelfont.toFont({
                unit: FontUnit.Px,
                size: 32,
                color: Color.White
            })
        })
        this.addChild(this.#label1)

        this.#objective = new Label({
            text: "0/10",
            pos: new Vector(600, 30),
            font: Resources.Pixelfont.toFont({
                unit: FontUnit.Px,
                size: 40,
                color: Color.White
            })
        })
        this.addChild(this.#objective)

        const objectiveIcon = new Actor({
            pos: new Vector(670, 0),
            anchor: Vector.Zero
        });
        const objectiveSprite = Resources.SpaceAfval.toSprite();
        objectiveSprite.destSize = { width: 100, height: 100 }
        objectiveIcon.graphics.use(objectiveSprite);
        
        this.addChild(objectiveIcon);
    }

    updateScore(score) {
        this.#label1.text = `Score: ${score}`
    }
    updateObjective(objective) {
        this.#objective.text = `${objective}/10`
    }
}