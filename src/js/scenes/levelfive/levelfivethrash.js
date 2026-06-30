import { Color } from "excalibur";
import { Trash } from "../../objects/trash";
import { Hook } from "../../actors/hook";
import { PlanetSpawner } from "../leveltwo/planetspawner";

export class LevelFiveTrash extends Trash {
  isTarget = false;

  onCollisionStart(self, other) {
    if (other.owner instanceof PlanetSpawner) {
      if (this.scene?.isPaused) {
        return;
      }

      // Ignore normal trash
      if (!this.isTarget) {
        return;
      }

      // Planet invincible
      if (this.scene.planetInvincible) {
        return;
      }

      const hook = this.scene.actors.find((a) => a instanceof Hook);

      if (hook?.hasObject) {
        return;
      }

      const scene = this.scene;

      if (!scene) return;

      scene.ui.healthBar.decrease();

      scene.planetInvincible = true;

      this.kill();

      setTimeout(() => {
        scene.planetInvincible = false;
      }, 5000);

      return;
    }

    super.onCollisionStart(self, other);
  }

  setTargetTint(isTarget) {
    this.isTarget = isTarget;

    this.graphics.tint = isTarget ? Color.Yellow : Color.White;

    if (this.graphics.current) {
      this.graphics.current.tint = isTarget ? Color.Yellow : Color.White;
    }
  }
}
