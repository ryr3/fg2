var	enemies = [],
	path = [],
	timelog = [],
	list=[43,7,5,44,45,45,45,19];
for(var count = 0; count < list.length; count++) {
	var pizza=list[count];	
	enemies.push({
		x : random(obstacles[pizza].x, obstacles[pizza].x + obstacles[pizza].width - 16),
		y: obstacles[pizza].y - 20,
		width: 16,
		height: 20,
		velX: Math.round(random(0, 1)) - 0.5,
		velY: 0,
		sight: false,
		firing: false
	});
	timelog[count - 4] = null;
	path[count - 4] = null;
}

function random(min, max) {
	return min + (max - min)*Math.random();
}
