import { Scene, Vector, Buttons } from "excalibur";
import { Background } from "../background/background";
import { Resources } from "../resources";
import { ArrowLayer } from "../background/arrowlayer";
import { Planet } from "../planet";
import { Cursor } from "../objects/cursor";

export class LevelSummary extends Scene {
  onInitialize(engine) {
    this.cursor = new Cursor();
    this.add(this.cursor);
    this.add(new Background());

    this.add(new ArrowLayer());

    const planets = [
      {
        sprite: Resources.redPlanet,
        hoversprite: Resources.hoverredPlanet,
        // level: "two",
        scale: new Vector(0.5, 0.5),
        pos: new Vector(250, 450),
      },
      {
        sprite: Resources.recyclePlanet,
        hoversprite: Resources.hoverredPlanet,
        level: "levelrecyclemenu",
        scale: new Vector(0.7, 0.7),
        pos: new Vector(150, 110),
      },
      {
        sprite: Resources.salmonPlanet,
        hoversprite: Resources.hoversalmonPlanet,
        level: "level1",
        scale: new Vector(0.5, 0.5),
        pos: new Vector(380, 610),
      },
      {
        sprite: Resources.yellowringPlanet,
        hoversprite: Resources.hoveryellowringPlanet,
        level: "level3",
        scale: new Vector(0.5, 0.5),
        pos: new Vector(700, 590),
      },
      {
        sprite: Resources.lightbluePlanet,
        hoversprite: Resources.hoverlightbluePlanet,
        //level: "four",
        scale: new Vector(0.6, 0.6),
        pos: new Vector(485, 345),
      },
      {
        sprite: Resources.orangePlanet,
        hoversprite: Resources.hoverorangePlanet,
        //level: "five",
        scale: new Vector(0.4, 0.4),
        pos: new Vector(1015, 405),
      },
      {
        sprite: Resources.blueringPlanet,
        hoversprite: Resources.hoverblueringPlanet,
        //level: "six",
        scale: new Vector(0.5, 0.5),
        pos: new Vector(840, 80),
      },
    ];

    planets.forEach((p) => {
      const planet = new Planet(p);
      planet.pos = p.pos;
      this.add(planet);
    });
  }
  onPreUpdate(engine) {
    this.hovered = null;
    this.hovered = this.actors.find((actor) => {
      if (actor instanceof Cursor) return false;

      return (
        Math.hypot(
          actor.pos.x - this.cursor.pos.x,
          actor.pos.y - this.cursor.pos.y,
        ) < 40
      );
    });
    const gamepad = engine.input.gamepads.at(0);
    if (gamepad?.wasButtonPressed(Buttons.Face1)) {
      this.hovered.events.emit("pointerup");
    }
  }
}
