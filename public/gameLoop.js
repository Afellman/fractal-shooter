function draw() {
    const { map, player, enemies } = instanceVars;
    const enemiesLen = enemies.length;

    background(bgColor)
    translate(width / 2, height / 2);

    // Draw objects
    map.draw(player.position);
    player.draw();
    for (let i = 0; i < enemiesLen; i++) {
        enemies[i].draw();
    }

    // Global UI
    drawBoostBar();

    // Checks
    checkKeyPress();
    checkCollisions(player, map);


    if (instanceVars.time % 50 === 0) {
        createEnemy1();
    }
    increaseTime();
}