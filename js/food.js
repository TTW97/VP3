class Food{
    constructor(){

        var lastfed,img;

        this.image = loadImage("images/Milk.png");
    }
    display(){

        var x = 100;
        var y = 350;

        var len = ((foods*20)+100)-20;

        imageMode(CENTER);

        if (foods>0) {
        
            image(this.image,640,400,70,70);
        }

         if(this.foods!=0){
 
             for (var i = 100; i < len; i=i+20){

                    image(this.image,i,y,50,50);
            } 
        } 
    }
    bed(){

        bg = room2;
    }
    gar(){

        bg = room3;
    }
    wash(){

        bg = room1;
    }
}