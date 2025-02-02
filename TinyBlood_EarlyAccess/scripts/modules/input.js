import { global } from "./global.js";

function move(event) {
    switch(event.key) {
        case "j":
            if (global.playerObject.xVelocity == 0) {
                global.playerObject.switchCurrentSprites(16, 19);
            }   
            global.hitBoxFlag = true;
            global.playerObject.xVelocity = 0;
            global.playerObject.yVelocity = 0;
            break;
        case "d":
            if (global.playerObject.xVelocity == 0) {
                global.playerObject.switchCurrentSprites(8, 11);
            }     
            global.playerObject.xVelocity = -500;
            global.playerObject.yVelocity = 0;
            break;
        case "a":
            if (global.playerObject.xVelocity == 0) {
                global.playerObject.switchCurrentSprites(12, 15);
            } 
            global.playerObject.xVelocity =500;
            global.playerObject.yVelocity = 0;
            break;
        // case "w":
        //     global.playerObject.setJumpForce(.8);
            break;
        case "w":
            if (global.playerObject.yVelocity == 0) {
                global.playerObject.switchCurrentSprites(4, 7);
            } 
            global.playerObject.xVelocity = 0;
            global.playerObject.yVelocity = 500;
            break;
        case "s":
            if (global.playerObject.yVelocity == 0) {
                global.playerObject.switchCurrentSprites(0, 3);
            }   
            global.playerObject.xVelocity = 0;
            global.playerObject.yVelocity = -500;
            break;
    }

}

function stop(event) {
    // global.enemyAI = true;
    
    switch(event.key) {
        case "j":
            global.hitBoxFlag = false;
            global.playerObject.xVelocity = 0;
            global.playerObject.yVelocity = 0;
            global.playerObject.switchCurrentSprites(0, 0);
        break;
        case "d":
            global.playerObject.xVelocity = 0;
            global.playerObject.switchCurrentSprites(8, 8);
            break;
        case "a":
            global.playerObject.xVelocity = 0;
            global.playerObject.switchCurrentSprites(12, 12);
            break;
        case "w":
            global.playerObject.yVelocity = 0;
            global.playerObject.switchCurrentSprites(4, 4);
            break;
        case "s":
            global.playerObject.yVelocity = 0;
            global.playerObject.switchCurrentSprites(0, 0);
            break;  
    }
}

document.addEventListener("keypress", move);

//if you just want to move as long as the player presses a key:
document.addEventListener("keyup", stop);



