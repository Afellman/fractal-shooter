class Player {
    constructor(obj) {
        for (const key in obj) {
            this[key] = obj[key];
            if (key === "x" || key === "y") {
                this.position[key] = obj[key];
            }
        }
    }
    // Attributes
    isBoosting = false;
    boostFuel = 100;
    position = createVector(0, 0);
    speed = defaultSpeed;
    size = 0;
    image = null;
    bullets = [];

    // Methods
    draw() {
        this.drawBullets();
        this.drawBoostBar();
        image(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    /**
     * @param {boundries} boundries 
     */
    moveLeft(boundries) {
        if (this.position.x > boundries.left) {
            this.position.x -= this.speed;
        }
    }
    /**
   * @param {boundries} boundries 
   */
    moveUp(boundries) {
        if (this.position.y > -height / 2) {
            this.position.y -= this.speed;
        }
    }
    /**
   * @param {boundries} boundries 
   */
    moveRight(boundries) {
        if (this.position.x < boundries.right - this.size) {
            this.position.x += this.speed;
        }
    }
    /**
   * @param {boundries} boundries 
   */
    moveDown(boundries) {
        if (this.position.y < height / 2 - this.size) {
            this.position.y += this.speed;
        }
    }

    speedBoost(on) {
        if (on) {
            this.speed = boostSpeed;
            this.isBoosting = true;
        } else {
            this.isBoosting = false;
            this.speed = defaultSpeed;
        }
    }

    shoot() {
        this.bullets.push(new Bullet({
            image: instanceVars.images.playerBullet,
            startingPosition: this.position
        }))
    }

    drawBoostBar() {
        if (this.isBoosting) {
            this.boostFuel -= boostDrainSpeed;
            if (this.boostFuel <= 0) {
                this.speed = defaultSpeed;
                this.isBoosting = false;
            }
        } else if (this.boostFuel < 100) {
            this.boostFuel += boostRecoverSpeed
        }
    }

    drawBullets() {
        var bLen = this.bullets.length;

        for (let i = 0; i < bLen; i++) {
            var bb = this.bullets[i];
            if (bb) {
                bb.update();
                bb.draw();
                if (bb.checkForDestroy()) {
                    this.bullets = this.bullets.filter(bullet => bullet !== bb)
                }
            }
        }
    }
}