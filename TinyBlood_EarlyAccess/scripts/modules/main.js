import { global } from "./global.js";
import { Player} from "../gameObjects/Player.js";
import { BlockObject } from "../gameObjects/blockObject.js";
import { MapObject } from "../gameObjects/mapObject.js";
import { Spider } from "../gameObjects/spiderObjects.js";
import { PlayerHitbox } from "../gameObjects/playerHitbox.js";
import { KeyObject } from "../gameObjects/keyObject.js";
import { ExitObject } from "../gameObjects/exitObject.js";
import { HeartObject } from "../gameObjects/playerHeart.js";


function gameLoop(totalRunningTime) {
    global.timeSinceDamageTaken += global.deltaTime; // This is a counter to make the player only hurtable 2 seconds after beeing hit
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 
    for (let phase = 0; phase < 4; phase++) {//phase 0 store positions    phase 1 update objects     phase 2 collision detection positions     phase 3 applyGravity & draw
        for (var i = 0; i < global.allGameObjects.length; i++) { //loop in the (game)loop -> the gameloop is continous anyways.. and on every cylce we do now loop through all objects to execute several operations (functions) on each of them: update, draw, collision detection, ...
            if (global.allGameObjects[i].active == true) {
                if (phase == 0) {
                    global.allGameObjects[i].storePositionOfPreviousFrame();
                }
                else if (phase == 1) {
                    global.allGameObjects[i].update();
                }
                else if (phase == 2) {
                    global.checkCollisionWithAnyOther(global.allGameObjects[i]);
                }
                else if (phase == 3) {
                    global.allGameObjects[i].draw();
                }

            }
        }
    }    
    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}

function setupGame() {
    global.map = new MapObject(0, 0, 3000, 3000);
    global.playerObject = new Player(512, 512, 64, 64);
    global.playerHitbox = new PlayerHitbox (512, 512, 100, 100);
    
    let blockMap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 2, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 2, 1],
        [1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 2, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0, 2, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 3, 1],
        [1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 2, 1],
        [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 3, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [1, 4, 0, 2, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 2, 0, 1, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 2, 1],
        [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 0, 0, 0, 0, 2, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 0, 0, 0, 2, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    for (let i = 0; i < blockMap.length; i++) {
        let innerArray = blockMap[i];
        for (let j = 0; j < innerArray.length; j++) {
            if (innerArray[j] == 1) {
                new BlockObject(j * 100 + 400, i * 100 + 400, 100, 100);
            }
            else if (innerArray[j] == 2) {
                new Spider (j * 100 + 412, i * 100 + 412, 64, 64);
            }
            else if (innerArray[j] == 3) {
                new KeyObject (j * 100 + 400, i * 100 + 400, 100, 100);
                console.log("Key created!")
            }
            else if (innerArray[j] == 4) {
                new ExitObject (j * 100 + 400, i * 100 + 400, 100, 100);
            }
        }
    }

    global.heart_1 = new HeartObject(0, 0, 100, 100);
    global.heart_2 = new HeartObject(100, 0, 100, 100);
    global.heart_3 = new HeartObject(200, 0, 100, 100);
    
   requestAnimationFrame(gameLoop);
}

//Menu Setup

document.getElementById('startButton').addEventListener('click', (e) => {
    setupGame();
    document.querySelector('#canvas').style.display = 'block';
    document.querySelector('.start').style.display = 'none';
});

document.getElementById('restartButton').addEventListener('click', (e) => {
    location.reload();
});

document.getElementById('wooHooButton').addEventListener('click', (e) => {
    location.reload();
});