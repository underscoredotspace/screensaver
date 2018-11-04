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
  if (this.update) {
    clearTimeout(this.update)
    this.update = null
  }
  this.update = setTimeout(() => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    this.update = null
  }, 500)
}

class Shape {
  constructor(context, points) {
    this.pos = []
    this.speed = []
    this.trails = []
    this.colour = 0

    this.context = context
    for (let v = 0; v < points; v++) {
      this.pos.push(
        createVector(
          random(0, window.innerWidth),
          random(0, window.innerHeight)
        )
      )
      this.speed.push(createVector(5, 5))
    }
  }

  _draw(pos = this.pos) {
    const context = this.context

    context.beginPath()
    for (let ndx in pos) {
      const p = pos[ndx]
      if (ndx === 0) {
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
    const [r, g, b] = hslToRgb(this.colour, 1, 0.5)
    context.strokeStyle = `rgb(${r}, ${g}, ${b})`
    this._draw()
    for (let ndx in this.trails) {
      const opacity = (1 / this.trails.length) * ndx
      const trail = this.trails[ndx]
      context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
      this._draw(trail)
    }
  }

  update() {
    for (let ndx in this.pos) {
      const speed = this.speed[ndx]
      const pos = this.pos[ndx]

      if (pos.x <= 0 && speed.x <= 0) {
        speed.x = random(1, 5)
      } // Left
      if (pos.y <= 0 && speed.y <= 0) {
        speed.y = random(1, 5)
      } // Top
      if (pos.x >= window.innerWidth && speed.x >= 0) {
        speed.x = random(-5, 1)
      } // Right
      if (pos.y >= window.innerHeight && speed.y >= 0) {
        speed.y = random(-5, 1)
      } // Bottom

      pos.add(speed)
    }

    let trail = []
    for (let pos of this.pos) {
      trail.push({ x: pos.x, y: pos.y })
    }
    this.trails.push(trail)
    if (this.trails.length >= 200) {
      this.trails = this.trails.slice(this.trails.length - 199, 200)
    }

    this.colour += 1 / 360 / 10
    if (this.colour >= 1) {
      this.colour = 0
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

  const poly = new Shape(context, 3)
  draw(poly, context)
}

let lastFrame

// called on every frame
function draw(poly, context) {
  requestAnimationFrame(() => {
    draw(poly, context)

    context.fillStyle = 'black'
    context.fillRect(0, 0, window.innerWidth, window.innerHeight)
    poly.draw()
    poly.update()
  })
}

start()

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation [r, g, b]
 */
function hslToRgb(h, s, l) {
  var r, g, b

  if (s == 0) {
    r = g = b = l // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}
