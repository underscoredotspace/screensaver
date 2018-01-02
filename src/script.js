const createVector = (x, y) => new Vector(x, y)
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

class Vector {
  
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  
  add(v) {
    this.x += v.x
    this.y += v.y
  }
}

function resizeCanvas(canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

class Shape {
  constructor(context, points) {
    this.pos = []
    this.speed = []
    this.trails = []

    this.context = context
    for (let v = 0; v < points; v++) {
      this.pos.push(createVector(random(0,window.innerWidth), random(0,window.innerHeight)))
      this.speed.push(createVector(5, 5))
    }
  }

  _draw(pos = this.pos) {
    const context = this.context

    context.beginPath()
    for(let ndx in pos) {
      const p = pos[ndx]
      if(ndx === 0) {
        context.moveTo(p.x, p.y) 
      } else {
        context.lineTo(p.x, p.y)
      }
    }

    context.closePath()
    context.stroke()
  }

  draw() {
    const context = this.context
    this._draw()
    for (let trail of this.trails) {
      this._draw(trail)
    }
  }

  update() {
    for (let ndx in this.pos) {
      const speed = this.speed[ndx]
      const pos = this.pos[ndx]

      if (pos.x <= 0 && speed.x <=0) {speed.x = random(1, 5)} // Left
      if (pos.y <= 0 && speed.y <=0) {speed.y = random(1, 5)} // Top
      if (pos.x >= window.innerWidth && speed.x >= 0) {speed.x = random(-5, 1)} // Right
      if (pos.y >= window.innerHeight && speed.y >= 0) {speed.y = random(-5, 1)} // Bottom

      pos.add(speed)
    }

    let trail = []
    for (let pos of this.pos) {
      trail.push({...pos})
    }
    this.trails.push(trail)
    if(this.trails.length >= 200) {
      this.trails = this.trails.slice(this.trails.length-199, 200)
    }
  }
}

// called once before anything
function start() {
  const canvas = document.getElementById('screen')
  resizeCanvas(canvas)

  const context = canvas.getContext('2d')
  context.strokeStyle = 'white'

  // called when window is resized
  window.addEventListener('resize', () => resizeCanvas(canvas))

  const poly = new Shape(context, 4)
  draw(poly, context)
}

let lastFrame

// called on every frame
function draw(poly, context) {
  requestAnimationFrame(() => {  
    draw(poly, context)
    
    const now = performance.now()
    if ((now - lastFrame) < (1000/40)) {return}

    context.fillStyle="black"
    context.fillRect(0,0,window.innerWidth, window.innerHeight)
    poly.draw()
    poly.update()
    lastFrame = now
  })

}

start()