var	canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	width = 1300,
	height = 600,
	player = {
		x : 500,
		y : 500,
		width : 16,
		height : 21,
		velX : 0,
		velY : 0,
        jumping : false,
        grounded : false 
	},
	background = {
		x : 0,
		y : 0,
		width : 5*width,
		height : height,
		velX : 0,
	},
	start = Date.now(),
	time = 0,
	slowdown = 1;

    canvas.width = width;
    canvas.height = height;
function drawBackground() {
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = "lightBlue";
	ctx.fillRect(background.x, background.y, background.width, background.height);
}

function timeCount() {
	now = Date.now();
	time = (now - start)/1000;
}
