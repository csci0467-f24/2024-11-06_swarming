const boids = [];
const NUM_BOIDS = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < NUM_BOIDS; i++) {
    boids.push(new Boid(random(width), random(height), 5, 0.3));
  }
}

function draw() {
  background(255);


  // update positions and velocities and draw
  boids.forEach((boid) => {
    boid.update();
    boid.draw();
  });
}


class Boid {
  constructor(x, y, maxSpeed, maxForce) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxForce = maxForce;
    this.maxSpeed = maxSpeed;

    this.color = color(200);
  }

  

  applyForce(force) {
    this.acceleration.add(force);
  }

  /**
   * Update the position and wrap around if we go off the canvas
   */
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    if (this.position.x > width) {
      this.position.x -= width;
    }
    if (this.position.x < 0) {
      this.position.x += width;
    }

    if (this.position.y > height) {
      this.position.y -= height;
    }
    if (this.position.y < 0) {
      this.position.y += height;
    }
  }

  /**
   * Draw the boid
   */
  draw() {
    stroke(0);
    fill(this.color);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    triangle(-10, -5, -10, 5, 0, 0);
    pop();
  }
}
