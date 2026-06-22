import { Actor, Color } from "excalibur";

export class Planet extends Actor {
    constructor({sprite, level, scale, hoversprite, pos}) {
        super({ width: sprite.width, height: sprite.height});
        this.sprite = sprite;
        this.level = level;
        this.scale = scale;
        this.hoversprite = hoversprite;
        this.pos = pos
    }

    onInitialize(engine) {
        this.sprite = this.sprite;

        this.graphics.use(this.sprite.toSprite());
        
        this.scale = this.scale;
        this.on('pointerup', () => {
            console.log(`Ga naar level ${this.level}`);
            engine.goToScene(this.level);
            console.log(this.level)
        });
        this.on('pointerenter', () => {
            this.graphics.use(this.hoversprite.toSprite());
        });
        this.on('pointerleave', () => {
            this.graphics.use(this.sprite.toSprite());
        });
    }
}