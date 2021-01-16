var dog,happyDog,database,foodS,foodStock
var dog_img,happyDog_img;
var feed,addfood;
var fedTime,lastFed;
var foodObj;

var input,button,greeting,Name;

var nameref;

var database;

function preload()
{
  dog_img=loadImage("dogImg.png");
  happyDog_img=loadImage("dog1.png");
}

function setup()
{
  database=firebase.database();
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);

  nameref=database.ref("name");
  nameref.on("value",function(data)
  {
    name=data.val();
  })


  createCanvas(1000,500);

  dog=createSprite(800,200);
  dog.addImage(dog_img);

  dog.scale=0.2;

  foodObj=new food();

  feed=createButton("Feed the Dog");
  feed.position(700,100);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food")
  addFood.position(800,100);
  addFood.mousePressed(addFoods);
  
  
}
 
function draw()
{
  background(46, 139, 87);
  foodObj.display();  

  fedTime=database.ref("FeedTime");
  fedTime.on("value",function(data)
  {
    lastFed=data.val();
  })
 
  

  fill("white");
  textSize(15);
  if(lastFed>=12)
  {
    text("Last Feed : "+ lastFed%12 + " PM",350,30);
  }
  else if(lastFed===0)
  {
    text("Last Feed : 12 AM",350,30)
  }
  else
  {
    text("Last Feed : "+ lastFed + " AM",350,30);
  }



  drawSprites();

  push();
  stroke("black");
  strokeWeight(1.5);
  textSize(24);
  pop();
 
  
}

function readStock(data)
{ 
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog()
{
  dog.addImage(happyDog_img);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
  
}

function addFoods()
{
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}
