/**
 * Display the average amount of energy (amplitude) across a range
 * of frequencies using the p5.FFT class and its methods analyze()
 * and getEnergy().
 * 
 * This example divides the frequency spectrum into eight bands.
 */

var soundFile, tone1;
var fft;

var description = 'loading';
var p;

var ballX=100, ballY=100;
var value = 0;


function preload() {
  soundFormats('mp3', 'ogg');
  soundFile = loadSound('file/song');
  tone1 = loadSound('file/tone1');
}

function setup() {
  soundFile.loop();

  createCanvas(windowWidth, windowHeight); 
  fill(255, 40, 255);
  noStroke();
  textAlign(CENTER);

  fft = new p5.FFT(0.8, 16);

  p = createP(description);
  var p2 = createP('Description: Using getEnergy(low, high) to measure amplitude within a range of frequencies.');

}

function draw() {
  var bar = 20;
  background(30,20,30);

  fill(value);
  rect(100,100,500,500);

  


  updateDescription();

  fft.analyze(); // analyze before calling fft.getEnergy()

  // Generate 8(bar) bars to represent 8(bar) different frequency ranges
  //for (var i = 0; i < bar; i++){
    noStroke();
    


    // Each bar has a unique frequency range
    var centerFreq = (pow(2,i)*125)/2;
    var loFreq = (pow(2,i-1)*125)/2 + centerFreq/4;
    var hiFreq = (centerFreq + centerFreq/2);

    // get the average value in a frequency range
    var freqValues = fft.analyze(); 
    
    push();
    rotate(PI/4);
    translate(0,-height/2);
    for (var i = 0; i< freqValues.length; i++){
    //var x = map(i, 0, freqValues.length, 0, width);
    var h = -height + map(freqValues[i], 0, 255, height, 0);
    fill(195, (i*25 + 50) % 255, (i*30) % 100 + 50);
    //fill((i*30) % 200 + 100, 195, (i*25 + 50) % 255 );
    rect((i+1)*width/freqValues.length - width/freqValues.length, height, width/freqValues.length, h);
    
    }
    pop();

    push();
    rotate(-PI/4);
    translate(-width/8,height/2);
    for (var i = 0; i< freqValues.length; i++){
    //var x = map(i, 0, freqValues.length, 0, width);
    var h = -height + map(freqValues[i], 0, 255, height, 0);
    //fill((i*30) % 200 + 100, 195, (i*25 + 50) % 255 );
    fill((i*30) % 100 + 50, (i*25 + 50) % 255, 195);
    rect((i+1)*width/freqValues.length - width/freqValues.length, height, width/freqValues.length, h);
    
    }
    pop();

    push();
    rotate(PI/4*3);
    translate(-width/2,-height*3/2);
    for (var i = 0; i< freqValues.length; i++){
    //var x = map(i, 0, freqValues.length, 0, width);
    var h = -height + map(freqValues[i], 0, 255, height, 0);
    fill((i*30) % 100 + 50, 195, (i*25 + 50) % 255 );
    //fill((i*30) % 200 + 100, 195, (i*25 + 50) % 255 );
    rect((i+1)*width/freqValues.length - width/freqValues.length, height, width/freqValues.length, h);
    
    }
    pop();

    push();
    rotate(PI/3*4);
    translate(-width,height/2);
    for (var i = 0; i< freqValues.length; i++){
    //var x = map(i, 0, freqValues.length, 0, width);
    var h = -height + map(freqValues[i], 0, 255, height, 0);
    fill(195, (i*25 + 50) % 255, (i*30) % 100 + 50);
    //fill((i*30) % 200 + 100, 195, (i*25 + 50) % 255 );
    rect((i+1)*width/freqValues.length - width/freqValues.length, height, width/freqValues.length, h);
    
    }
    pop();

    //stroke(255);
    
    //text( loFreq.toFixed(0) +' Hz - ' + hiFreq.toFixed(0)+' Hz', (i+1)*width/bar - width/bar/2, 30);

  //}
/*
    if(value === 1){
      fill(255);
      ellipse(100,100,100,100);
    } else if (value === 0){
      line(130,120,100,33);
    }
*/
    movingBall();

}

function movingBall(){
  if(keyIsDown(LEFT_ARROW)){
    tone1.play();
    ballX-=5;
    //rotate(-PI/8);
  }
    
  if(keyIsDown(RIGHT_ARROW)){
    tone1.play();
    ballX+=5;
    //rotate(PI/8);
  }
    
  if(keyIsDown(UP_ARROW)){
    tone1.play();
    ballY-=5;
    //rotate(-PI/8);
  }
    
  if(keyIsDown(DOWN_ARROW)){
    tone1.play();
    ballY+=5;
    //rotate(PI/8);
  }
    

  //clear();
  fill(random(255),random(255),random(255));
  ellipse(ballX,ballY,50,50);
  ellipse(ballX+100,ballY+100,50,50);
  ellipse(ballX+100,ballY,50,50);
  ellipse(ballX,ballY+100,50,50);

}

/*
function keyPressed() {
  if (soundFile.isPlaying()){
    soundFile.pause();
  } else {
    soundFile.play();
  }
  
}
*/

function keyTyped() {
  if (key === 'c') {
    value = 255;
  } else if (key === 'b') {
    value = 0;
  }
  return false;
  //creturn false; // prevent any default behavior
}
/*
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    value = 1;
  } else if (keyCode === RIGHT_ARROW) {
    value = 0;
  }
  return false; // prevent any default behavior
}
*/
// Change description text if the song is loading, playing or paused
function updateDescription() {
  if (soundFile.isPaused()) {
    description = 'Paused...';
    p.html(description);
  }
  else if (soundFile.isPlaying()){
    description = 'Playing!';
    p.html(description);
  }
  else {
    for (var i = 0; i < frameCount%3; i++ ) {

      // add periods to loading to create a fun loading bar effect
      if (frameCount%4 == 0){
        description += '.';
      }
      if (frameCount%25 == 0) {
        description = 'loading';

      }
    }
    p.html(description);
  }
}