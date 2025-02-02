import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class PlayerHitbox extends BaseGameObject {

    moveWithPlayer = false;
    
    name = "PlayerHitbox"

    //empty draw function just to be sure
    draw = function(){
        //global.ctx.fillRect(this.x,this.y, this.width, this.height);
    }

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Spider" && global.hitBoxFlag == true) {
            
            //1. knockback
            collidingObject.x = collidingObject.previousX - collidingObject.xVelocity * 0.4;
            collidingObject.y = collidingObject.previousY - collidingObject.yVelocity * 0.4;
            //2. Dead
            collidingObject.enemyAI = false;
            collidingObject.hurtbox = false;
            global.hitBoxFlag = false;
        }
    }

    constructor (x, y, width, height) {
        super(x, y, width, height);

    }
}

export { PlayerHitbox };