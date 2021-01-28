var balloon;
var balloonImage1, balloonImage2;

var database, height;

function preload(){
  backgroundImage = loadImage("cityImage.png");
  balloonImage1 = loadImage("HotAirBallon-01.png");
  
  balloonImage2 = loadAnimation("HotAirBallon-01.png","HotAirBallon-01.png", "HotAirBallon-01.png",
  "HotAirBallon-02.png", "HotAirBallon-02.png", "HotAirBallon-02.png", "HotAirBallon-03.png", "HotAirBallon-03.png",
  "HotAirBallon-03.png", "HotAirBallon-03.png");
  
}

function setup() {
  database = firebase.database();

  createCanvas(1300,650);

  balloon = createSprite(250,530,150,150);
  balloon.addAnimation("hotAirBalloon", balloonImage1);
  balloon.scale = 0.5;

  var balloonHeight = database.ref('balloon/height');
  balloonHeight.on("value", readHeight, showError);
  
}

function draw() {
  background(backgroundImage);  
  

  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x - 10;
    balloon.addAnimation("hotAirBalloon", balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x + 10;
    balloon.addAnimation("hotAirBalloon", balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y - 10;
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    balloon.scale = balloon.scale - 0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y = balloon.y + 10;
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    balloon.scale = balloon.scale + 0.01;
  }


  drawSprites();
  fill(0);
  stroke("yellow");
  textSize(25);
  text("Use arrow keys to move Hot Air Balloon!!",40,40);
  
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
      'x': height.x + x,
      'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}
