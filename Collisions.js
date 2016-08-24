function collisions() {
    player.grounded = false;
    for (var count = 0; count < obstacles.length; count++) {
    	ctx.fillStyle = "black";
        ctx.fillRect(obstacles[count].x, obstacles[count].y, obstacles[count].width, obstacles[count].height);

        var obstacleCollision = collCheck (player, obstacles[count]);
        if (obstacleCollision === "left" || obstacleCollision === "right") 
            player.velX = 0;
    
        else if (obstacleCollision === "bottom" && player.velY < 0) 
            player.velY *= -0.5;

        else if (obstacleCollision === "top")
        if(player.velY >= 0) {
            player.grounded = true;
            player.jumping = false;
        }
    }

    for(var count = 0; count < enemies.length; count++) {
		ctx.fillStyle = "blue";
		ctx.fillRect(enemies[count].x, enemies[count].y, enemies[count].width, enemies[count].height);   

		var enemyCollisions = collCheck (player, enemies[count]);
        if (enemyCollisions === "left" || enemyCollisions === "right") 
            player.velX = 0;

        else if (enemyCollisions === "top")
	        if(player.velY >= 0) {
	            player.grounded = true;
	            player.jumping = false;
	        }	

		for (var num = 0; num < enemyBoundries.length; num++) {	
			var rebound = collCheck (enemies[count], enemyBoundries[num]);
			if (rebound)
            	enemies[count].velX *= -1;
		}

		for(var num = 4; num < obstacles.length; num++) {
			var enemyObsCollisions = collCheck (enemies[count], obstacles[num]);
			if (enemyObsCollisions === "left" || enemyObsCollisions === "right") 
            	enemies[count].velX *= -1;
		}

		if(sword) {
			var swordCollision = collCheck(sword, enemies[count]);
	        if (swordCollision) {
	        	enemies.splice(count, 1);
	        	timelog.splice(count, 1);
	        	path.splice(count, 1);
	        }		
	    }
	}	
}

function collCheck(object1, object2) {
    var delX = (object1.x + (object1.width/2)) - (object2.x + (object2.width/2)),
        delY = (object1.y + (object1.height/2)) - (object2.y + (object2.height/2)),
        halfWidths = (object1.width/2) + (object2.width/2),
        halfHeights = (object1.height/2) + (object2.height/2),
        collDir = null;

    if (Math.abs(delX) < halfWidths && Math.abs(delY) < halfHeights) { 
		var xCheck = halfWidths - Math.abs(delX),             
			yCheck = halfHeights - Math.abs(delY);         
		if (xCheck + 7  >  yCheck) {
            if (delY > 0) {
                collDir = "bottom";
                object1.y += yCheck + 0.001;
            } 
			else {
                collDir = "top";
                object1.y -= yCheck + 0.001;
            }
        } 
		else {
            if (delX > 0) {
                collDir = "right";
                object1.x += xCheck + 0.001;
            } 
			else {
                collDir = "left";
                object1.x -= xCheck + 0.01;
            }
        }
    }
    return collDir;
}