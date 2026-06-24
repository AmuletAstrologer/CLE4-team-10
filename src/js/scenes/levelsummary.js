import { Scene, Vector } from "excalibur";
import { Background } from "../background/background";
import { Resources } from "../resources";
import { ArrowLayer } from "../background/arrowlayer";
import { Planet } from "../planet";
import { Startpoint } from "../startpoint";

export class LevelSummary extends Scene {
  onInitialize(engine) {
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
                pos: new Vector(250, 450)
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
                level: "four",
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

        planets.forEach(p => {
            const planet = new Planet(p);
            // planet.pos = p.pos;
            this.add(planet);
        });
        this.add(new Startpoint);
    }
}
