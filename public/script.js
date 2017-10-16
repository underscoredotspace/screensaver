let tri // globals are bad, but p5 kinda forces us to do this

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
    this.update()
  }

  update() {
    this.pos.forEach((pos, ndx) => {
      const speed = this.speed[ndx]
      if (pos.x <= 0 && speed.x <=0) {speed.x = rndPointP()}
      if (pos.y <= 0 && speed.y <=0) {speed.y = rndPointP()}
      if (pos.x >= windowWidth && speed.x >= 0) {speed.x = rndPointN()}
      if (pos.y >= windowHeight && speed.y >= 0) {speed.y = rndPointN()}

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

// called on every frame
function draw() {
  background(255)
  tri.draw()
}

// called once before anything
function setup() {
  createCanvas(windowWidth, windowHeight)
  noFill()
  // noSmooth()
  strokeWeight(2)
  stroke(0)
  tri = new Shape(3)
}

// called when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}