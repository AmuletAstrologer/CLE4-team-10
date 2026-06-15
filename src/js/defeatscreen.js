import {
    Scene,
    Actor,
    Label,
    Vector,
    Font,
    FontUnit,
    Color,
    Keys
} from "excalibur";

import { Resources } from "./resources.js";

export class DefeatScreen extends Scene {

    onInitialize(engine) {

        const bg = new Actor({
            pos: new Vector(0, 0),
            anchor: new Vector(0, 0)
        });

        bg.graphics.use(Resources.Background.toSprite());
        this.add(bg);

        this.scrollSpeed = 80;
        this.crawlFinished = false;
        this.time = 0;

        this.crawl = new Actor({
            pos: new Vector(640, 850)
        });

        this.add(this.crawl);

        // Title
        const title = new Label({
            text: "YOU GOT DEFEATED...",
            pos: new Vector(-220, 0),
            font: new Font({
                family: "Arial",
                size: 42,
                unit: FontUnit.Px,
                color: Color.White
            })
        });

        // Story text
        const text1 = new Label({
            text: "IN A GALAXY FAR... FAR... RIGHT HERE",
            pos: new Vector(-260, 80),
            font: new Font({
                family: "Arial",
                size: 28,
                unit: FontUnit.Px,
                color: Color.White
            })
        });

        const text2 = new Label({
            text: "SPACE IS DOOMED, HUMANITY IS DOOMED!",
            pos: new Vector(-260, 150),
            font: new Font({
                family: "Arial",
                size: 28,
                unit: FontUnit.Px,
                color: Color.White
            })
        });

        this.crawl.addChild(title);
        this.crawl.addChild(text1);
        this.crawl.addChild(text2);

      
        this.restart = new Label({
            text: "PRESS SPACE TO TRY AGAIN",
            pos: new Vector(420, 650),
            font: new Font({
                family: "Arial",
                size: 28,
                unit: FontUnit.Px,
                color: Color.White
            })
        });

        this.restart.opacity = 0;
        this.add(this.restart);

        console.log("I am defeat!!!");
    }

    onPreUpdate(engine, delta) {

        this.time += delta;

        if (!this.crawlFinished) {

            this.crawl.pos.y -= this.scrollSpeed * (delta / 1000);

            const scale = Math.max(
                0.15,
                this.crawl.pos.y / 850
            );

            this.crawl.scale = new Vector(scale, scale);

            if (this.crawl.pos.y < 150) {
                this.crawlFinished = true;
                this.crawl.kill(); 
            }
        }

        if (this.crawlFinished && this.restart.opacity < 1) {
            this.restart.opacity += 0.5 * (delta / 1000);
        }

    
        if (this.restart.opacity >= 1) {
            this.restart.opacity =
                0.75 + Math.sin(this.time / 250) * 0.25;
        }

        // Restart game
        // if (
        //     this.crawlFinished &&
        //     engine.input.keyboard.wasPressed(Keys.Space)
        // ) {
        //     engine.goToScene("start");
        // }
    }
}