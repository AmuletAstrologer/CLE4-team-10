import { ImageSource, Sound, Resource, Loader, FontSource } from "excalibur";

const Resources = {
    Background: new ImageSource('images/background.png'),
    AfvalAirtank: new ImageSource('images/afvalairtank.png'),
    AfvalCilinder: new ImageSource('images/afvalcilinder.png'),
    AfvalFragment: new ImageSource('images/afvalfragment.png'),
    AfvalHaak: new ImageSource('images/afvalhaak.png'),
    AfvalHelm: new ImageSource('images/afvalhelm.png'),
    AfvalModule: new ImageSource('images/afvalmodule.png'),
    AfvalPaneel: new ImageSource('images/afvalpaneel.png'),
    AfvalPlaat: new ImageSource('images/afvalplaat.png'),
    AfvalSatelliet: new ImageSource('images/afvalsatelliet.png'),
    AfvalSchroef1: new ImageSource('images/afvalschroef1.png'),
    AfvalSchroef2: new ImageSource('images/afvalschroef2.png'),
    AfvalSchroef3: new ImageSource('images/afvalschroef3.png'),
    AfvalSchroef4: new ImageSource('images/afvalschroef4.png'),
      Hook: new ImageSource("images/hook.png"),
    PixelFont: new FontSource('fonts/upheavtt.ttf', 'Upheaval'),
    StartsceneLabel: new    ImageSource('images/startsceneLabel.png'),
    Greenbutton: new ImageSource('images/greenbutton.png'),
    GreenbuttonHover: new ImageSource('images/greenbuttonhover.png'),
    levelArrows: new ImageSource('images/levelarrows.png'),
    blueringPlanet: new ImageSource('images/blueringplanet.png'),
    hoverblueringPlanet: new ImageSource('images/hoverblueringplanet.png'),
    brownPlanet: new ImageSource('images/brownplanet.png'),
    darkbluePlanet: new ImageSource('images/darkblueplanet.png'),
    lightbluePlanet: new ImageSource('images/lightblueplanet.png'),
    hoverlightbluePlanet: new ImageSource('images/hoverlightblueplanet.png'),
    orangePlanet: new ImageSource('images/orangeplanet.png'),
    hoverorangePlanet: new ImageSource('images/hoverorangeplanet.png'),
    recyclePlanet: new ImageSource('images/recycleplanet.png'),
    hoverrecyclePlanet: new ImageSource('images/hoverrecycleplanet.png'),
    redPlanet: new ImageSource('images/redplanet.png'),
    hoverredPlanet: new ImageSource('images/hoverredplanet.png'),
    salmonPlanet: new ImageSource('images/salmonplanet.png'),
    hoversalmonPlanet: new ImageSource('images/hoversalmonplanet.png'),
    Star: new ImageSource('images/star.png'),
    yellowringPlanet: new ImageSource('images/yellowringplanet.png'),
    hoveryellowringPlanet: new ImageSource('images/hoveryellowringplanet.png'),
    
}

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
  ResourceLoader.addResource(res);
}

//Background
Background: new ImageSource("images/background.png");

export { Resources, ResourceLoader };
