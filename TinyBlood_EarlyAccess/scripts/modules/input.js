import { global } from "./global.js";

const keys = {
    w: false,
    a: false,
    s: false,
    d: false
};

function applyMovementFromKeys() {
    const player = global.playerObject;
    if (!player || !player.switchCurrentSprites) return;

    // Do not overwrite the attack animation while attacking
    if (global.hitBoxFlag) return;

    if (keys.d) {
        // Player appears to move right because the world moves left
        player.xVelocity = -500;
        player.yVelocity = 0;
        player.switchCurrentSprites(8, 11);
    } else if (keys.a) {
        // Player appears to move left because the world moves right
        player.xVelocity = 500;
        player.yVelocity = 0;
        player.switchCurrentSprites(12, 15);
    } else if (keys.w) {
        player.xVelocity = 0;
        player.yVelocity = 500;
        player.switchCurrentSprites(4, 7);
    } else if (keys.s) {
        player.xVelocity = 0;
        player.yVelocity = -500;
        player.switchCurrentSprites(0, 3);
    } else {
        player.xVelocity = 0;
        player.yVelocity = 0;

        // stay on the first frame of the current direction
        player.switchCurrentSprites(
            player.animationData.firstSpriteIndex,
            player.animationData.firstSpriteIndex
        );
    }
}

function move(event) {
    const key = event.key.toLowerCase();

    if (event.repeat) return;

    if (key === "j") {
        global.hitBoxFlag = true;
        global.playerObject.xVelocity = 0;
        global.playerObject.yVelocity = 0;
        global.playerObject.switchCurrentSprites(16, 19);
        return;
    }

    if (!(key in keys)) return;

    keys[key] = true;
    applyMovementFromKeys();
}

function stop(event) {
    // global.enemyAI = true;
    
    const key = event.key.toLowerCase();

    if (key === "j") {
        global.hitBoxFlag = false;

        // force a clean reset after attack
        keys.w = false;
        keys.a = false;
        keys.s = false;
        keys.d = false;

        global.playerObject.xVelocity = 0;
        global.playerObject.yVelocity = 0;
        global.playerObject.switchCurrentSprites(0, 0);
        return;
    }

    if (!(key in keys)) return;

    keys[key] = false;
    applyMovementFromKeys();
}

document.addEventListener("keydown", move);
//just want to move as long as the player presses a key:
document.addEventListener("keyup", stop);