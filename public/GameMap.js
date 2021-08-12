
class GameMap {
    constructor(obj) {
        for (const i in obj) {
            this[i] = obj[i];
        }
        this.stripeWidth = this.boundries.right - this.boundries.left;
    }

    stripeWidth = 0
    stripeHeight = 20;
    startingAngle = 0;
    angle = 1.3;
    divider = 0.80;
    length = 100;
    movement = 0.01;
    divisions = 7;
    spacing = 2
    /** @type {boundries} */
    boundries = { left: - width * 0.2, right: width * 0.2 }
    /** @type {Array<{x, y}>} */
    stripes = [];

    draw() {
        this.drawBoundries();
        this.drawStripes();
        // this.drawFractal();

        if (frameCount % 100 === 0) {
            this.stripes.push(createVector(this.boundries.left, - height / 2))
        }
    }

    drawStripes() {
        const stripesLen = this.stripes.length;
        let thisStripe = this.stripes[0];

        push()
        fill(colors.brownLight)
        noStroke();
        // Double ii is cooler than single
        for (let ii = 0; ii < stripesLen; ii++) {
            thisStripe = this.stripes[ii];
            if (!thisStripe) continue
            rect(thisStripe.x, thisStripe.y, this.stripeWidth, this.stripeHeight);
            thisStripe.y += mapSpeed;
            if (thisStripe.y > height / 2) {
                this.stripes = this.stripes.filter((stripe) => stripe !== thisStripe)
            }
        }
        pop();
    }

    drawBoundries() {
        const { left, right } = this.boundries;
        push();
        fill(colors.orange);
        rect(left, -height / 2, -15, height)
        rect(right, -height / 2, 15, height)
        pop();
    }

    drawFractal() {
        push()
        noStroke();
        fill(200, 50, 200, 30)
        translate(0, height / 2)
        this.branch(this.length, 0);
        pop();
    }

    branch(len, i) {
        i++;
        ellipse(10, 10, len, -len);
        translate(0, -len * this.spacing);
        if (i < this.divisions) {
            push();
            rotate(this.angle);
            this.branch(len * this.divider, i);
            pop();
            push();
            rotate(noise(frameCount * this.movement * i / 10, frameCount * this.movement * i / 10) - this.angle);
            this.branch(len * this.divider, i);
            pop();
        }
    }
}

/** @typedef {{left: number, right: number}} boundries */