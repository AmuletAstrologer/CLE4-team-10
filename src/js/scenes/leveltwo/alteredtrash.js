import { Actor, Shape, Vector } from "excalibur";
import { PlanetSpawner } from "./planetspawner";

export class AlteredTrash extends Actor {
    #speed = 200;
        constructor() {
            super({
                width: 1,
                height: 1,
                collider: Shape.Box(250, 250),
                // collisionType: CollisionType.Active,
            });
        }
    
    
        onInitialize(engine) {
            this.scale = new Vector(0.12, 0.12);
            this.on('pointerdown', () => {
                this.kill()
                this.scene?.addScore()
            });
        }

        onCollisionStart(self, other){
            if(other.owner instanceof PlanetSpawner){
                this.kill();
                this.scene.removeSpawned();
                this.scene.removeScore();
            }
        }

        onPostUpdate(engine, delta) {
        const bounds = engine.screen;

        if (this.pos.x < 0 || this.pos.x > engine.drawWidth) {
            this.vel.x *= -1;
        }
        if (this.pos.y < 0 || this.pos.y > engine.drawHeight) {
            this.vel.y *= -1;
        }
    }
}