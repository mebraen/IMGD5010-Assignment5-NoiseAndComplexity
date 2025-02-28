let snowflakes = []
let count  = 100
let prevMouseX = -1
let prevMouseY = -1
let windSpeed = 0

function setup() {
  createCanvas(400, 400)
  
  //initialize snowflakes
  for( let i = 0; i < count; i++ ) {
    let snowflake = new Snowflake(x=random() * width-15, y=random() * height)
    snowflakes.push(snowflake)
  }
  
}

function draw() {
  background( 0 )
    
  snowflakes.forEach( s => {
    
    //noiseScale is random for each snowflake
    let nt = s.noiseScale * frameCount;
    
    //x - controlled by noise and wind-speed
    // wind-speed is controllable by mouse
    s.x += windSpeed + noise(nt)
    if(s.x > width) {
      s.x = -25
    }
    if(s.x < -25) {
      s.x = width
    }
    
    //y - speed is constant (but random) for each snowflake
    // speed is controllable by mouse
    s.y += s.speed
    if(s.y > height+25) {
      s.y = 0
    }
    
    s.drawSnowflake()
  })
}

class Snowflake {
  
  constructor(x, y, speed, noiseScale, size) {
    this.x = x
    this.y = y
    this.speed = random(0.30, 0.80)
    this.noiseScale = random(0.05)
    this.size = random(12,25)
  }
  
  drawSnowflake() {
    textSize(this.size)
    text('❄️', this.x, this.y)
  }
}

function mousePressed() {
  prevMouseY = mouseY
  prevMouseX = mouseX
}

function mouseDragged() {
  
  //dragging mouse up/down increases/decreases speed snowflakes fall
  if(prevMouseY != -1) {
    if(mouseY < prevMouseY) {
      snowflakes.forEach(s => {
        if(s.speed > 0.2) {
          s.speed-=0.02
        }
      })
    }
    else {
      snowflakes.forEach(s => {
        s.speed+=0.02
      })
    }
  }
  
  //dragging mouse right/left increases/decreases wind speed and direction
  if(prevMouseX != -1) {
    if(mouseX < prevMouseX) {
      windSpeed-=0.03
    }
    else {
      windSpeed+=0.03
    }
  }
  
  prevMouseX = mouseX
  prevMouseY = mouseY
  
}

function mouseReleased() {
  prevMouseY = -1
  prevMouseX = -1
}

