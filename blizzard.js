let agents = []
let count  = 100 

function setup() {
  createCanvas(400, 400)
  
  for( let i = 0; i < count; i++ ) {
    let agent = new Agent(x=random() * width-15, y=random() * height)
    agents.push(agent)
  }
  
  strokeWeight( 5 )
  stroke( 'white' )
  
  //frameRate(1)
}

function draw() {
  background( 0 )
    
  agents.forEach( a => {
    a.drawAgent()
    let direction = round(random())
    
    //let noiseLevel = 100;
    let noiseScale = 0.005;
    let nt = a.noiseScale * frameCount;
    
    //y - speed is constant (but random) for each snowflake
    a.y += a.speed
    if(a.y > height+25) {
      a.y = 0
    }
    
    //x - controlled by noise
    a.x += noise(nt)
    if(a.x > width) {
      a.x = -25
    }
    if(a.x < -25) {
      a.x = width
    }
  })
}

class Agent {
  
  constructor(x, y, speed, noiseLevel, noiseScale) {
    this.x = x
    this.y = y
    this.speed = random(0.30, 0.80)
    this.noiseLevel = random(0,600)
    this.noiseScale = random(0.01)
  }
  
  calculateNoise(frame) {
    let noiseLevel = width;
    let noiseScale = 0.005;
    let nt = noiseScale * frame;
    
    return noiseLevel * noise(this.x,this.y,nt)
  }
  
  drawAgent() {
    //point(this.x, this.y)
    textSize(20)
    text('❄️', this.x, this.y)
  }
}
