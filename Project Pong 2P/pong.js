$(document).ready(function(){

//setting up the canvas
var canvas = document.getElementById("canvas");
var ctx =canvas.getContext("2d");
var gameOver = true;
var ballColor = null;
//set up constants
const PI = Math.PI;
const HEIGHT = canvas.height;
const WIDTH = canvas.width;
const upKey = 38, downKey = 40;
const wKey = 87; sKey = 83;

//user inputs
var keyPressed = null;

//setting up game projects
var player = {
	x: null,
	y:null,
	width: 20,
	height: 100,
	update : function(){
	//move paddle accorf=ding to the key
		if(keyPressed == wKey) this.y -=10;
		if (keyPressed == sKey)this.y +=10;
	},
	draw : function(){
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
}

var player2 = {
	x: null,
	y:null,
	width: 20,
	height: 100,
	update : function(){
		if(keyPressed == upKey) this.y -=10;
		if (keyPressed == downKey)this.y +=10;
	},
	draw : function(){
		ctx.fillRect(this.x,this.y,this.width,this.height);
	},
}

var ball = {
	x: null,
	y:null,
	size: 20,
	speedx:null,
	speedy: null,
	speed:10,
update : function(){
	//move ball
	this.x += this.speedx;
	this.y +=this.speedy;

	//bounce top and bottom
	if(this.y<=0 || this.y >= HEIGHT){
		this.speedy*= -1;
	}


	//sense collisions
	function checkCollision(a,b){
		return(a.x<b.x + b.width &&a.y < b.y + b.height && b.x < a.x + a.size && b.y < a.y + a.size);


	}

	let other;
	if(ball.speedx<0){
		other = player;
	}else {
		other= player2;
	}
//check for collision
let collided = checkCollision(ball,other);

if(collided){
ballColor = "rgb(" + Math.random()*256 + "," + Math.random()*256 + "," + Math.random()*256 + ")";  //"rgb(19,39,93)"
//copy the code in codeshare.io
let n = (this.y + this.size - other.y) / (other.height + this.size);
let phi = 0.25 * PI * (2 * n - 1)
this.speedx = this.speed * Math.cos(phi);
this.speedy = this.speed * Math.sin(phi);
if(other == player2) this.speedx *= -1;
}



//check if game over
if(this.x + this.size <0 || this.x + this.size > WIDTH){
	gameOver = true;
	$("button").fadeIn();
	if(this.x > WIDTH-this.size){
		$("h1").html("Player 2 Wins!");
		console.log(this.x);
	}else{
		$("h1").html("Player 1 Wins!");
		console.log(this.x);
	}
}


},
draw : function(){
ctx.fillStyle = ballColor;
ctx.fillRect(this.x,this.y,this.size,this.size);
}
}

//setting game functions
function main(){
//initialize
init();

//setup loop(update,10)
var loop = function(){
	update();
	draw();
	window.requestAnimationFrame(loop, canvas);

}
window.requestAnimationFrame(loop, canvas);
}

function init(){

gameOver=false;
$("h1").html("Pong");

//center paddles
player.x = 20;
player.y = (HEIGHT-player.height)/2;

player2.x=(WIDTH-player2.width-20);
player2.y=(HEIGHT-player2.height)/2;

ball.x=(WIDTH-ball.size)/2;
ball.y=(HEIGHT-ball.size)/2;

//serve BALL
ball.speedx =ball.speed;
if(Math.round(Math.random())){
	ball.speedx *=-1;
}
ball.speedy = 0;
}


function update(){
if(!gameOver){
ball.update();
player2.update();
player.update();
}
}

function draw(){
	//fill background
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,WIDTH,HEIGHT)

	//draw game objects
	ctx.fillStyle = "white";
	player2.draw();
	player.draw();
ball.draw();
//optional-draw line
}

//sense users key inputs
$(document).on("keyup", function(e){
	keyPressed = null;
});

$(document).on("keydown", function(e){
	keyPressed = e.which ;
});

//button click
$("button").on("click",function(){

	$(this).hide()
	init();
})





//call main function to start
main();
});