import {
  ScreenElement,
  Label,
  Color,
  Font,
  FontUnit,
  Keys,
  Vector,
  Actor,
  Rectangle,
} from "excalibur";
import { Resources } from "../resources";
import { GenericCard } from "./genericcard";
import { LevelText } from "./leveltext";

export class InGameHandleiding extends ScreenElement {
  open = false;

  overlay;

  label = new Label({
    text: "",
    pos: new Vector(350, 160),
    color: Color.White,
    font: Resources.PixelFont.toFont({
      size: 28,
      unit: FontUnit.Px,
    }),
  });
  card;
  helpButton;
  helpCard;

  onInitialize(engine) {
    // Black transparent overlay
    this.overlay = new Actor({
      pos: new Vector(640, 360),
      width: 1280,
      height: 720,
    });

    this.overlay.graphics.use(
      new Rectangle({
        width: 1280,
        height: 720,
        color: Color.Black,
        opacity: 0.5,
      }),
    );

    this.card = new GenericCard({
      pos: new Vector(640, 360),
      width: 700,
      height: 500,
    });

    this.helpCard = new GenericCard({
      pos: new Vector(1175, 700),
      width: 260,
      height: 70,
    });

    this.helpButton = new Label({
      text: "Press O for help",

      pos: new Vector(1060, 685),

      color: Color.White,

      font: Resources.PixelFont.toFont({
        size: 20,
        unit: FontUnit.Px,
      }),
    });

    this.helpCard.z = 40;
    this.helpButton.z = 50;

    this.addChild(this.helpCard);
    this.addChild(this.helpButton);

    // Layer order
    this.overlay.z = 100;
    this.card.z = 200;
    this.label.z = 300;
  }

  toggleMenu(engine) {
    this.open = !this.open;

    if (this.open) {
      this.addChild(this.overlay);
      this.addChild(this.card);
      this.addChild(this.label);

      this.helpCard.graphics.isVisible = false;
      this.helpButton.graphics.isVisible = false;

      engine.currentScene.isPaused = true;
    } else {
      this.removeChild(this.overlay);
      this.removeChild(this.card);
      this.removeChild(this.label);

      this.helpCard.graphics.isVisible = true;
      this.helpButton.graphics.isVisible = true;

      engine.currentScene.isPaused = false;
    }
  }

  onPreUpdate(engine) {
    if (engine.input.keyboard.wasPressed(Keys.O)) {
      this.toggleMenu(engine);

      console.log("Handleiding:", this.open);
    }
  }

  //Welcome text (Dialoge)
  //"Welcome Sustainer! So glad to have you."
  //"Your objective is to save the sphere we call home!"
  //"Go from planet to planet and complete the objectives"
  //"The fate of our world and future is in your hands now"
  // "Press O to close"

  //Alternative text
  //"Click a the first planet to start"
  //"If you ever forget the controls press "O"
  //"Warning: planet 6 is a Endeless level"
  // "Press O to close"

  updateObjective(objective) {
    this.label.text =
      "CONTROLS\n\n" +
      "Move: WASD / Stick\n" +
      "Hook: Space / A\n\n" +
      "OBJECTIVE\n\n" +
      objective +
      "\n\n" +
      "Press O to close";
  }

  updateText(title, text) {
  this.label.text =
    `${title}\n\n` +
    `${text}\n\n` +
    "Press O to close";
}

}
