import { Color } from "excalibur";
import { AlteredTrash } from "../leveltwo/alteredtrash";
import { Hook } from "../../actors/hook";
import { PlanetSpawner } from "../leveltwo/planetspawner";

export class LevelFiveTrash extends AlteredTrash {

  onCollisionStart(self, other) {

    if (other.owner instanceof PlanetSpawner) {

      const hook = this.scene.actors.find(
        a => a instanceof Hook
      );

      if (hook?.hasObject) {
        return;
      }

      this.kill();

      if (this.scene?.objective > 0) {
        this.scene.removeObjective();
      }

      return;
    }


    // IMPORTANT:
    // Keep the normal AlteredTrash behavior
    super.onCollisionStart(self, other);

  }


  setTargetTint(isTarget) {
    this.graphics.tint = isTarget ? Color.Yellow : Color.White;

    if (this.graphics.current) {
      this.graphics.current.tint =
        isTarget ? Color.Yellow : Color.White;
    }
  }

}