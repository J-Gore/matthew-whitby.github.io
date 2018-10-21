var lasers = [];

function setup(){
  createCanvas(windowWidth,windowHeight);
  colorMode(HSB);
  stroke(255);
  strokeWeight(4);
  background(0);
}

function draw() {
  if(random(1) < 0.1){
    let sx;
    let ex;
    let sy;
    let ey;
    let num = (random(1));
    console.log(num);
    let dir = (random(1) > 0.5) ? 1 : -1;
    if(dir == 1){ //create 'vertical laser'
    console.log(dir);
      sx = Math.round(random(windowWidth));
      ex = Math.round(random(windowWidth));
      sy = -100;
      ey = -100;
    }else{ //create 'horizontal laser'
    sy = Math.round(random(windowHeight));
    ey = Math.round(random(windowHeight));
    sx = -100;
    ex = -100;
    }
    lasers.push(new Laser(sx,ex,sy,ey));
  }
    for (var i = lasers.length - 1; i >= 0; i--) {
      //lasers[i].update();
      lasers[i].render();
      if(lasers[i].done()){
        lasers.splice(i,1);
      }
  }
}
