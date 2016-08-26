var memory = [],
	bulletSpeed;

var sword;

function bulletPaths() {
	bulletSpeed = 20/slowdown;

	for(var num = 0; num < enemies.length; num++){
		if(!enemies[num].firing) {
			if (!timelog[num] || time - timelog[num] < 0.5 * Math.sqrt(slowdown)) {
				memory[num] = {
					x: player.x,
					y: player.y
				};		
				enemies[num].firing = false;
			}
			else enemies[num].firing = true;
		}

		memory[num].x -= background.velX/slowdown;
		var eCenter = {
				x: enemies[num].x + enemies[num].width/2,
				y: enemies[num].y + enemies[num].height/2
			};
			pCenter = {
				x: memory[num].x + player.width/2,
				y: memory[num].y + player.height/2
			};		

		if(enemies[num].firing) {
			if(!path[num])
				path[num] = {
					x: eCenter.x,
					y: eCenter.y
				};
			path[num].x -= background.velX/slowdown;
			bulletCreation(num, eCenter.x, eCenter.y, pCenter.x, pCenter.y);	
		}
		else {
			ctx.beginPath();
			ctx.strokeStyle = "violet";
			ctx.moveTo(eCenter.x, eCenter.y);
			ctx.lineTo(pCenter.x, pCenter.y);
			var sightBlock = sightCheck(eCenter.x, eCenter.y, pCenter.x, pCenter.y);
			if (!(enemies[num].x > width || enemies[num].x < 0)) {
				if(sightBlock !== "yes") {
					ctx.stroke();
					enemies[num].sight = true;
					if(!timelog[num])
						timelog[num] = time;
				} else {
					if(timelog[num]) 
						timelog.splice(num, 1, null);
					enemies[num].sight = false;
				}
			}
		}
	}
}

function sightCheck(enemyX, enemyY, playerX, playerY) {
	var slope = ( (playerY - enemyY)/(playerX - enemyX) ),
		coll;
	for(var count = 0; count < obstacles.length; count++) {
		var obstaclePos = [obstacles[count].y, obstacles[count].y + obstacles[count].height];

		for(var num = 0; num <= 1; num++)
			if(playerY != enemyY) {
				var xLine = enemyX + ( 1/slope )*(obstaclePos[num] - enemyY);
					
				if ((enemyY < obstaclePos[num]  &&  playerY > obstaclePos[num]) || (enemyY > obstaclePos[num]  &&  playerY < obstaclePos[num]))
				if(xLine > obstacles[count].x  &&  xLine < obstacles[count].x + obstacles[count].width) {
					coll = "yes";
					break;
				} 		
			}
		if(coll === "yes") 
			break;
	}
	if(coll)
		return coll;
	
	for(var count = 0; count < obstacles.length; count++) {
		var obstaclePos = obstacles[count].x;
		if(playerX != enemyX) {
			var yLine = enemyY + slope*(obstaclePos - enemyX);

			if ((enemyX < obstaclePos  &&  playerX > obstaclePos) || (enemyX > obstaclePos  &&  playerX < obstaclePos))
			if(yLine > obstacles[count].y  &&  yLine < obstacles[count].y + obstacles[count].height) {
				coll = "yes";
				break;
			} 		
		}
	}
	return coll;
}

function bulletCreation(num, enemyX, enemyY, playerX, playerY) {
	var	angle = Math.atan((playerY - enemyY)/(playerX - enemyX));

	if(playerX < enemyX) 
		var dir = -1;
	else var dir = 1;
	var coll = bulletCollision(path[num].x, path[num].y, angle, dir);

	if(player.dead) {
		alert("You Died");
		window.location.reload();
	}

	if(coll !== "yes") {
		path[num].y += bulletSpeed * dir * Math.sin(angle);
		path[num].x += bulletSpeed * dir * Math.cos(angle);
	} else {
		path.splice(num, 1, null);
		enemies[num].firing = false;
		player.dead = false;
		timelog.splice(num, 1, null);
	}	

	if(path[num]) {
		ctx.beginPath();
		ctx.strokeStyle = "red";
		ctx.moveTo(enemyX, enemyY);
		ctx.lineTo(path[num].x, path[num].y);
		ctx.stroke();
	}
}


function bulletCollision(bulletX, bulletY, angle, dir) {
	for(var pos = 0; pos <= 30; pos+= 15) {
		var xCheck = pos*dir*Math.cos(angle),
			yCheck = pos*dir*Math.sin(angle);	
		if(bulletX - xCheck > player.x && bulletX - xCheck < player.x + player.width && bulletY - yCheck > player.y && bulletY - yCheck < player.y + player.height)
			player.dead = true;
	}

	for(var pos = 0; pos <= 30; pos+= 5) {		
		var xCheck = pos*dir*Math.cos(angle),
			yCheck = pos*dir*Math.sin(angle);

		for(var num = 0; num < obstacles.length; num++)
			if(bulletX + xCheck > obstacles[num].x && bulletX + xCheck < obstacles[num].x + obstacles[num].width && bulletY + yCheck > obstacles[num].y && bulletY + yCheck < obstacles[num].y + obstacles[num].height) {
				return "yes";
				break;
			}
	}
}

function attack(direction) {
	if(attacking) {
		var playerX = player.x + player.width/2,
			playerY = player.y + player.height/2 - 4;
		if(direction == "left")
			var corr = -25;
		else var corr = 0;
		ctx.fillStyle = "red";
		ctx.fillRect (playerX + corr, playerY, 25, 2);
		sword = {
			x: playerX + corr,
			y: playerY,
			width: 25,
			height: 2
		}	
	}
	else sword = null;
}


/*function bulletCreation(num) {
	//for(var count = 0; count < 3; count++) {
		if(!bullets[num][0])
			bullets[num][0] = {
				x: enemies[num].x + enemies[num].width/2,
				y: enemies[num].y + enemies[num].height/2
			};
	//}
}*/

/*
					xI: eCenter.x,
					xF: eCenter.x,
					yI: eCenter.y
					yF: eCenter.y
*/



/*function bulletCollision(enemyX, bulletX, bulletY, angle) {
	var playerX = player.x + player.width/2,
		playerY = player.y + player.height/2;

	if(enemyX < playerX) {
		condition1 = playerX < bulletX && playerX > bulletX - 30*Math.cos(angle);
		//var playerY = player.y;
	}
	else {
		condition1 = playerX > bulletX && playerX < bulletX + 30*Math.cos(angle);
		//var playerY = player.y + player.height;
	}

	var	xLine = bulletX + (playerY - bulletY)/Math.tan(angle);

	if(condition1)
		if(xLine > player.x && xLine < player.x + player.width) {
			player.dead = true;
		}

}*/	
