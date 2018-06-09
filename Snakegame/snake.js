$(document).ready(function(){
	var c= document.getElementById("myCanvas");
	var context = c.getContext("2d");

	//Set up grids
	var gridNum = 20;
	var gridSize = c.width/gridNum;

//set up candy and player objects
var player = {
	tail:1,
	x:7,
	y:7,
//direction: right -0, left -1
//up -2,down - 3, stopped - 5
direction: 5,
alive: true
}
var candy = {
	x: 0,
	y:0,
	alive: false
}

//store coordinates of the body parts
var snakeBody = [[7,7]]


//set up keys 
var keyPressed= null;
var leftKey = 37, upKey =38, rightKey = 39,downKey = 40;

//make custom insert method for Array
Array.prototype.insert = function(index, item){
//splice(index to insert, no of items to delete, new ITEMS)
this.splice(index, 0,item);
}
function update(){
	//change direction
	if(keyPressed){
		if(keyPressed == rightKey && player.direction !=1) player.direction = 0;
		if(keyPressed == leftKey && player.direction !=0) player.direction = 1;
		if(keyPressed == upKey && player.direction !=3) player.direction = 2;
		if(keyPressed == downKey && player.direction !=2) player.direction = 3;

		

	}

	if(!candy.alive){
		//generate random whole numbers from 0 to 19 (20 by 20)

		candy.x = Math.floor(Math.random()*gridNum);
		candy.y = Math.floor(Math.random()*gridNum);

		//check if spawning on snake
		var collided;

		do{

			collided = false;
			//loop through all snake parts to check collision
			for(var i = 0; i<player.tail; i++){

				if(candy.x == snakeBody[i][0]&& candy.y == snakeBody[i][1]){
					candy.x = Math.floor(Math.random()*gridNum);
					candy.y = Math.floor(Math.random()*gridNum);
					collided = true;
					break;
				}
			}
		}while(collided);

		candy.alive = true;
	}


	//check if the player eats the candy
if(player.x==candy.x&&player.y==candy.y){
	candy.alive =false;
	player.tail+=1;
}
//game over
//hit wall
if(player.x < 0 || player.x >= gridNum||player.y < 0||player.y>=gridNum){

	player.alive = false;
	clearInterval(updates);
	console.log("test"+snakeBody);
}
//check hit itself
if(player.tail>1){
	for(var i = 1;i < player.tail; i++){
		if(player.x == snakeBody[i][0]&&player.y == snakeBody[i][1]){
			player.alive = false;
		
			clearInterval(updates);
			console.log(snakeBody);
		}
	}
	}
	//move player
	snakeBody.insert(0,[player.x,player.y]);
	while(snakeBody.length > player.tail+1){
		snakeBody.pop();
	}
	//change direction
	switch(player.direction){
		//right
		case 0:
		player.x += 1;break;
		//left
		case 1:
		player.x -= 1;break;
		//up
		case 2:
		player.y -= 1;break;
		//down
		case 3:
		player.y += 1;break;
	}
	//call draw after update
	if(player.alive){
		draw();
	}
}
function draw(){
	//cleaf out old frame
	context.clearRect(0,0, c.width,c.height);
	//draw candy
	context.fillStyle = "green";
	context.fillRect(candy.x*gridSize,candy.y*gridSize,gridSize,gridSize)
//draw Snake
for (var i=0; i<player.tail; i++){
	context.fillStyle = "black";
	context.fillRect(snakeBody[i][0]*gridSize,snakeBody[i][1]*gridSize,gridSize,gridSize);
}
}

//keydown event
$(window).on("keydown",function(event){
	keyPressed = event.which;
})
//start updates
update();
var updates = setInterval(update,100);
})