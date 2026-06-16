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
  StartsceneLabel: new ImageSource('images/startsceneLabel.png'),
  Greenbutton: new ImageSource('images/greenbutton.png'),
  GreenbuttonHover: new ImageSource('images/greenbuttonhover.png'),
}

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
  ResourceLoader.addResource(res);
}

//Background
Background: new ImageSource("images/background.png");

export { Resources, ResourceLoader };
