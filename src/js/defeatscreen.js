import {Scene, Actor,Label, Vector, Font, FontUnit, Color,  Keys} from "excalibur";
import { Resources } from "./resources.js";

export class DefeatScreen extends Scene {

    onInitialize(engine) {

        // Background
        const bg = new Actor({
            pos: new Vector(0, 0),
            anchor: new Vector(0, 0)
        });

        bg.graphics.use(Resources.Background.toSprite());
        this.add(bg);

        // Variables
        this.scrollSpeed = 80;
        this.crawlFinished = false;
        this.time = 0;
        this.crawlLines = [];

        // Title
        this.title = new Label({
            text: "YOU GOT DEFEATED...",
            pos: new Vector(640, 100),
            font: new Font({
                family: "Arial",
                size: 52,
                unit: FontUnit.Px,
                color: Color.White
            })
        });

        this.title.anchor = new Vector(0.5, 0);
        this.add(this.title);

        // Crawl text
        const lines = [
            "IN A GALAXY FAR... FAR... RIGHT HERE",
            "",
            "A TERRIBLE DEFEAT HAS OCCURRED.",
            "",
            "THE MISSION HAS FAILED.",
            "",
            "THE SHIP IS BROKEN.",
            "THE CREW IS PANICKING.",
            "THE ENGINEER CLAIMS THIS IS",
            "SOMEONE ELSE'S FAULT.",
            "",
            "SEVERAL IMPORTANT BUTTONS",
            "WERE PRESSED.",
            "",
            "THE WRONG ONES.",
            "",
            "THE ENEMY IS CELEBRATING.",
            "SPACE IS DOOMED.",
            "HUMANITY IS PROBABLY DOOMED.",
            "",
            "HOWEVER...",
            "",
            "THE COMMANDER MAY ATTEMPT",
            "THIS MISSION ONCE MORE.",
            "",
            "AFTER ALL,",
            "WHAT COULD POSSIBLY GO WRONG",
            "A SECOND TIME?"
        ];

        const startY = 900;
        const spacing = 50;

        for (let i = 0; i < lines.length; i++) {

            const label = new Label({
                text: lines[i],
                pos: new Vector(
                    engine.drawWidth / 2,
                    startY + (i * spacing)
                ),
                font: new Font({
                    family: "Arial",
                    size: 36,
                    unit: FontUnit.Px,
                    color: Color.White
                })
            });

            label.anchor = new Vector(0.5, 0);

            this.add(label);
            this.crawlLines.push(label);
        }

        // Restart text
        this.restart = new Label({
            text: "PRESS SPACE TO TRY AGAIN",
            pos: new Vector(
                engine.drawWidth / 2,
                620
            ),
            font: new Font({
                family: "Arial",
                size: 32,
                unit: FontUnit.Px,
                color: Color.White
            })
        });

        this.restart.anchor = new Vector(0.5, 0.5);
        this.restart.opacity = 0;

        this.add(this.restart);

        console.log("I AM DEFEAT!!!");
    }

    onPreUpdate(engine, delta) {

        this.time += delta;

        if (!this.crawlFinished) {

            let visibleLines = 0;

            for (const line of this.crawlLines) {

                // Move upward
                line.pos.y -=
                    this.scrollSpeed *
                    (delta / 1000);

                // Horizon location
                const horizonY = 120;

                // Scale based on distance
                const factor = Math.max(
                    0.15,
                    (line.pos.y - horizonY) / 900
                );

                line.scale = new Vector(
                    factor,
                    factor
                );

                // Slight tilt
                line.rotation = -0.01;

                // Fade near horizon
                line.opacity = Math.max(
                    0,
                    Math.min(
                        1,
                        (line.pos.y - horizonY) / 250
                    )
                );

                // Count visible lines
                if (line.pos.y > -100) {
                    visibleLines++;
                }
            }

            // When all lines are gone
            if (visibleLines === 0) {

                this.crawlFinished = true;

                // Remove crawl labels
                for (const line of this.crawlLines) {
                    line.kill();
                }

                this.title.kill();
            }
        }

        // Fade in restart text
        if (
            this.crawlFinished &&
            this.restart.opacity < 1
        ) {
            this.restart.opacity +=
                0.95 * (delta / 1000);
        }


        if (this.restart.opacity >= 1) {

            this.restart.opacity =
                0.75 +
                Math.sin(this.time / 250) * 0.25;
        }

        // Restart

        // if (
        //     this.crawlFinished &&
        //     engine.input.keyboard.wasPressed(Keys.Space)
        // ) {
        //     engine.goToScene("start");
        // }
    }
}