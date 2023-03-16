
var mouse
var cat;
var cheese;
var yarn;
var mousetrap;
var bg; mouseImg; catImg; cheeseImg; yarnImg; mousetrapImg;deadmouseImg, deadcatImg;
var edges;
var x;y;x1;y1
var yarnGroup
var cheeseGroup
var life
var score = 0

var restartImg, gameOverImg
var restart, gameOver


function preload()
{
  bg = loadImage("floor1.webp")
  mouseImg = loadImage("mouse.png")
  catImg = loadImage("cat.png")
  cheeseImg = loadImage("cheese.png")
  yarnImg = loadImage("yarn.png")
  mousetrapImg = loadImage("mousetrap.jpg")
  deadcatImg = loadImage("deadcat.png")
  deadmouseImg = loadImage("deadmouse.png")
  gameOverImg = loadImage("gameoverImg.png")
  restartImg = loadImage("restartImg.png")
}
function setup() {
  createCanvas(800,400);
  edges = createEdgeSprites()

  mouse = createSprite(width-50, height-255, 30,30)
  mouse.addImage(mouseImg)
  mouse.addImage(deadmouseImg)
  mouse.changeImage(mouseImg)
  mouse.scale = 0.3

  cat = createSprite(width -255, height-255, 30 , 30)
  cat.addImage("alive",catImg)
  cat.addImage("dead",deadcatImg)
  cat.changeImage("alive",catImg)
  cat.scale = 0.5
  cat.velocityX = -1
  

  restart = createSprite(width/2,height/2)
  restart.addImage(restartImg)

  gameOver = createSprite(width/2 - 100, height/2 - 100)
  gameOver.addImage(gameOverImg)

  restart.scale = 0.2
  gameOver.scale = 0.2


  yarnGroup = new Group()
  cheeseGroup = new Group()

  life = 100
  


  
}

function draw() {
  background(255,255,255);  
  image(bg, 0,0, width, height);
  textSize(50)
  fill(255,255,255)
  text("Life: "+life, 0, 45);
  

  if(keyDown(LEFT_ARROW))
  {
    mouse.x -= 5
  }

  if(keyDown("space")){
    mouse.velocityY -= 3
  }
  if (mouse.velocityY <= 0){
    mouse.velocityY += 0.1
  }
  if(cat.x <= -20){
    cat.x = 760
  }
  if(mouse.x <= -20){
    mouse.x = 780
  }
  if(yarnGroup.isTouching(mouse)){
    life -= 25
  }
  if(cheeseGroup.isTouching(mouse)){
    life += 20
  }
  if(life > 100){
    life = 100
  }
  if(life < 0){
    life = 0
  }
  if(cat.isTouching(mouse)){
    cat.changeImage("dead",deadcatImg)
    
  }
  if(life <= 0){
    mouse.changeImage(deadmouseImg)
  }
  mouse.bounceOff(edges[3])
  mouse.bounceOff(edges[2])
  spawnYarn()
  spawnCheese()
  drawSprites();
}


function spawnYarn()
{
  if(frameCount % 60 === 0){
    x = Math.round(random(1,800))
    y = Math.round(random(1,500))
    yarn = createSprite(x,y,30,30)
    yarn.addImage(yarnImg)
    yarn.scale = 0.2
    yarn.lifetime = 20
    yarnGroup.add(yarn)
  }

}
function spawnCheese()
{
  if(frameCount % 80 === 0){
    x1 = Math.round(random(1,800))
    y1 = Math.round(random(1,500))
    cheese = createSprite(x1,y1,30,30)
    cheese.addImage(cheeseImg)
    cheese.scale = 0.2
    cheese.lifetime = 25
    cheeseGroup.add(cheese)
  }
}