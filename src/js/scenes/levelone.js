import { Scene, Label, Actor, Vector } from "excalibur";
import { Trash } from "../objects/trash.js"
export class Level1 extends Scene {

    onInitialize(engine) {
        const title = new Label({
            text: "Level One",
            pos: new Vector(50, 20),
            fontSize: 40
        });
        this.trash = new Trash();
        this.add(this.trash);

        this.add(title);
    }

}