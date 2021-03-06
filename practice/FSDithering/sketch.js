let picture;

function preload(){picture=loadImage("cutepig.jpg");}

function setup(){
  let canvas=createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  image(picture,0,0);
  makeDithered(picture,1);
  image(picture,picture.width,0);
}

function getColorAtindex(img,x,y){
  let idx=4*(x+y*img.width);
  let pix=img.pixels;
  let red=pix[idx];
  let green=pix[idx+1];
  let blue=pix[idx+2];
  let alpha=pix[idx+3];
  return color(red,green,blue,alpha);
}

function setColorAtIndex(img,x,y,clr){
  let idx=4*(x+y*img.width);
  img.pixels[idx]=red(clr);
  img.pixels[idx+1]=green(clr);
  img.pixels[idx+2]=blue(clr);
  img.pixels[idx+3]=alpha(clr);
}

function closestStep(max,steps,value){return round(steps*value/255)*floor(255/steps);}

function makeDithered(img,steps){
  img.loadPixels();
  for(let y=0;y<img.height;y++){
    for(let x=0;x<img.width;x++){
      let clr=getColorAtindex(img,x,y);
      let oldR=red(clr);
      let oldG=green(clr);
      let oldB=blue(clr);
      let newR=closestStep(255,steps,oldR);
      let newG=closestStep(255,steps,oldG);
      let newB=closestStep(255,steps,oldB);
      let newClr=color(newR,newG,newB);
      setColorAtIndex(img,x,y,newClr);
      let errR=oldR-newR;
      let errG=oldG-newG;
      let errB=oldB-newB;
      distributeError(img,x,y,errR,errG,errB);
    }
  }
  img.updatePixels();
}

function distributeError(img,x,y,errR,errG,errB){
  addError(img,7/16.0,x+1,y,errR,errG,errB);
  addError(img,3/16.0,x-1,y+1,errR,errG,errB);
  addError(img,5/16.0,x,y+1,errR,errG,errB);
  addError(img,1/16.0,x+1,y+1,errR,errG,errB);
}

function addError(img,factor,x,y,errR,errG,errB){
  if(x<0||x>=img.width||y<0||y>=img.height)return;
  let clr=getColorAtindex(img,x,y);
  let r=red(clr);
  let g=green(clr);
  let b=blue(clr);
  clr.setRed(r+errR*factor);
  clr.setGreen(g+errG*factor);
  clr.setBlue(b+errB*factor);
  setColorAtIndex(img,x,y,clr);
}

function keyPressed(){
  if(keyCode===72){
    var x=document.getElementsByTagName("Button");
    if(x.length>0){
       if(!x[0].hidden)for(var i=0;i<x.length;i++)x[i].hidden=true;
       else for(var i=0;i<x.length;i++)x[i].hidden=false;
    }
  }
}