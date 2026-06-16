export class Level1 extends Scene {


    onInitialize(engine) {
        const defeatScreen = new DefeatScreen("level1");

        engine.addScene(
            "defeatscreen",
            defeatScreen
        );

        engine.goToScene("defeatscreen");

    }

}

