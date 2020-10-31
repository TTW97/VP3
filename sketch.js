//Create variables here
var dog, database, foodstock, foods, fed, addfood, fedTime, foodobj, room = [], readstate, time, gameState=" ", bg,Time1;
var fedTimeupdated;
function preload()
{
	//load images here
  dog1 = loadImage("images/Dog.png");
  dog2 = loadImage("images/hap.png");
  bg1 = loadImage("images/0.png");
  room1 = loadImage("images/r1.png")
  room2 = loadImage("images/r2.png")
  room3 = loadImage("images/r3.png")
  room4 = loadImage("images/r4.png")
}

function setup() {
	createCanvas(800, 500);
  
  database = firebase.database();

   dog = createSprite(710,350,50,50);
   dog.addImage("dog",dog1);
   dog.scale = 0.2; 

  foodstock = database.ref('Food');
  foodstock.on("value",readStock);

  fed = createButton("Feed the Dog");
  fed.position(700,95);
  fed.mousePressed(writeStock);
  fed.mouseReleased(changedog);

  addfood = createButton("Add Food");
  addfood.position(800,95);
  addfood.mousePressed(addStock);

  foodobj = new Food();

  

 

  fedTime = hour();
  //bg = bg1;
}

function draw() {  
  if(bg){
  background(bg);
  }
  drawSprites();

  readstate = database.ref('gameState');
  readstate.on("value",(data)=>{
    
    gameState = data.val();
    
  })

  fill(0);
  textSize(15);
  time = hour();
  

if(fedTime){

  if (fedTime>=12) {
    
    text("Last Feed : "+fedTime%12 + "PM",350,50);
  }else if(fedTime==0){

    text("Last Feed : 12 AM",350,50);
  }else{

    text("Last Feed : "+ fedTime + "AM",350,50);
  }
}
  foodobj.display();
  
  database.ref('FedTime').on("value",(data)=>{
    fedTimeupdated = data.val();
    
  })

  if (gameState!="Hungry"){
    console.log(fedTimeupdated+1);
    fed.hide();
    addfood.hide();
    dog.remove();
    
    if (time===fedTimeupdated+1) {

      update("Playing");
      foodobj.gar();
    }
  
    else if (time===fedTimeupdated+2) {
      update("Sleeping");
      foodobj.bed();
     
    }
    else if (time===fedTimeupdated+3) {
      
      update("Bathing");
      foodobj.wash();
     
    }else{
      update("Hungry");
      foodobj.display();
      bg = bg1;
    
    }

}
else if(gameState === "Hungry"){
  fed.show();
  addfood.show();
}

 
}
function writeStock() {
  
  if (foods<=0) {
    
    foods=0;
  }else{

    foods=foods-1;
  }

   database.ref('/').update({

     Food: foods,
     FedTime: fedTime
   })
   if (foods>0) {
     
    dog.addImage("happy",dog2)
    dog.changeImage("happy");
   }
}
function changedog() {
  
  dog.changeImage("dog");
}

function readStock(data){

  foods = data.val();
}
function addStock() {

  if (foods<20) {

     foods=foods+1;
  }

   database.ref('/').update({
     Food: foods
   })
}
function update(state){

  database.ref('/').update({

     gameState: gameState
   })
}
