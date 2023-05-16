let fishes = [];

function setup() {
  createCanvas(1000, 1000);
  
  // Create multiple fish
  for (let i = 0; i < 400; i++) {
    let fish = new Fish();
    fishes.push(fish);
  }
}

function draw() {
  background(220);
  
  for (let i = 0; i < fishes.length; i++) {
    fishes[i].update();
    fishes[i].display();
  }
}

class Fish {
    constructor() {
      this.position = createVector(random(width), random(height));
      this.velocity = p5.Vector.random2D();
      this.maxSpeed = random(1, 4);
      this.size = random(5, 10);
    }
    
    update() {
        let mouse = createVector(mouseX, mouseY);
        let dir;
        
        if (dist(this.position.x, this.position.y, mouse.x, mouse.y) < 300) {
          dir = p5.Vector.sub(this.position, mouse); // Calculate the direction away from the cursor
        } else {
          dir = this.velocity.copy(); // Use the current velocity if the fish is far from the cursor
        }
        
        dir.normalize();
        dir.mult(0.5); // Adjust avoidance speed
        
        this.velocity.add(dir);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        // Wrap around canvas edges
        if (this.position.x > width-100) {
          this.position.x = 100;
        } else if (this.position.x < 100) {
          this.position.x = width - 100;
        }
        if (this.position.y > height - 100) {
          this.position.y = 100;
        } else if (this.position.y < 100) {
          this.position.y = height - 100;
        }
      }
    
    display() {
      push();
      translate(this.position.x, this.position.y);
      rotate(this.velocity.heading() + PI / 2);
      
      fill(255);
      stroke(0);
      beginShape();
      vertex(0, -this.size);
      vertex(-this.size / 2, 0);
      vertex(-this.size / 4, this.size / 2);
      vertex(this.size / 4, this.size / 2);
      vertex(this.size / 2, 0);
      endShape(CLOSE);
      pop();
    }
  }
