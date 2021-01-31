let rectOver = false;
let dogRectX = 700;
let dogRectY = 400;
let dogColumns = 1;
let dogRows = 1;
let dogCoatColorArray = ['#FFFFFF', '#999999', '#ffda3b', '#b08f4d', '#996633', '#663300', '#542f23', '#333333'];
let topRow = 100;

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
	noStroke();
	background(100);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
	noStroke();
	background(100);
}

function draw() {

  // Col & Row Backgrounds
  fill(255);
  rect(150,30,65,20);
  rect(225,30,65,20);

  // Button Backgounds
  fill(120);
  rect(50, 30, 90, 20);
  rect(150, 30, 20, 20);
  rect(195, 30, 20, 20);
  rect(225, 30, 20, 20);
  rect(270, 30, 20, 20);
  text(dogColumns, 173,34,20,30);
  text(dogRows, 247,34,20,30);

  // Button Foregrounds
  fill(250);
  textSize(12);
  textAlign(CENTER);
  text('Create Dog', 50, 34, 90,30);
  text('<', 150,34,20,30);
  text('>', 195,34,20,30);
  text('˅', 225,34,20,30);
  text('˄', 270,34,20,30);
  
  for(let i = 0; i < dogCoatColorArray.length;i++){
    fill(dogCoatColorArray[[i]]);
    rect(300 + (i * 30),0,30,10);
  }


  noStroke();

}

  function overRect(x, y, width, height)  {
    if (mouseX >= x && mouseX <= x+width && 
        mouseY >= y && mouseY <= y+height) {
      return true;
    } else {
      return false;
    }
  }

  // PERSONAL: Using comments to create personal spaces?

  function mousePressed(){
    if ( overRect(50, 30, 90, 20) ) {
      prepareDog();
    }
    else if (overRect(150, 30, 20, 20)){
      //Decrease column
      dogColumns--;
      if(dogColumns<1) dogColumns = 1;
      prepareDog();
    }
    else if (overRect(195, 30, 20, 20)){
      //Increase column
      dogColumns++;
      if(dogColumns<1) dogColumns = 1;
      prepareDog();
    }  
    else if (overRect(225, 30, 20, 20)){
      //Decrease Row
      dogRows--;
      if(dogRows<1) dogRows = 1;
      prepareDog();
    }
    else if (overRect(270, 30, 20, 20)){
      //Increase Row
      dogRows++;
      if(dogRows<1) dogRows = 1;
      prepareDog();

    }
  }

  function prepareDog(){
    background(100);
    scaleDog = (windowWidth/dogRectX)/dogColumns;
    print(windowWidth);
    scale(scaleDog);
    for (let j = 0; j < dogRows; j++) {
      for (let i = 0; i < dogColumns; i++) {
        let dogCoatColor = random(dogCoatColorArray);
        createDog(((dogRectX/dogColumns)/scaleDog) * i,(topRow/scaleDog + ((dogRectY)*j)), dogCoatColor);
      }
    }
  }

  function createDog(originX, originY, dogCoatColor){

    // fill(random(dogCoatColorArray));
    // rect(originX, originY, originX+dogRectX, originY+dogRectY);

    let thisDogScaleFactor = random(1,2);
    scale(1/thisDogScaleFactor);
    originX = originX * thisDogScaleFactor + (dogRectX-(dogRectX/thisDogScaleFactor));
    originY = originY * thisDogScaleFactor + (dogRectY - (dogRectY/thisDogScaleFactor)) + ((topRow/(scaleDog*thisDogScaleFactor)) - ((topRow/scaleDog)/thisDogScaleFactor));

    //BODY DIMENSIONS
    let ptStartX = originX + 100;
    let ptStartY = originY + 100 + random(-100,30);
    let BackHandle1X = originX + 0 + random(-0,0);
    let BackHandle1Y = originY + 200 + random(-50,50);
    let BackHandle2X = originX + 400 + random(-0,0);
    let BackHandle2Y = originY + 200 + random(-50,50);
    let ptNeckPositionX = originX + 500 +random(-80, 80);
    let ptNeckPositionY = originY + 100;
    let ptFrontFootX = originX + 500;
    let ptFrontFootY = originY + 400;
    let BellyHandle1X = originX + 400 + random(-100,100);
    let BellyHandle1Y = originY + 300 + random(-100,100);
    let BellyHandle2X = originX + 200 + random(-100,100);
    let BellyHandle2Y = originY + 150 + random(-100,100);
    let ptBackFootX = originX + 100;
    let ptBackFootY = originY + 400;

    //HEAD DIMENSIONS
    let headStartX = ptNeckPositionX + random(-30, -50);
    let headStartY = ptNeckPositionY + random(-50,-70);
    let head2X = headStartX + random(150, 170);
    let head2Y = headStartY + random(30, 50);
    let head3X = headStartX + random(140, 160);
    let head3Y = headStartY + random(90,110);
    let head4X = headStartX + random(-10, 30);
    let head4Y = headStartY + random(80, 100);

    //SHADOW
    fill(0,0,0,50);
    ellipseMode(CORNER);
    ellipse(ptBackFootX,ptBackFootY-10, (ptFrontFootX - ptBackFootX), 40);

    //BODY BACKGROUND
    fill(dogCoatColor);
    beginShape();
      vertex(ptStartX, ptStartY);
      bezierVertex(BackHandle1X+10, BackHandle1Y, BackHandle2X, BackHandle2Y, ptNeckPositionX,ptNeckPositionY);
      vertex(ptFrontFootX-50,ptFrontFootY-10);
      bezierVertex(BellyHandle1X+10, BellyHandle1Y, BellyHandle2X, BellyHandle2Y, ptBackFootX+20, ptBackFootY-10);
      vertex(ptStartX, ptStartY);
    endShape();

    //BODY BACKGROUND SHADOW
    fill(color(0,0,0,150));
    beginShape();
      vertex(ptStartX, ptStartY);
      bezierVertex(BackHandle1X+10, BackHandle1Y, BackHandle2X, BackHandle2Y, ptNeckPositionX,ptNeckPositionY);
      vertex(ptFrontFootX-50,ptFrontFootY-10);
      bezierVertex(BellyHandle1X+10, BellyHandle1Y, BellyHandle2X, BellyHandle2Y, ptBackFootX+20, ptBackFootY-10);
      vertex(ptStartX, ptStartY);
    endShape();

    //BODY FOREGROUND
    fill(dogCoatColor);
    beginShape();
      vertex(ptStartX, ptStartY);
      bezierVertex(BackHandle1X+random(10), BackHandle1Y, BackHandle2X, BackHandle2Y, ptNeckPositionX,ptNeckPositionY);
      vertex(ptFrontFootX,ptFrontFootY);
      bezierVertex(BellyHandle1X+random(10), BellyHandle1Y, BellyHandle2X, BellyHandle2Y, ptBackFootX, ptBackFootY);
      vertex(ptStartX, ptStartY);
    endShape();

    //HEAD
      fill(dogCoatColor);
      beginShape();
        vertex(headStartX,headStartY);
        vertex(head2X, head2Y);
        vertex(head3X, head3Y);
        vertex(head4X, head4Y);
        vertex(headStartX, headStartY);
      endShape();

    //COLLAR
    fill(color(random(255), random(255), random(255)));
    beginShape();
      vertex(ptNeckPositionX -60, ptNeckPositionY);
      vertex(ptNeckPositionX +40, ptNeckPositionY+40);
      vertex(ptNeckPositionX +35, ptNeckPositionY +55);
      vertex(ptNeckPositionX -65, ptNeckPositionY +15);
      vertex(ptNeckPositionX -60, ptNeckPositionY);
    endShape();

    //NOSE
    fill(0);
    beginShape();
      vertex(head2X, head2Y);
      vertex(head2X, head2Y+20);
      vertex(head2X-20, head2Y-5);
      vertex(head2X, head2Y);
    endShape();

    //EAR
    fill(dogCoatColor);
    let earPoint1X = headStartX - random(-100,100);
    let earPoint1Y;

    if (earPoint1X > headStartX){
      earPoint1Y = headStartY - random(0,100);
    } else {
      earPoint1Y = headStartY - random(-100,100);
    }

    beginShape();
      vertex(headStartX, headStartY);
      vertex(earPoint1X, earPoint1Y);
      vertex(earPoint1X + 50, earPoint1Y -5);
      vertex(headStartX+10, headStartY+10);
    endShape();

    //EYE
    stroke(0);
    strokeWeight(4);
    let eyeStartX = headStartX + (head2X - headStartX)/2;
    let eyeStartY = headStartY + (head2Y - headStartY)/2;
    beginShape();
      vertex(eyeStartX + 5, eyeStartY-5);
      vertex(eyeStartX - 25, eyeStartY+25);
    endShape();
    noStroke();

    scale(thisDogScaleFactor);

    //BEZIER HANDLE
    // fill(0,300,0);
    // ellipse(BackHandle1X, BackHandle1Y, 5, 5);
    // ellipse(BackHandle2X, BackHandle2Y, 5, 5);   
    // fill(0,0,300);
    // ellipse(BellyHandle1X, BellyHandle1Y, 5, 5);
    // ellipse(BellyHandle2X, BellyHandle2Y, 5, 5);
  }