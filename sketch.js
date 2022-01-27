var marioImg,mario,groundImg,ground,invisibleGround,obstacleImg,brickImg;
var obstacleGroup,brickGroup;
var gameState="play";
var score=0
var gameOver,gameOverImg,restart,restartImg,backGround,backGroundImg;
function preload()
{
 marioImg=loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
  groundImg=loadImage("ground2.png");
 obstacleImg=loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
  brickImg=loadImage("brick.png")
  marioCollidedImg=loadAnimation("collided.png");
  restartImg=loadImage("restart.png");
  gameOverImg=loadImage("gameOver.png")
  backGroundImg=loadImage("bg.png");
  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");
  checkSound=loadSound("checkPoint.mp3")
}

function setup()
{
  createCanvas(600,400)
  backGround=createSprite(300,200,600,400);
  backGround.addImage(backGroundImg)
  ground=createSprite(300,370,600,20)
  ground.addImage(groundImg)
  mario=createSprite(50,300,20,50);
  mario.addAnimation("run",marioImg);
  mario.addAnimation("collided",marioCollidedImg)
  mario.scale=2;
  invisibleGround=createSprite(300,335,600,30);
  invisibleGround.visible=false
  restart=createSprite(300,100,20,20);
  restart.addImage(restartImg);
  restart.scale=0.7;
  restart.visible=false;
  gameOver=createSprite(300,200,80,20);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible=false;
  obstacleGroup= createGroup();
  brickGroup= createGroup();
  //mario.debug=true;
  mario.setCollider("rectangle",0,0,20,20)
  
}

function draw()
{
 background("lightblue")
 drawSprites();
 textSize(30);
 fill("white");
 text("score = "+score,400,100)
  if(gameState=="play")
    {
               ground.velocityX=-(5+3*score/10)
  
              if(ground.x<0)
              {
                ground.x=600;
              }
  
              if(keyDown("space")&&mario.y>250)
              {
                 mario.velocityY=-15;
                 jumpSound.play();
;                 
              }
        mario.velocityY=mario.velocityY+0.8;
        mario.collide(invisibleGround);

            if(obstacleGroup.isTouching(mario)){
                 gameState="end"
                dieSound.play();
              }
            if(brickGroup.isTouching(mario))
              {
                brickGroup.destroyEach();   
                score=score+2
                checkSound.play();
              }
            obstacles();
            bricks();
           
    }
if(gameState=="end"){
  
            obstacleGroup.setVelocityXEach(0);
            brickGroup.setVelocityXEach(0);
            ground.velocityX=0;
            mario.velocityY=0;
            obstacleGroup.setLifetimeEach(-1);
            brickGroup.setLifetimeEach(-1);
            restart.visible=true;
            gameOver.visible=true;
         mario.changeAnimation("collided",marioCollidedImg)
  
      if(mousePressedOver(restart))
        {
           reset();
        }
}
  
}

function obstacles(){
  if(frameCount%100==0){
    var obstacle=createSprite(600,310,20,20);
    obstacle.velocityX=-(5+3*score/10);
    obstacle.addAnimation("eat",obstacleImg);
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
  }
}

function bricks(){
  if(frameCount%60==0){
    var y=Math.round(random(120,220 ))
    var brick=createSprite(600,y,20,20);
    brick.velocityX=-(5+0.5*score/10);
    brick.addImage(brickImg);
    brick.lifetime=200;
    brickGroup.add(brick);
    brick.depth=gameOver.depth;
    gameOver.depth=gameOver.depth+1;
  }
}

function reset(){
  gameState="play";
  obstacleGroup.destroyEach();
  brickGroup.destroyEach();
  restart.visible=false;
  gameOver.visible=false;
  mario.changeAnimation("run",marioImg)
  score=0;
}