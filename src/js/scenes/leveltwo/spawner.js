import { Actor, Timer, Vector, Random, Color } from "excalibur"
import { Resources, ResourceLoader } from "../../resources"
import { AlteredTrash } from "./alteredtrash"

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
        ];


        const spawnTimer = new Timer({
            interval: 3000,
            fcn: () => {
                if (engine.currentScene.spawned >= 10) {
                    return; // stop met spawnen
                }

                for (let i = 0; i < 1; i++) {
                    const trash = new AlteredTrash();
                    trash.vel = new Vector(Math.random() * 30 - 180, Math.random() * 90 - 45)
                    trash.pos = new Vector(1240, Math.random() * 400 + 50);
                    const index = rand.integer(0, sprites.length - 1);
                    trash.graphics.use(sprites[index]);
                    engine.currentScene.add(trash);
                    engine.currentScene.addSpawned();
                    console.log(engine.currentScene.spawned);
                }
            },
            repeats: true
        });

        engine.currentScene.add(spawnTimer);
        spawnTimer.start();
    }
}