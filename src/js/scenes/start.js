import { Actor, Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Background } from "../background/background.js"


export class Start extends Engine {
    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    onInitialize(engine) {
        const background = new Background();
        this.add(background);
    }


}