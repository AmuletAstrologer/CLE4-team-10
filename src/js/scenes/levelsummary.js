import { Scene, Vector } from "excalibur";
import { Background } from "../background/background";
import { Resources } from "../resources";
import { ArrowLayer } from "../background/arrowlayer";
import { Planet } from "../planet";

export class LevelSummary extends Scene {
    onInitialize(engine) {
        this.add(new Background);

        this.add(new ArrowLayer);

        const planets = [
            {
                sprite: Resources.recyclePlanet,
                hoversprite: Resources.hoverrecyclePlanet,
                level: "recyclemenu",
                scale: new Vector(0.7, 0.7),
                pos: new Vector(150, 110),
            },
            {
                sprite: Resources.salmonPlanet,
                hoversprite: Resources.hoversalmonPlanet,
                level: "level1",
                scale: new Vector(0.5, 0.5),
                pos: new Vector(365, 625),
            },
            {
                sprite: Resources.redPlanet,
                hoversprite: Resources.hoverredPlanet,
                level: "level2",
                scale: new Vector(0.5, 0.5),
                pos: new Vector(250, 450)
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
                level: "four",
                scale: new Vector(0.6, 0.6),
                pos: new Vector(485, 345),
            },
            {
                sprite: Resources.orangePlanet,
                hoversprite: Resources.hoverorangePlanet,
                level: "five",
                scale: new Vector(0.4, 0.4),
                pos: new Vector(1015, 405),
            },
            {
                sprite: Resources.blueringPlanet,
                hoversprite: Resources.hoverblueringPlanet,
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
    }
}