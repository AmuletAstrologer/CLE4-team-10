import { Actor, Timer, Vector, Random, Color } from "excalibur";
import { Resources } from "../../resources";
import { Trash } from "../../objects/trash";

export class Spawner extends Actor {
  onInitialize(engine) {
    const rand = new Random(1244);

    const trashTypes = [
      {
        sprite: Resources.AfvalAirtank.toSprite(),
        type: "Airtank",
      },
      {
        sprite: Resources.AfvalCilinder.toSprite(),
        type: "Cilinder",
      },
      {
        sprite: Resources.AfvalPaneel.toSprite(),
        type: "Plate",
      },
      {
        sprite: Resources.AfvalPlaat.toSprite(),
        type: "Piece",
      },
      {
        sprite: Resources.AfvalSatelliet.toSprite(),
        type: "Satellite",
      },
    ];

    const spawnTimer = new Timer({
      interval: 3000,

      fcn: () => {
        if (engine.currentScene.isPaused) {
          return;
        }

        const trash = new Trash();

        if (Math.random() < 0.49 && engine.currentScene.currentTarget) {
          const chosen = trashTypes.find(
            (trash) => trash.type === engine.currentScene.currentTarget,
          );

          trash.type = chosen.type;
          trash.graphics.use(chosen.sprite);
        } else {
          const index = rand.integer(0, trashTypes.length - 1);

          const chosen = trashTypes[index];

          trash.type = chosen.type;
          trash.graphics.use(chosen.sprite);
        }

        trash.vel = new Vector(
          Math.random() * 30 - 180,
          Math.random() * 90 - 45,
        );

        trash.pos = new Vector(1240, Math.random() * 400 + 50);

        // Tint target trash
        if (engine.currentScene.currentTarget === trash.type) {
          trash.graphics.current.tint = Color.Yellow;
        }

        engine.currentScene.add(trash);
      },

      repeats: true,
    });

    engine.currentScene.add(spawnTimer);

    spawnTimer.start();
  }
}
