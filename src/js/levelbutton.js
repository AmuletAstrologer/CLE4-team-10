import { Actor, Color, FontUnit, Label, Vector, Buttons } from "excalibur";
import { Resources } from "./resources";
export class LevelButton extends Actor {
    constructor() {
        super({ width: Resources.Greenbutton.width, height: Resources.Greenbutton.height });
    }

    onInitialize(engine) {
        this.pointer.useGraphicsBounds = false;

        this.collider.useBoxCollider(350, 70);

        const normalButton = this.graphics.add(Resources.Greenbutton.toSprite());
        const hoverButton = this.graphics.add(Resources.GreenbuttonHover.toSprite());

        this.graphics.use(normalButton);

        this.on('pointerenter', () => {
            this.graphics.use(hoverButton);
        });

        this.on('pointerleave', () => {
            this.graphics.use(normalButton);
        });

        this.on('pointerup', () => {
            engine.goToScene("levels");
        });

        const buttonlabel = new Label({
            text: "LEVELS",
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 40,
                color: Color.White
            })
        })
        buttonlabel.anchor = new Vector(0.5, 0.5);

        this.addChild(buttonlabel);
    }
    onPreUpdate(engine){
        const gamepad = engine.input.gamepads.at(0);
        if(gamepad?.wasButtonPressed(Buttons.Face1)){
            engine.goToScene("levels")
        }
        
    }
}