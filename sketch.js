var PLAY=1;
var END=0;
var gameState =PLAY;

var sword,sword_image;

 
var fruit1_image,fruit2_image,fruit3_image ,fruit4_image ,fruitGroup,fruit;

var score=0;

var gameover,gameover_i;

var enemyGroup,enemy_i;

var swordSound;

var gameoversound;
function preload(){
 sword_image=loadImage("sword.png")
 swordsound=loadSound("knifeSwooshSound.mp3")
 
 fruit1_image=loadImage("fruit1.png")
 fruit2_image=loadImage("fruit2.png")
 fruit3_image=loadImage("fruit3.png")
 fruit4_image=loadImage("fruit4.png")
enemy_i=loadAnimation("alien1.png","alien2.png");
  
  gameover_i=loadImage("gameover.png")
  gameoversound=loadSound("gameover.mp3")
 }


  
function setup() {
  createCanvas(400,400);

  sword=createSprite(200,200,20,20)
  sword.addImage("sword",sword_image)
  sword.scale=0.5;
  sword.debug=false;
  
   gameover = createSprite(200,200)
  gameover.addImage("gameover",gameover_i)
  gameover.scale=1;
  
 fruitGroup = createGroup();
 enemyGroup= createGroup();
score=0;
}
function draw(){
 background("white")
text("Score: "+ score, 330,20);  
  
   position=Math.round(random(1,2));
   
   if (position===1){
    fruitGroup.destroyEach();
    score=score+1   
    swordsound.play();
  } 

spawnFruit();
    //spawn the enemy
    spawnEnemy()
    //spawnEnemy();
      
    //spawn Fruit
    
    
    if(enemyGroup.isTouching(sword)){
        gameState = END;
      gameoversound.play();
    }
    gameover.visible=false;
    } 
    else if (gameState === END) {
      fruitGroup.setVelocityXEach(0);
      enemyGroup.setVelocityXEach(0);
      fruitGroup.setLifetimeEach(-1);
      enemyGroup.setLifetimeEach(-1);
      sword.VelocityY=0;
      sword.VelocityX=0;
      gameover.visible=true; 
       sword.addImage("sword",gameover_i)
      sword.x=200;
      sword.y=200;
    }
  drawSprites();
  }


function spawnFruit(){
 if (frameCount % 60 === 0){
   var fruit = createSprite(10,165,10,40);
    fruit.y = Math.round(random(10,390));
   fruit.velocityX =(5+(score/10)) ;
   
    //generate random fruit
    var rand = Math.round(random(1,4));
    switch(rand) 
    {
      case 1: fruit.addImage(fruit1_image);
              break;
      case 2: fruit.addImage(fruit2_image);
              break;
      case 3: fruit.addImage(fruit3_image);
              break;
      case 4: fruit.addImage(fruit4_image);
              break;
      default: break;
    }
     fruit.scale = 0.2;
    fruit.lifetime =80;
 fruitGroup.add(fruit);
   

    }
}
function spawnEnemy() {
  //write code here to spawn the clouds
   if (frameCount % 90 === 0) {
     enemy = createSprite(10,100,40,10);
    enemy.y = Math.round(random(10,370));
    enemy.addAnimation("enemy",enemy_i);

    enemy.velocityX = 5
  enemyGroup.add(enemy); 
     
        position=Math.round(random(1,2));
   
   if (position===1){
     enemy.x=400;
     enemy.vilocityX=-5;
   }
    }
}