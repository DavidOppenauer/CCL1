import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class MapObject extends BaseGameObject {
    moveWithPlayer = true;
    name = "Map";

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/map.png"]);
    }
}

export { MapObject };