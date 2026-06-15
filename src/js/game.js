import { Engine } from 'excalibur';
import '../css/style.css'

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
        this.goToScene("start");
    }

}
new Game()
