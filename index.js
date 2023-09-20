const platformImg = new Image();
platformImg.src ='./img/platform.png'

const hills = new Image();
hills.src ='./img/hills.png'

const background = new Image();
background.src ='./img/background.png'

const spriteRunLeft = new Image();
spriteRunLeft.src ='./img/spriteRunLeft.png'

const spriteRunRight = new Image();
spriteRunRight.src ='./img/spriteRunRight.png'

const spriteStandLeft = new Image();
spriteStandLeft.src ='./img/spriteStandLeft.png'

const spriteStandRight = new Image();
spriteStandRight.src ='./img/spriteStandRight.png'

const canvas = document.querySelector('canvas');



const c = canvas.getContext('2d');

//make the canvas the size of the screen
canvas.width = 1024
canvas.height = 576

const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");
const upButton = document.getElementById("upButton");
const downButton = document.getElementById("downButton");



// Function to handle button press
function handleButtonPress(buttonElement) {
    buttonElement.classList.add("pressed");
}

// Function to handle button release
function handleButtonRelease(buttonElement) {
    buttonElement.classList.remove("pressed");
}



// Add event listeners for button presses
leftButton.addEventListener("mousedown", () => {
    keys.left.pressed = true;
    player.currenSprite = player.sprites.run.left;
    player.currencropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width;
});

rightButton.addEventListener("mousedown", () => {
    keys.right.pressed = true;
    player.currenSprite = player.sprites.run.right;
    player.currencropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width;
});

// Add event listeners for button releases
leftButton.addEventListener("mouseup", () => {
    keys.left.pressed = false;
    player.currenSprite = player.sprites.stand.left;
    player.currencropWidth = player.sprites.stand.cropWidth;
    player.width = player.sprites.stand.width;
});

rightButton.addEventListener("mouseup", () => {
    keys.right.pressed = false;
    player.currenSprite = player.sprites.stand.right;
    player.currencropWidth = player.sprites.stand.cropWidth;
    player.width = player.sprites.stand.width;
});

// Add event listeners for button presses
upButton.addEventListener("mousedown", () => {
    player.velocity.y -= 10
});

upButton.addEventListener("mouseup", () => {
    player.velocity.y =0
});






// Add event listeners for button presses
leftButton.addEventListener("touchstart", () => {
    event.preventDefault();
    keys.left.pressed = true;
    player.currenSprite = player.sprites.run.left;
    player.currencropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width;
});

rightButton.addEventListener("touchstart", () => {
    event.preventDefault();
    keys.right.pressed = true;
    player.currenSprite = player.sprites.run.right;
    player.currencropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width;
});

// Add event listeners for button releases
leftButton.addEventListener("touchend", () => {
    keys.left.pressed = false;
    player.currenSprite = player.sprites.stand.left;
    player.currencropWidth = player.sprites.stand.cropWidth;
    player.width = player.sprites.stand.width;
});

rightButton.addEventListener("touchend", () => {

    keys.right.pressed = false;
    player.currenSprite = player.sprites.stand.right;
    player.currencropWidth = player.sprites.stand.cropWidth;
    player.width = player.sprites.stand.width;
});

// Add event listeners for button presses
upButton.addEventListener("touchstart", () => {
    event.preventDefault();
    player.velocity.y -= 10
});

upButton.addEventListener("touchend", () => {
    player.velocity.y =0
});


const gravity = 0.5;
class Player{

    // set propperties of player every time new player is created
    constructor(){
       this.speed = 6
        //Give the player a position
        this.position = {
            x:100,
            y:100
        }

        //make the player this big
        this.width = 66
        this.height = 150

        this.velocity = {
            x:0,
            y:0
        }

        this.image = spriteStandRight
        this.frames = 0
        this.sprites = {
            stand:{
                right:spriteStandRight,
                left:spriteStandLeft,
                cropWidth: 177,
                width:66
            },
            run:{
                right: spriteRunRight,
                left: spriteRunLeft,
                cropWidth:341,
                width: 127.875
        
            }

        }

        this.currenSprite = this.sprites.stand.right
        this.currencropWidth = 177
    }

    drwar(){

        //draw the player rectangle with above properties
        c.drawImage(
            this.currenSprite,
            this.currencropWidth* this.frames,
            0,
            this.currencropWidth ,
            400,
            this.position.x,
            this.position.y,
            this.width,
            this.height
            )

    }


    update(){
        this.frames++
        if(this.frames > 28){
            this.frames = 0
        }


        //move player down over time
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        //make sure the player is not out of frame 
        // if the player is in the fram add velocity
        if(this.position.y+this.height+this.velocity.y < canvas.height){
            //accelarate over time
            this.velocity.y += gravity
        }
        //else stop the player at the bottom of the screen
      
        this.drwar()
    } 
}
let img = {
    height:125,
    width : 580
}
class Platform{
    constructor({x,y,image}){
        this.position={
            //use the x and y that were passed to the constructor
            x,
            y
        }
        this.image = image
        this.height = img.height
        this.width=img.width

        console.log('image width: '+image.width+', image height: '+image.height)
    }

    draw(){
        c.fillStyle='blue'
        c.drawImage(this.image,this.position.x,this.position.y)
        
    }
}

class GenericObject{
    constructor({x,y,image}){
        this.position={
            //use the x and y that were passed to the constructor
            x,
            y
        }
        this.image = image
        this.height = img.height
        this.width=img.width

        console.log('image width: '+image.width+', image height: '+image.height)
    }

    draw(){
        c.fillStyle='blue'
        c.drawImage(this.image,this.position.x,this.position.y)
        
    }
}
function init(){

     genericObjects = [
        new GenericObject({
            x:-1,
            y:-1,
            image: background
        }),
        new GenericObject(
            {
                x:0,
                y:14,
                image: hills
            }
        )

    ]


    //create the player
     player = new Player()
     platforms = [new Platform({
        x:-1,
        y:470,
        image:platformImg
        }),
        new Platform({
            x:577,
            y:470,
            image:platformImg
        }),

        new Platform({
            x:577*2,
            y:470,
            image:platformImg
        }),
        new Platform({
            x:577*3,
            y:470,
            image:platformImg
        }),
        ,    
        new Platform({
            x:577*4,
            y:470,
            image:platformImg
        }),
        new Platform({
            x:577*5,
            y:470,
            image:platformImg
        }),
        new Platform({
            x:577*6,
            y:470,
            image:platformImg
        }),

        new Platform({
            x:577*7,
            y:470,
            image:platformImg
        }),

        new Platform({
            x:577*8,
            y:470,
            image:platformImg
        }),

        new Platform({
            x:577*9,
            y:470,
            image:platformImg
        }),

        new Platform({
            x:577*10,
            y:470,
            image:platformImg
        }),

        new Platform({
            x:577*11,
            y:470,
            image:platformImg
        }),
        new Platform({
            x:577*12,
            y:470,
            image:platformImg
        }),
        new Platform({
            x:577*13,
            y:470,
            image:platformImg
        }),
        new Platform({
            x:577*14,
            y:470,
            image:platformImg
        }),
        new Platform({
            x:577*15,
            y:470,
            image:platformImg
        }),
        new Platform({
            x:577*16,
            y:470,
            image:platformImg
        }),
        new Platform({
            x:577*17,
            y:470,
            image:platformImg
        }),
        new Platform({
            x:577*18,
            y:470,
            image:platformImg
        }),
        new Platform({
            x:577*19,
            y:470,
            image:platformImg
        }),
        new Platform({
            x:577*20,
            y:470,
            image:platformImg
        }),
    ]

    scrollOffset = 0;
}

let genericObjects = []


//create the player
let player = new Player()
let platforms = []
let
 keys = {
    right:{
        pressed: false

    },
    left : {
        pressed: false
    }
}

//keep track of how far the player has moved
let scrollOffset = 0

//draw the player rectangle



function animate(){


    //call the function animate so the 
    //player gets drawn over time
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    // remove last frame from the canvas
    c.fillRect(0,0,canvas.width,canvas.height) 
    //draw the player rectangle
    genericObjects.forEach(genericObjects => {
        genericObjects.draw()
    })
    platforms.forEach(platform =>{
        platform.draw()
    })

    player.update();
    //move only if the d key is pressed
    if(keys.right.pressed && player.position.x < 450 ){
        player.velocity.x = 5
    }
    else if(keys.left.pressed && player.position.x >100 ){
        player.velocity.x = -player.speed
        
    }
    else  {
        player.velocity.x = 0;

        if(keys.right.pressed){
            scrollOffset += player.speed
            platforms.forEach(platform =>{
                platform.position.x -= player.speed
            })
            genericObjects.forEach(genericObjects =>{
                genericObjects.position.x -= player.speed * 0.66
            })
        }
        else if(keys.left.pressed && scrollOffset > 0){
            scrollOffset -= player.speed
            platforms.forEach(platform =>{
                platform.position.x += player.speed
            })
            genericObjects.forEach(genericObjects =>{
                genericObjects.position.x += player.speed * 0.66
            })
        }

        //win secnario
        if(scrollOffset > 2000){


        }
        // lose if you fall into death pit
        //re init all the stuff
        if(player.position.y > canvas.height){
            init()
        }
    }

    //if players position is on the platform
    // stop the player from moving down
    platforms.forEach(platform =>{
    //do this for all the platforms
    if(player.position.y+player.height <= platform.position.y && 
        player.position.y+player.height+player.velocity.y >= platform.position.y
        && player.position.x+player.width >= platform.position.x &&
        player.position.x <= platform.position.x+platform.width){
        player.velocity.y = 0
    }

    })
    
}

init()
animate()


addEventListener('keydown',({keyCode}) =>{
    switch(keyCode){

        //left
        case 65:
            //player.velocity.x -= 4
            keys.left.pressed = true
            player.currenSprite = player.sprites.run.left
            player.currencropWidth = player.sprites.run.cropWidth
            player.width = player.sprites.run.width
            break

        //down
        case 83:
            //player.velocity.y += 10
            break

        //right
        case 68:
            //player.velocity.x += 4
            keys.right.pressed = true
            player.currenSprite = player.sprites.run.right
            player.currencropWidth = player.sprites.run.cropWidth
            player.width = player.sprites.run.width
            break

        //up
        case 87:
            player.velocity.y -= 10
            break
    }

})


addEventListener('keyup',({keyCode}) =>{
    switch(keyCode){

        //left
        case 65:
           player.velocity.x =0
           keys.left.pressed = false
           player.currenSprite = player.sprites.stand.left
            player.currencropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
            break

        //down
        case 83:
            player.velocity.y =0
            
            break

        //right
        case 68:
            player.velocity.x =0
            keys.right.pressed = false
            player.currenSprite = player.sprites.stand.right
            player.currencropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
            break

        //up
        case 87:
            player.velocity.y =0
            break
    }

})


