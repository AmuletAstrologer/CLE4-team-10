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
        sprite: Resources.AfvalFragment.toSprite(),
        type: "Fragment",
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
        type: "Plaat",
      },
      {
        sprite: Resources.AfvalSatelliet.toSprite(),
        type: "Satelliet",
      },
    ];



    const spawnTimer = new Timer({

      interval: 3000,

      fcn: () => {


        const trash = new Trash();


        // Pick random trash
        const index = rand.integer(
          0,
          trashTypes.length - 1
        );


        const chosen = trashTypes[index];


        // Give trash identity
        trash.type = chosen.type;


        // Give sprite
        trash.graphics.use(chosen.sprite);



        trash.vel = new Vector(
          Math.random() * 30 - 180,
          Math.random() * 90 - 45
        );


        trash.pos = new Vector(
          1240,
          Math.random() * 400 + 50
        );



        // Tint target trash
        if (
          engine.currentScene.currentTarget === trash.type
        ) {

          trash.graphics.current.tint = Color.Yellow;

        }



        engine.currentScene.add(trash);

      },

      repeats: true

    });



    engine.currentScene.add(spawnTimer);

    spawnTimer.start();

  }

}