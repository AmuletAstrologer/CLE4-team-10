import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Start } from './scenes/start.js'
import { Level1 } from './scenes/levelone.js'

export class Game extends Engine {
    

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
         })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("ello")
        this.addScene("start", new Start());
        this.addScene("level1", new Level1());
        this.goToScene("start");
    }

}

new Game()
