var stage;
var max_fps = 60;

var sfx_powerup = "PowerUp";

var keys = {};
var KEYCODE_LEFT = 37, 
	KEYCODE_RIGHT = 39,
	KEYCODE_UP = 38, 
	KEYCODE_DOWN = 40;

var player;
var playerSpeed = 5; // Pixels per frame

// Canvase Init Function
function init() {
	loadSound();

	// EaselJS Demo
	stage = new createjs.Stage("gameCanvas");
	console.log(stage);

	var circle = new createjs.Shape();
	circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
	circle.x = 100;
	circle.y = 100;
	stage.addChild(circle);

	player = new createjs.Shape();
	player.graphics.beginFill("#ff0000").drawRect(0, 0, 30, 30);
	player.x = 100;
	player.y = 100;
	stage.addChild(player);

	// Text
	var title = new createjs.Text("Press Up, Down, Left & Right. Click the Circle.", "bold 20px Arial", "#ff7700");
	stage.addChild(title);

	// TweenJS Demo
	createjs.Tween.get(circle, { loop: true })
		.to({ x: 400 }, 1000, createjs.Ease.getPowInOut(4))
		.to({ alpha: 0, y: 75 }, 500, createjs.Ease.getPowInOut(2))
		.to({ alpha: 0, y: 125 }, 100)
		.to({ alpha: 1, y: 100 }, 500, createjs.Ease.getPowInOut(2))
		.to({ x: 100 }, 800, createjs.Ease.getPowInOut(2));

	createjs.Ticker.setFPS(max_fps);
	createjs.Ticker.addEventListener("tick", ticks);

	// SoundJS Demo
	circle.addEventListener('click', function(e) {
		playPowerup();
	});

	// Keyboard Listening
	this.document.onkeydown = keydown;
    this.document.onkeyup = keyup;
}

function ticks() {
	keyPressed();
	stage.update();
}

function keydown(e) {
	keys[e.keyCode] = true;
}

function keyup(e) {
	delete keys[e.keyCode];
}

function keyPressed() {

	if(keys[KEYCODE_LEFT]) { 
		movePlayer(-1 * playerSpeed, 0);
	} else if(keys[KEYCODE_RIGHT]) { 
		movePlayer(playerSpeed, 0);
	}

	if(keys[KEYCODE_UP]) { 
		movePlayer(0, -1 * playerSpeed);
	} else if(keys[KEYCODE_DOWN]) { 
		movePlayer(0, playerSpeed);
	}
}

function movePlayer(x, y) {
	if(insideBounds(player)) {
		player.x += x;
		player.y += y;
	} else {
		if(player.x < 0) {
			player.x = 0;
		} else if(player.x > stage.canvas.width) {
			player.x = stage.canvas.width;
		} 

		if(player.y > stage.canvas.height) {
			player.y = stage.canvas.height;
		} else if(player.y < 0) {
			player.y = 0;
		}
	}
}

function insideBounds(boundedObj) {
	var inside_x = false,
		inside_y = false;

	if(boundedObj.x >= 0 && boundedObj.x <= stage.canvas.width) {
		inside_x = true;
	}
	if(boundedObj.y >= 0 && boundedObj.y <= stage.canvas.height) {
		inside_y = true;
	}
	return inside_x && inside_y;
}

function loadSound() {
	createjs.Sound.registerSound("sfx/Powerup.wav", sfx_powerup);
}

function playPowerup() {
	createjs.Sound.play(sfx_powerup);
}

