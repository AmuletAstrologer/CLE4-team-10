import { Actor, Timer, Vector, Random } from "excalibur";
import { Resources } from "../../resources";
import { Trash } from "../../objects/trash";
import { Meteor } from "../../objects/meteor";

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
        sprite: Resources.AfvalFragment.toSprite(),
        type: "Fragment",
      },
      {
        sprite: Resources.AfvalHaak.toSprite(),
        type: "Haak",
      },
      {
        sprite: Resources.AfvalHelm.toSprite(),
        type: "Helm",
      },
      {
        sprite: Resources.AfvalModule.toSprite(),
        type: "Module",
      },
      {
        sprite: Resources.AfvalPaneel.toSprite(),
        type: "Plaat",
      },
      {
        sprite: Resources.AfvalPlaat.toSprite(),
        type: "Piece",
      },
      {
        sprite: Resources.AfvalSatelliet.toSprite(),
        type: "Satelliet",
      },
    ];

    const spawnTimer = new Timer({
      interval: 3600,

      fcn: () => {
        const trash = new Trash();

        const chosen =
          trashTypes[rand.integer(0, trashTypes.length - 1)];

        trash.type = chosen.type;
        trash.graphics.use(chosen.sprite);

        trash.pos = new Vector(
          1240,
          Math.random() * 400 + 50
        );

        trash.vel = new Vector(
          Math.random() * 30 - 180,
          Math.random() * 90 - 45
        );

        trash.setTargetTint(
          engine.currentScene.currentTarget === trash.type
        );

        engine.currentScene.add(trash);

        if (Math.random() < 0.2) {
          const meteor = new Meteor();

          meteor.pos = new Vector(
            1240,
            Math.floor(Math.random() * 401) + 200
          );

          meteor.vel = new Vector(
            -(Math.random() * 600 + 80),
            0
          );

          engine.currentScene.add(meteor);
        }
      },

      repeats: true,
    });

    engine.currentScene.add(spawnTimer);
    spawnTimer.start();
  }
}