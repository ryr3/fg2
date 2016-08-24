var	left = 0,
	right = 0,
	jump = 0,
	fall = 0,
	attacking = false,
	
	direction = "right",
    speed = 4.5,
    slip = 0.9,
	jumpSpeed = 8,
    gravity = 0.3;

document.body.addEventListener("keydown", function (e) {
	if(e.keyCode == 37) {
		left = 1;
		direction = "left";
	}
	if (e.keyCode == 38) {
		jump = 1;
		//direction = "up";
	}
	if(e.keyCode == 39) {
		right = 1;
		direction = "right";
	}	
	if(e.keyCode == 40) {
		fall = 1;
		//direction = "down";
	}	
	if(e.keyCode == 88) 
		attacking = true;
});

document.body.addEventListener("keyup", function (e) {
	if(e.keyCode == 37) 
		left = 0;
	if (e.keyCode == 38)
		jump = 0; 
	if (e.keyCode == 39)
		right = 0;
	if(e.keyCode == 40)
		fall = 0;
	if(e.keyCode == 88)
		attacking = false;

});

function controls() {
	//CONTROLS
	if (jump)
		if (!player.jumping && player.grounded) { 								//
			player.jumping = true;
			player.grounded = false;
			player.velY = -jumpSpeed;
		}
	if( !(left && right) ) {
		if (right) {
			if (player.x > width/2.5 && background.x + background.width > width + 23) {
				if (background.velX < speed)
				background.velX += 0.6;
			}
			else if (player.velX < speed){
				background.velX = 0;
				player.velX += 0.6;		      
			}
		}  
		if (left) {
			if(player.x < width/2.5 && background.x < -23) {
				if (background.velX > -speed)
				background.velX -= 0.6;
			}
			else if (player.velX > -speed){
				player.velX -= 0.6;
				background.velX = 0;
			}
		}
	}
	if (fall) {
		if(player.velY < 5)
		player.velY += 3; 
	}

	if(!(jump || left || right || fall)) {
		if(slowdown < 5)
			slowdown = 5;
		slip = 0.985;
	}
	else if (slowdown > 1) {
		slowdown = 1;
		slip = 0.9;
	}
	
	//VELOCITY CHANGES
	if(jump)
		if(player.velY < -6.5)
		player.velY -= 0.2;
	player.velY += gravity/slowdown;
	if(player.grounded)
		player.velY = 0;

	for(var num = 0; num < enemies.length; num++) {	
		if(enemies[num].sight && Math.abs(enemies[num].velX) > 0.01)
			enemies[num].velX *= slip;
		else if(!enemies[num].sight && Math.abs(enemies[num].velX) <= 0.5)
			enemies[num].velX /= slip/1.17;
	}

	background.velX *= slip;
	player.velX *= slip;
}

function update() {
	//PLAYER
	ctx.fillStyle = "green";
	ctx.fillRect (player.x, player.y, player.width, player.height);

	//POSITION CHANGE
	if(player.grounded)
		player.velY = 0;
	player.y += player.velY/slowdown;

	player.x += player.velX/slowdown;
	background.x -= background.velX/slowdown;
	for(var count = 4; count < obstacles.length; count++)
		obstacles[count].x -= background.velX/slowdown;
	for(var count = 0; count < enemies.length; count++) {
		if(!enemies[count].sight && enemies[count].x + enemies[count].width > 0 && enemies[count].x < width)
			enemies[count].x += enemies[count].velX/slowdown; 
		enemies[count].x -= background.velX/slowdown; 
	}
	for(var count = 0; count < enemyBoundries.length; count++)
		enemyBoundries[count].x -= background.velX/slowdown;
}