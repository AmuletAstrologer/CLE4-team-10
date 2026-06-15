import { Actor, Engine, Vector, DisplayMode, SolverStrategy, Keys } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Start } from "./scenes/start.js"
import { DefeatScreen } from "./defeatscreen.js"
import { Background } from "./background/background.js"

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
        // this.addScene("start", new Start());
        // this.goToScene("start");
        this.add(new Background());
        
        
    }

    onInitialize(engine) {
        this.add('defeatscreen', new DefeatScreen());
    }

    onPreUpdate(engine) {

        // Tijdelijk 
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.goToScene('defeatscreen');
        }

    }

}
new Game()
