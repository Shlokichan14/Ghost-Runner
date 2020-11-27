var gameState="PLAY";

var tower, towerImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var invisibleOB, invisibleOBGroup;
var ghost, ghostImage;

function preload(){
towerImage = loadImage("tower.png");
doorImage = loadImage("door.png");
climberImage = loadImage("climber.png");
ghostImage = loadImage("ghost-standing.png");
}

function setup(){
createCanvas(600,600);

tower = createSprite(300,300,10,10);
tower.addImage("tower",towerImage);
tower.velocityY=1;

ghost = createSprite(300,300,10,10);
ghost.addImage("ghost",ghostImage);
ghost.scale=0.3;

doorGroup = createGroup();
climberGroup = createGroup();
invisibleOBGroup = createGroup();
}

function draw (){

    if(gameState==="PLAY"){
        if(tower.y>600){
            tower.y=300;
                }
            
                if(keyDown("right")){
            ghost.x=ghost.x+3;
                }
            
                if(keyDown("left")){
                    ghost.x=ghost.x-3;
                }
            
                if(keyDown("space")){
            ghost.velocityY=-3;
                }
            ghost.velocityY=ghost.velocityY+0.5;
                
                spawnDoors();
                drawSprites();

                if(ghost.isTouching(invisibleOBGroup)||ghost.y>600){
                    gameState="END";
                    ghost.destroy();
                }
    }
    
    if(gameState==="END"){
background("black");
stroke("yellow");
fill ("yellow");
textSize(30);
text("Game Over",250,300);
    }    
    
}

function spawnDoors(){
    if(frameCount%200===0){
door = createSprite(200,-30,10,10);
door.addImage("door",doorImage);
door.velocityY=1;
door.x=Math.round(random(120,400));
door.lifetime=600;

doorGroup.add(door);

climber = createSprite(200,-30,10,10);
climber.addImage("climber",climberImage);
climber.velocityY=1;
climber.lifetime=600;
climber.x=door.x;
climber.y=door.y+70;

climberGroup.add(climber);

invisibleOB = createSprite(200,-30,10,10);
invisibleOB.x=climber.x;
invisibleOB.y=climber.y+10;
invisibleOB.width=climber.width;
invisibleOB.velocityY=1;
invisibleOB.lifetime=600;
invisibleOB.visible=false;

invisibleOBGroup.add(invisibleOB);
    }
}