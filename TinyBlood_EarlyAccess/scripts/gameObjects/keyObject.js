import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class KeyObject extends BaseGameObject {
    moveWithPlayer = true;
    active = true;
    
    name = "Key";

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Player") {    
            global.KeyObjectCounter++;
            this.active = false;
        }
    }

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/key.png"]);
    }
}

export { KeyObject };