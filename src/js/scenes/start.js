import { Scene, Label, Vector } from "excalibur";

export class Start extends Scene {

    onInitialize(engine) {
        const title = new Label({
            text: "Start",
            pos: new Vector(50, 20),
            fontSize: 40
        });

        this.add(title);
    }

    onActivate(context) {
    const engine = context.engine;

    engine.input.keyboard.on("press", (evt) => {
        if (evt.key === "Enter"){
            engine.goToScene("level1");
            //  engine.goToScene("level3");
        }
    })
}

}