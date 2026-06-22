import "../css/style.css";
import {
  Actor,
  Engine,
  Vector,
  DisplayMode,
  SolverStrategy,
  Keys,
  Transition,
  Color,
  FadeInOut,
} from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import { Start } from "./scenes/start.js";
import { Background } from "./background/background.js";
import { DefeatScreen } from "./defeatscreen.js";
import { Level1 } from "./scenes/levelone/levelone.js";
import { RecycleMenu } from "./scenes/recyclemenu/recyclemenu.js";
import { Level3 } from "./scenes/levelthree/levelthree.js";
import { LevelEnding } from "./scenes/levelEnding.js";
import { Level3Ending } from "./scenes/levelthree/levelthreeEnding.js";
import { LevelSummary } from "./scenes/levelsummary.js";
import "../css/style.css";
// import { Actor, Engine, Vector, DisplayMode, SolverStrategy, Keys, Transition, Color, FadeInOut } from "excalibur"

export class Game extends Engine {
  constructor() {
    super({
      width: 1280,
      height: 720,
      maxFps: 60,
      displayMode: DisplayMode.FitScreen,
    });
    this.start(ResourceLoader).then(() => this.startGame());
  }

  startGame() {
    this.addScene("start", new Start());
    this.addScene("levels", new LevelSummary());
    this.addScene("level1", new Level1());
    this.addScene("level3", new Level3());
    this.addScene("levelrecyclemenu", new RecycleMenu());
    this.addScene("defeatscreen", new DefeatScreen());

    (this.addScene("levelEnding", {
      scene: new LevelEnding(),
      transitions: {
        in: new FadeInOut({
          duration: 1500,
          direction: "in",
          color: Color.Black,
        }),
        out: new FadeInOut({
          duration: 1500,
          direction: "out",
          color: Color.Black,
        }),
      },
    }),
      this.addScene("level3Ending", {
        scene: new LevelEnding(),
        transitions: {
          in: new FadeInOut({
            duration: 1500,
            direction: "in",
            color: Color.Black,
          }),
          out: new FadeInOut({
            duration: 1500,
            direction: "out",
            color: Color.Black,
          }),
        },
      }));
    this.goToScene("start");
  }
}

new Game();
