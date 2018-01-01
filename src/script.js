import 'p5'

class Shape {
  constructor(points) {
    this.pos = []
    this.speed = []
    for (let v = 0; v < points; v++) {
      this.pos.push(createVector(random(windowWidth), random(windowHeight)))
      this.speed.push(rndVector())
    }
  }

  draw() {
    beginShape()
    this.pos.forEach(pos => {
      vertex(pos.x, pos.y)
    })
    endShape(CLOSE)
  }

  update() {
    this.pos.forEach((pos, ndx) => {
      const speed = this.speed[ndx]
      if (pos.x <= 0 && speed.x <=0) {speed.x = rndPointP()} // Left
      if (pos.y <= 0 && speed.y <=0) {speed.y = rndPointP()} // Top
      if (pos.x >= windowWidth && speed.x >= 0) {speed.x = rndPointN()} // Right
      if (pos.y >= windowHeight && speed.y >= 0) {speed.y = rndPointN()} // Bottom

      pos.add(speed)
    })
  }
}

/* 
// My vector helper functions 
*/

// Returns random vector between [-5,-5] and [5,5] 
function rndVector() {
  const v = createVector(floor(random(-5, 5)), floor(random(-5, 5)))
  if (v.x === 0) {v.x = 1}
  if (v.y === 0) {v.y = -1}
  return v
}


function rndPointP() {
  return floor(random(1, 5))
}

function rndPointN() {
  return floor(random(-5, 1))
}

/* 
// p5 built-in functions
*/

// called once before anything
window.setup = function setup() {
  createCanvas(windowWidth, windowHeight)
  noFill()
  noSmooth()
  strokeWeight(2)
  stroke(0)
  window.poly = new Shape(3)
}

// called on every frame
window.draw = function draw() {
  background(255)
  window.poly.draw()
  window.poly.update()
}

// called when window is resized
window.windowResized = function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}