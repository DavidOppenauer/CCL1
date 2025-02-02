import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Spider extends BaseGameObject {
    enemyAI = true;
    moveWithPlayer = true;
    name = 'Spider';
    xVelocity = 50;
    yVelocity = 0;
    direction = "";
    
    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };

    getBoxBounds = function () {
        let bounds = {
            left: this.x + 18,
            right: this.x + this.width - 22,
            top: this.y + 14,
            bottom: this.y + this.height - 3
        }
        return bounds;
    }

    draw = function ()  {
        if (this.enemyAI == true) {
            let sprite = this.getNextSprite();
            global.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
        }
        else {
            const bloodSplatter = document.getElementById("BloodSplatterLazy");
            global.ctx.drawImage(bloodSplatter, this.x, this.y, this.width, this.height);
        }
    }
    randomMovementData = {
       "timeToChangeDirection": 6,
       "currentDirectionElapsedTime": 0,
       "movementChangePossibilityStartValue": 0.1,
       "movementChangePossibility": 0.1,
       "movementChangePossibilitySteps": 0.02,
       "movementChangeOppositePossibility": 0.3
    };

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.2,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };

    update = function () {
        if (this.enemyAI === true) {
            this.randomMovementData.currentDirectionElapsedTime += global.deltaTime;

            if (this.randomMovementData.currentDirectionElapsedTime >= this.randomMovementData.timeToChangeDirection) {
                this.randomizeMovement();
                this.randomMovementData.currentDirectionElapsedTime = 0;
            }

            this.x += this.xVelocity * global.deltaTime;
            this.y += this.yVelocity * global.deltaTime;
            
            let currentDirection = "";

            if (this.xVelocity < 0 && this.yVelocity == 0) {
                currentDirection = "right";
                console.log(currentDirection);
            }
            else if (this.xVelocity > 0 && this.yVelocity == 0) {
                currentDirection = "left";
                console.log(currentDirection);
            }
            else if (this.xVelocity == 0 && this.yVelocity < 0) {
                currentDirection = "up";
                console.log(currentDirection);
            }
            else if (this.xVelocity == 0 && this.yVelocity > 0) {
                currentDirection = "down";
                console.log(currentDirection);
            }
            
            switch(currentDirection) {

                case "right":
                    this.switchCurrentSprites(8, 11);
                    break;
                case "left":
                    this.switchCurrentSprites(12, 15);
                    break;
                case "up":
                    this.switchCurrentSprites(4, 7);
                    break;
                case "down":   
                    this.switchCurrentSprites(0, 3);
                    break;
            }

            //depending on the velocity set the variable currentDirection
            //if currentDirection is different from this.direction then set the animation according to the new direction
            // e.g.         this.switchCurrentSprites(0, 3); when it walks down 
            // and additionally (still if currentCirection is differentFrom this.direction... so the same if statement) set this.direction = currentDirection

            // console.log("enemy should move")
        }
    }

    randomizeMovement() {
        const shouldChange = Math.random();
        if (shouldChange > this.randomMovementData.movementChangePossibility) {
            this.changeMovement();
            this.randomMovementData.movementChangePossibility = this.randomMovementData.movementChangePossibilityStartValue;
        } else {
            this.randomMovementData.movementChangePossibility += this.randomMovementData.movementChangePossibilitySteps;
        }
    }

    changeMovement() {
        const shouldGoOpposite = Math.random();
        if (shouldGoOpposite < this.randomMovementData.movementChangeOppositePossibility) {
            this.xVelocity *= -1;
            this.yVelocity *= -1;
        } else {
            const makePositive = Math.random();
            if (this.xVelocity !== 0) {
                this.yVelocity = 200 * (makePositive > 0.5 ? 1 : -1);
                this.xVelocity = 0;
            } else if (this.yVelocity !== 0) {
                this.xVelocity = 200 * (makePositive > 0.5 ? 1 : -1);
                this.yVelocity = 0;
            }
        }
    }

    // screenWrap() {
    //     const canvasBounds = global.getCanvasBounds();
    //     const bounds = this.getBoxBounds();
    //     if (bounds.left >= canvasBounds.right) {
    //         this.x = canvasBounds.left - this.width;
    //     } else if (bounds.right <= canvasBounds.left) {
    //         this.x = canvasBounds.right;
    //     } else if (bounds.bottom <= canvasBounds.top) {
    //         this.y = canvasBounds.bottom;
    //     } else if (bounds.top >= canvasBounds.bottom) {
    //         this.y = canvasBounds.top - this.height;
    //     }
    // }

    reactToCollision = function (collidingObject) {
        if (collidingObject.name === "Wall") {
            // console.log(collidingObject);
            this.x = this.previousX + global.playerObject.xVelocity * global.deltaTime;
            this.y = this.previousY + global.playerObject.yVelocity * global.deltaTime;

            //this.x = this.previousX - 0.01 * this.xVelocity;
            // this.y = this.previousY - 0.01 * this.yVelocity;
            const originalProbability = this.randomMovementData.movementChangeOppositePossibility;
            this.randomMovementData.movementChangeOppositePossibility = 0;
            this.changeMovement();
            this.randomMovementData.movementChangeOppositePossibility = originalProbability;
        }
    }

    constructor(x, y, width, height, name) {
        super (x, y, width, height, name);
        this.loadImagesFromSpritesheet("./images/Spider.png", 4, 4);
        this.switchCurrentSprites(0, 3);
    }
}

export { Spider }