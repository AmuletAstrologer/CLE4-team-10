import { Color, FontUnit, Label, Scene, Vector } from "excalibur";
import { Background } from "../../background/background";
import { Resources } from "../../resources";
import { PlanetSpawner } from "./planetspawner";
import { Hook } from "../../actors/hook";
import { Spawner } from "./spawner";
import { UI } from "../levelthree/ui";

export class Level2 extends Scene {
    score = 0;
    objective = 0;

    onInitialize(engine) {
        this.add(new Background);

        const backbutton = new Label({
            text: "⇜",
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 60,
                color: Color.White
            }),
        })

        this.createLevel();
        
        backbutton.anchor = new Vector(0.5, 0.5);
        backbutton.pos = new Vector(40, 40);

        this.add(backbutton);


        backbutton.on('pointerenter', () => {
            backbutton.font.color = Color.Orange;
        });

        backbutton.on('pointerleave', () => {
            backbutton.font.color = Color.White;
        });

        backbutton.on('pointerup', () => {
            engine.goToScene("levels");
        })

        
        this.spawned = 0;

        this.spawner = new Spawner();
        this.add(this.spawner);
    }

    addSpawned() {
        this.spawned++;
    }

    removeSpawned() {
        this.spawned--;
    }


    createLevel(){
        this.add(new PlanetSpawner);
        this.add(new Hook);
        this.ui = new UI();
        this.add(this.ui);
    }

    addScore() {
        this.score++;

        this.ui.updateScore(
            this.score
        );

    }




    addObjective() {

        this.objective++;

        this.ui.updateObjective(
            this.objective
        );



        if (this.objective >= 10) {


            this.engine.goToScene(
                "level3Ending",
                {
                    sceneActivationData: {
                        score: this.score

                    }
                }
            );
        }


        // if (this.objective === 1) {


        //     this.engine.goToScene(
        //         "defeatscreen",
        //         {

        //             sceneActivationData: {
        //                 score: this.score,
        //                 restartScene: "level3"

        //             }

        //         }

        //     );

        // }

    }

    removeScore() {
        this.score--;

        this.ui.updateScore(
            this.score
        );


    }
}