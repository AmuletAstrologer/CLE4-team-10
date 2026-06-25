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
        sprite: Resources.recyclePlanet.toSprite(),
        hoversprite: Resources.hoverrecyclePlanet.toSprite(),
        level: "recyclemenu",
        scale: new Vector(0.7, 0.7),
        pos: new Vector(150, 110),
      },
      {
        sprite: Resources.achievementPlanet.toSprite(),
        hoversprite: Resources.hoverachievementPlanet.toSprite(),
        level: "achievements",
        scale: new Vector(0.5, 0.5),
        pos: new Vector(1170, 600),
      },
      {
        sprite: Resources.salmonPlanet.toSprite(),
        hoversprite: Resources.hoversalmonPlanet.toSprite(),
        level: "level1",
        scale: new Vector(0.5, 0.5),
        pos: new Vector(365, 625),
      },
      {
        sprite: Resources.redPlanet.toSprite(),
        hoversprite: Resources.hoverredPlanet.toSprite(),
        level: "level2",
        scale: new Vector(0.5, 0.5),
        pos: new Vector(250, 450),
      },
      {
        sprite: Resources.yellowringPlanet.toSprite(),
        hoversprite: Resources.hoveryellowringPlanet.toSprite(),
        level: "level3",
        scale: new Vector(0.5, 0.5),
        pos: new Vector(700, 590),
      },
      {
        sprite: Resources.lightbluePlanet.toSprite(),
        hoversprite: Resources.hoverlightbluePlanet.toSprite(),
        level: "level4",
        scale: new Vector(0.6, 0.6),
        pos: new Vector(485, 345),
      },
      {
        sprite: Resources.orangePlanet.toSprite(),
        hoversprite: Resources.hoverorangePlanet.toSprite(),
        level: "five",
        scale: new Vector(0.4, 0.4),
        pos: new Vector(1015, 405),
      },
      {
        sprite: Resources.blueringPlanet.toSprite(),
        hoversprite: Resources.hoverblueringPlanet.toSprite(),
        level: "six",
        scale: new Vector(0.5, 0.5),
        pos: new Vector(840, 80),
      },
    ];

    planets.forEach((p) => {
      const planet = new Planet(p);
      // planet.pos = p.pos;
      this.add(planet);
    });
  }
  onActivate(context) {
    const music = Resources.levelSelectSound;
    if (!music.isPlaying()) {
      music.loop = true;
      music.play(0);
    }

    let volume = 0;
    music.volume = 0;

    const interval = setInterval(() => {
      volume += 0.004;

      if (volume >= 0.65) {
        volume = 0.65;
        clearInterval(interval);
      }

      music.volume = volume;
    }, 50);
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
      if (this.hovered instanceof Planet) {
        this.hovered.events.emit("pointerup");
      }
    }
  }
}
