import { Actor, Timer, Vector, Random, Color } from "excalibur"
import { Resources, ResourceLoader } from "../../resources"
import { Trash } from "../../objects/trash"
import { Meteor } from "../../objects/meteor"

export class Spawner extends Actor {
    onInitialize(engine) {
        const rand = new Random(1244)
        const sprites = [
            Resources.AfvalAirtank.toSprite(),
            Resources.AfvalCilinder.toSprite(),
            Resources.AfvalFragment.toSprite(),
            Resources.AfvalHaak.toSprite(),
            Resources.AfvalHelm.toSprite(),
            Resources.AfvalModule.toSprite(),
            Resources.AfvalPaneel.toSprite(),
            Resources.AfvalPlaat.toSprite(),
            Resources.AfvalSatelliet.toSprite()
        ]

        const spawnTimer = new Timer({
            interval: 3600,
            fcn: () => {
                const trash = new Trash();
                trash.vel = new Vector(Math.random() * 30 - 180, Math.random() * 90 - 45)
                trash.pos = new Vector(1240, Math.random() * 400 + 50);
                const index = rand.integer(0, sprites.length - 1);
                trash.graphics.use(sprites[index]);

                engine.currentScene.add(trash);
                if (Math.random() < 0.2){
                    const meteor = new Meteor();
                    meteor.vel = new Vector(-(Math.random() * 600 + 80), 0)
                    meteor.pos = new Vector(1240, Math.floor(Math.random() * 401) + 200)
                    engine.currentScene.add(meteor)
                }
            },
            repeats: true
        });

        engine.currentScene.add(spawnTimer);
        spawnTimer.start();
    }
}