// Initial Values ==============================================================

// General
let bgColor = [255, 255, 255];
let colors = {
    orange: "#D38B20",
    blueMid: "#2A6DBD",
    blueLight: "#63AFC1",
    brownLight: "#86521F",
    white: "#E5E4CE",
    black: "#0D0F0D",
    red: "#C32E08",
    greenLight: "#486A3B",
    blueDark: "#203363",
    brownDark: "#4E2D12",
    yellow: "#EADD5D",
    greenDar: "#213D1EZ"
}

// Map
let mapSpeed = 5;
// Player
let playerSize = 30;
let defaultSpeed = 5;
let boostSpeed = 15;
let boostDrainSpeed = 1;
let boostRecoverSpeed = 0.5;

const instanceVars = {
    time: 0,
    /** @type {Player} */
    player: null,
    enemies: [],
    /** @type {GameMap} */
    map: null,
    images: {
        player: null,
        enemies: [],
        playerBullet: null
    }
}

// General Functions ===========================================================

function preload() {
    instanceVars.images.player = loadImage("/assets/images/player.png");
    instanceVars.images.playerBullet = loadImage("/assets/images/bullet.png");
    instanceVars.images.enemies.push(loadImage("/assets/images/enemy1.png"));
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    instanceVars.player = new Player({ image: instanceVars.images.player, size: playerSize });
    instanceVars.map = new GameMap();
}

function increaseTime() {
    instanceVars.time += 1;
}

function createEnemy1() {
    // instanceVars.enemies.push(new Enemy1({ image: instanceVars.images.enemies[0] }));
}

function checkCollisions(player, map, objects) {
    // // Objects not yet used
    // const objectLen = objects.length;
    // let thisObj = objects[0];

    // for (let i = 0; i < objectLen; i++) {
    // }


}

// Global Graphics =============================================================

function drawBoostBar() {
    push();
    stroke("black");
    rect(-width / 2 + 10, -height / 2 + 10, 100, 15);
    fill("green");
    rect(-width / 2 + 10, -height / 2 + 10, instanceVars.player.boostFuel, 15);
    pop();
}

// Events ======================================================================
function checkKeyPress() {
    const { player, map } = instanceVars;
    if (keyIsDown(LEFT_ARROW)) {
        player.moveLeft(map.boundries);
    } if (keyIsDown(RIGHT_ARROW)) {
        player.moveRight(map.boundries);
    } if (keyIsDown(UP_ARROW)) {
        player.moveUp(map.boundries);
    } if (keyIsDown(DOWN_ARROW)) {
        player.moveDown(map.boundries);
    }
}

function keyPressed(value) {
    if (value.key === " ") {
        instanceVars.player.shoot();
    }
    if (value.key === "Shift") {
        instanceVars.player.speedBoost(true);
    }
}

function keyReleased(value) {
    if (value.key === "Shift") {
        instanceVars.player.speedBoost(false);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}



