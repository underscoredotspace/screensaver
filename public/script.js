let tri

class Shape {
  constructor(x0, y0, x1, y1, x2, y2) {
    this.pos = [createVector(x0, y0), createVector(x1, y1), createVector(x2, y2)]
    this.speed = [this.rv(), this.rv(), this.rv()]
  }

  draw() {
    triangle(this.pos[0].x,this.pos[0].y,this.pos[1].x,this.pos[1].y,this.pos[2].x,this.pos[2].y)
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
    if (v.y === 0) {v.y = 1}
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
  tri = new Shape()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}