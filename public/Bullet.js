class Bullet {
    constructor(obj) {
        for (const key in obj) {
            this[key] = obj[key];
            if (key === "x" || key === "y") {
                this.position[key] = obj[key];
            } else if (key === "startingPosition") {
                this.startingPosition = obj[key].copy()
                this.position = obj[key].copy();
            }
        }
    }
    speed = 3
    size = 15;
    startingPosition = createVector(0, 0)
    image = null;
    position = createVector(0, 0);

    draw() {
        image(this.image, this.position.x, this.position.y, this.size, this.size)
    }

    /**
     * 
     * @param {p5.Vector} playerPos player position vector
     */
    update() {
        this.position.y -= this.speed;
        this.checkForDestroy();
    }

    checkForDestroy() {
        if (this.position.x > width) return true;
        if (this.position.x < -width) return true;
        if (this.position.y > height) return true;
        if (this.position.y < -height) return true
        return false;
    }
}