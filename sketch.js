var sword, swordImage, fruit, fruitImage1, fruitImage2, fruitImage3, fruitImage4, enemy, enemyAnimation, knifeSwooshingSound, gameOverSound, position;
var PLAY=1;
var END=0;
var gameState=1;
var score=0;
var fruitGroup, enemyGroup;
var  gameOverImage;

function preload(){
  swordImage=loadImage("sword.png");
  fruitImage1=loadImage("fruit1.png");
  fruitImage2=loadImage("fruit2.png");
  fruitImage3=loadImage("fruit3.png");
  fruitImage4=loadImage("fruit4.png");
  enemyAnimation=loadAnimation("alien1.png","alien2.png");
  gameOverImage=loadImage("gameover.png");
 knifeSwooshingSound=loadSound("knifeSwooshSound.mp3");
  GameOverSound=loadSound("gameover.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  sword=createSprite(width/2,200,20,20);
  sword.addImage("sword0",swordImage);
  sword.scale=0.7;
  
  fruitGroup=new Group();
  enemyGroup=new Group();
  
}

function draw(){
  background("lightBlue");
  
  text("Score: "+score,width-100,50);
  
  if(gameState==PLAY){
    sword.x=World.mouseX;
    sword.y=World.mouseY;
  }
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    score=score+2;
    knifeSwooshingSound.play();
  }
  
  if(enemyGroup.isTouching(sword)){
    gameState=END;
    GameOverSound.play();
  }
  
  if(gameState==END){
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityEach(0);
    enemyGroup.setVelocityEach(0);
    sword.addImage("gameOver",gameOverImage);
    text("Game Over",170,200);
  }
  fruits();
  monsters();
  
  
  
  drawSprites();
}

function fruits(){
  if(frameCount%80==0){
    fruit=createSprite(width-1,200,20,20);
    var r= Math.round(random(1,4));
    switch(r) {
      case 1: fruit.addImage(fruitImage1);
              break;
      case 2: fruit.addImage(fruitImage2);
              break;
      case 3: fruit.addImage(fruitImage3);
              break;
      case 4: fruit.addImage(fruitImage4);
              break;
              default: break;
    }
       position=Math.round(random(1,2));
    if(position==1){
      fruit.x=width-1;
      fruit.velocityX=-(7+score/4);
    }
    if(position==2){
      fruit.x=0;
      fruit.velocityX=(7+score/4);
    }
    fruit.scale=0.2;
    fruit.y=Math.round(random(50,height-60));
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
  }
}

function monsters(){
  if(frameCount%200==0){
    enemy=createSprite(width-1,200,20,20);
    enemy.addAnimation("moving", enemyAnimation);
    enemy.y=Math.round(random(100,height-100));
    enemy.velocityX=-(8+score/10);
    enemy.setLifetime=50;
    enemyGroup.add(enemy);
  }
}
