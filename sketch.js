var PLAY = 1;
var END = 0;

var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage, ground;
var FoodGroup, ObstacleGroup;
var score;
var jungle, jungleImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  banana_image = loadImage("banana.png");
  obstacle_image = loadImage("obstacle.png");
  jungleImage = loadImage("jungle.jpg");
 
}



function setup() {
  
  createCanvas(400,400);
  
  jungle = createSprite(200,200, 400, 400);
  jungle.addImage(jungleImage);
  
  monkey = createSprite(80, 325, 20, 20);
  monkey.addAnimation('run',monkey_running);
  monkey.scale = 0.1;
  monkey.debug = false;
  monkey.setCollider("rectangle",0,0,monkey.height, monkey.width);
  
  ground = createSprite(200,380,400,20);

  FoodGroup = new Group();
  ObstacleGroup = new Group();

  score = 0;
}


function draw() {
  background(0);
  
  
  jungle.velocityX = -5;
  
  if(jungle.x<0){
   jungle.x=jungle.width/2; 
  }
  
  //display score
  
  if(gameState === PLAY){

    ground.visible = false
    if(frameCount%300 === 0){
      
      spawn_obstacle();
      
    }
    
    if(frameCount%80 === 0){
      
      spawn_food();
      
    }
    
    if(keyDown("space") && monkey.y >= 315){
      
      monkey.velocityY = -12;
      
    }
    monkey.velocityY = monkey.velocityY + 0.5;
    
    
    
    if(monkey.isTouching(FoodGroup)){
      
      FoodGroup.destroyEach();
      score = score +1;
      
    }
    
    if(monkey.collide(ObstacleGroup)){
      
      gameState = END;
      
    }
    
  }
  
  drawSprites();
  
    if(gameState === END){
    textSize(20);
    text("Game Over 😭",150,100);
    
    ObstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
    jungle.velocityX = 0;
    
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    
    monkey.scale = 0.1;
    
    obstacle.velocityX = 0;
    banana.velocityX = 0;
    
  }
  
  monkey.collide(ground);
  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Survival Time: " + score, 130, 30);
}

function spawn_obstacle(){
    
  obstacle = createSprite(400,350, 20, 20);
  obstacle.addImage(obstacle_image);
  obstacle.velocityX = -(4+score/100);
  ObstacleGroup.add(obstacle);
  obstacle.scale = 0.2;
  obstacle.lifetime = 200;
  obstacle.debug = false;
  obstacle.setCollider("circle",0,0,120);
  
}

function spawn_food(){
  
  banana = createSprite(400,Math.round(random(150,200)), 20, 20);
  banana.addImage(banana_image);
  banana.velocityX = -(4 + score/100);
  FoodGroup.add(banana);
  banana.scale = 0.2;
  banana.lifetime = 200;
  
      switch(score){
        
        case 2: monkey.scale = 0.12
                 break;
        case 4: monkey.scale = 0.14
                 break;
        case 6: monkey.scale = 0.16
                 break;
        case 8: monkey.scale = 0.18
                 break;
    }
  
}




