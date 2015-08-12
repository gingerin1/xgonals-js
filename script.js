var canvas = document.getElementById('fullscreen');


function setSize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}


function matrixMul(rotationArray, oldArray, currentArray) {
	var helpArray = [oldArray[0] - currentArray[0], oldArray[1] - currentArray[1]];

	var x = rotationArray[0][0] * helpArray[0] + rotationArray[0][1] * helpArray[1];
	var y = rotationArray[1][0] * helpArray[0] + rotationArray[1][1] * helpArray[1];
	return [currentArray[0] + x, currentArray[1] + y];
}

function paint() {
	setSize();
	var ctx = canvas.getContext('2d');
	var xL = canvas.width;
	var yL = canvas.height;
	var k = 60;

	var vertices = 111;
	var length = yL/2 * (60/(vertices*k));

	var old = [xL/2 - length/2, yL/2 + vertices/8*length/2];
	var current = [xL/2 + length/2, yL/2 + vertices/8*length/2];
	var temporary = [];
	var attribute = 180 - 720/vertices;
	var radians = Math.PI*attribute/180;
	var rotationMatrix = [[Math.cos(radians), -Math.sin(radians)],[Math.sin(radians), Math.cos(radians)]];

	//s:a ratio
	var ratio = 2*Math.sin(radians/2);

	ctx.beginPath();
	ctx.moveTo(old[0], old[1]);
	for(var i=0; i<vertices; i++) {
		//ctx.lineTo(current[0], current[1]);
		//alterned:

		ctx.moveTo(old[0] - (current[0] - old[0])*k, old[1] - (current[1] - old[1])*k);
		ctx.lineTo(current[0] + (current[0] - old[0])*k, current[1] + (current[1] - old[1])*k); 
		/*
		ctx.moveTo((2*old[0] - current[0]), (2*old[1] - current[1]));
		ctx.lineTo((2*current[0] - old[0]), (2*current[1] - old[1])); 
		*/
		ctx.moveTo(current[0], current[1]);
		//end of alterned
		temporary = matrixMul(rotationMatrix, old, current);
		old = current;
		current = temporary;
	}
	

	ctx.stroke();
}