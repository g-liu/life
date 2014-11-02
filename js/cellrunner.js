var ROWS = 40;
var COLS = 40;
var CELLSIZE = 15;
var SPEED = 15; // frames per second

var colony; // bool. array

var isMouseDown = false;
document.onmousedown = function() { isMouseDown = true; }
document.onmouseup   = function() { isMouseDown = false; } 


function init() {
	
	// initialize grid (<TABLE>) and array colony concurrently
	var tbl = document.getElementById("celltable");
	colony = new Array(ROWS);
	
	for(var i = 0; i < ROWS; i++) {
		var r = document.createElement("TR");
		r.id = "row" + i;
		
		colony[i] = new Array(COLS);
		
		for(var j = 0; j < COLS; j++) {
			var d = document.createElement("TD");
			d.id = i + "_" + j;
			d.style.width = CELLSIZE;
			d.style.height = CELLSIZE;
			d.onclick = (function() {
				return function() {
					toggleCell(this);
				}
			})();
			
			d.onmousemove = (function() {
				return function() {
					if(isMouseDown) {
						// todo: console.log action
						this.className = 'active';
					}
				}
			})();
			
			r.appendChild(d);
			
			colony[i][j] = false;
		}
		tbl.appendChild(r);
	}
	
	document.getElementById("fps").value = SPEED;
	
	activate(3,3);
	activate(3,4);
	activate(4,3);
	activate(4,4);
	
}

window.onload = init;
