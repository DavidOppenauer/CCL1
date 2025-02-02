import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class ExitObject extends BaseGameObject {

    moveWithPlayer = true;
    active = true;
    
    name = "Exit";

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Player" && global.KeyObjectCounter == 3) {
            
            global.playerObject.active = false;
            document.querySelector('.win').style.display = 'block';
            document.querySelector('#canvas').style.display = 'none';
        }
    }

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/door.png"]);
    }
}

export { ExitObject };