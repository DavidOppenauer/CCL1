import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class BlockObject extends BaseGameObject {

    moveWithPlayer = true;
    name = "Wall";

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/wall.png"]);
    }
}

export {BlockObject};