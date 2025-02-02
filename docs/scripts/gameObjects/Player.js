import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Player extends BaseGameObject {
    name = "Player";
    moveWithPlayer = false;
    active = true;

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.2,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };

    getBoxBounds = function () {
        let bounds = {
            left: this.x + 18,
            right: this.x + this.width - 22,
            top: this.y,
            bottom: this.y + this.height
        }
        return bounds;
    }

    update = function() {
        global.allGameObjects.forEach(gameObject => {
            if(gameObject.moveWithPlayer === true) {
                gameObject.x += this.xVelocity * global.deltaTime;
                gameObject.y += this.yVelocity * global.deltaTime;
            }
        });
    }

    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Wall") {
            this.xVelocity = 0;
            this.yVelocity = 0;
            global.playerObject.switchCurrentSprites(this.animationData.firstSpriteIndex+1, this.animationData.firstSpriteIndex+1);
            global.allGameObjects.forEach(gameObject => {
                if(gameObject.name == "Wall" || gameObject.name == "Map" || gameObject.name == "Spider" || gameObject.name == "Key" || gameObject.name == "Exit") {
                    gameObject.x = gameObject.previousX;
                    gameObject.y = gameObject.previousY;
                }
            });
        }
        if (collidingObject.name == "Spider" && global.timeSinceDamageTaken >= 2) {
            global.playerHealth = global.playerHealth - 1;
            global.timeSinceDamageTaken = 0;

            if(global.playerHealth == 2) {
                global.heart_3.dead = true;
            }
            else if(global.playerHealth == 1) {
                global.heart_2.dead = true;
            }
            else if(global.playerHealth == 0) {
                global.heart_1.dead = true;
                this.active = false;
                document.querySelector('.gameOver').style.display = 'block';
                document.querySelector('#canvas').style.display = 'none';
            }
        }
    }
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/Player.png", 4, 5);
    }
}

export { Player }