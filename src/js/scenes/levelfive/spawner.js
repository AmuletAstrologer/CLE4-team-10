import { Actor, Timer, Vector, Random } from "excalibur";
import { Resources } from "../../resources";
import { LevelFiveTrash } from "./levelfivethrash";
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
        type: "Hook",
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
        type: "Plate",
      },

      {
        sprite: Resources.AfvalPlaat.toSprite(),
        type: "Piece",
      },

      {
        sprite: Resources.AfvalSatelliet.toSprite(),
        type: "Satellite",
      }

    ];



    const spawnTimer = new Timer({

      interval: 3600,


      fcn: () => {


        if (engine.currentScene.isPaused) {
          return;
        }


        const trash = new LevelFiveTrash();


        let chosen;


        // 35% chance current target appears
        if (
          Math.random() < 0.35 &&
          engine.currentScene.currentTarget
        ) {

          chosen = trashTypes.find(
            (t) =>
              t.type === engine.currentScene.currentTarget
          );

        } else {

          chosen =
            trashTypes[
              rand.integer(0, trashTypes.length - 1)
            ];

        }



        trash.type = chosen.type;

        trash.graphics.use(
          chosen.sprite
        );


        // Always apply tint
        trash.setTargetTint(
          engine.currentScene.currentTarget === trash.type
        );



        trash.vel = new Vector(
          Math.random() * 30 - 180,
          Math.random() * 90 - 45
        );


        trash.pos = new Vector(
          1240,
          Math.random() * 400 + 50
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