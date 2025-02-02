import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class HeartObject extends BaseGameObject {
    moveWithPlayer = false;
    active = true;

    dead = false;
    
    name = "Heart";

    draw = function ()  {
        if (this.dead == false) {
            let sprite = this.getNextSprite();
            global.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
        }
        else {
            const bloodSplatter = document.getElementById("BloodSplatterLazy");
            global.ctx.drawImage(bloodSplatter, this.x, this.y, this.width, this.height);
        }
    }


    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/heart.png"]);
    }
}

export { HeartObject };