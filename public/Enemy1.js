class Enemy1 {
    constructor(obj) {
        for (const key in obj) {
            this[key] = obj[key];
            if (key === "x" || key === "y") {
                this.position[key] = obj[key];
            }
        }
    }
    image = null;
    position = createVector(Math.random() * (width / 2) - (width / 4), Math.random() * (height / 2) - (height / 4));
    size = 30;

    draw() {
        image(this.image, this.position.x, this.position.y, this.size, this.size);
    }
}