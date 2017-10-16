let tri

class Shape {
  constructor(points) {
    this.pos = []
    this.speed = []
    for (let v = 0; v < points; v++) {
      this.pos.push(createVector(random(windowWidth), random(windowHeight)))
      this.speed.push(this.rv())
    }
  }

  draw() {
    beginShape()
    this.pos.forEach(pos => {
      vertex(pos.x, pos.y)
    })
    endShape(CLOSE)
  }

  move() {
    this.pos.forEach((pos, ndx) => {
      const speed = this.speed[ndx]
      if (pos.x <= 0 && speed.x <=0) {speed.x = this.rxyP()}
      if (pos.y <= 0 && speed.y <=0) {speed.y = this.rxyP()}
      if (pos.x >= windowWidth && speed.x >= 0) {speed.x = this.rxyN()}
      if (pos.y >= windowHeight && speed.y >= 0) {speed.y = this.rxyN()}

      pos.add(speed)
    })
  }

  rv() {
    const v = createVector(floor(random(-10, 10)), floor(random(-10, 10)))
    if (v.x === 0) {v.x = 1}
    if (v.y === 0) {v.y = -1}
    return v
  }

  rxyP() {
    return floor(random(1, 10))
  }

  rxyN() {
    return floor(random(-10, 1))
  }
}

function draw() {
  background(0)
  tri.draw()
  tri.move()
}

function setup() {
  // frameRate(30)
  colorMode(HSB)
  createCanvas(windowWidth, windowHeight)
  noFill()
  noSmooth()
  strokeWeight(0.5)
  stroke('white')
  tri = new Shape(3)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}