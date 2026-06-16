import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy, Keys, Transition, Color, FadeInOut } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Start } from './scenes/start.js'
import { Background } from './background/background.js'
import { DefeatScreen } from "./defeatscreen.js"
import { Level1 } from './scenes/levelone/levelone.js'
import { Level1Ending } from './scenes/levelone/leveloneEnding.js'

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
        this.addScene("start", new Start());
        this.addScene("level1", new Level1());
        this.addScene("level1Ending", {
            scene: new Level1Ending(),
            transitions: {
                in: new FadeInOut({ duration: 1500, direction: 'in', color: Color.Black }),
                out: new FadeInOut({ duration: 1500, direction: 'out', color: Color.Black })
            }
        })
        this.goToScene("start");
    }

}

new Game()
