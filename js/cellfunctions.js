var timer = null;

/**
 * Start timer for iteration
 */
function startTimer() {
	timer = setInterval(function() { iterate(1); }, 1000/SPEED);
}


/**
 * Stop iteration timer
 */
function stopTimer() {
	clearInterval(timer);
	timer = null;
}
 

/**
 * Gets the number of alive neighbors around a cell
 * @param (HTMLObject) cell: The cell to consider
 * @return (Integer): Number of neighbors alive
 */
function numAliveNeighbors(cell) {
	var nl = getNeighbors(cell);
	var num = 0;
	for(var i = 0; i < nl.length; i++) {
		if(nl[i] !== null && nl[i].className == "active") num++; // TODO: Validation
	}
	
	return num;
}

/** 
 * Get an array of all the neighbors of a cell
 * @param (HTMLObject) cell: The cell of which to get the neighbors
 * @return (Array): an array of all the neighbors of cell (as HTMLObjects). If a neighbor does not
 * 	exist (e.g. top left neighbor of cell id:0_0), then a null is put in its place in the array.
 */
function getNeighbors(cell) {
	if(cell === null) {
		return;
	}

	var neighbors = new Array();
	var cstr = cell.id.split("_");
	var row = parseInt(cstr[0]);
	var col = parseInt(cstr[1]);
	
	// create a dummy cell for neighbors outside the boundary
	var dummy = document.createElement("TD");
	dummy.id = "dummy";
	
	var c; // current cell
	for(i = row-1; i <= row+1; i++) {
		for(j = col-1; j <= col+1; j++) {
			c = document.getElementById(i + "_" + j);
			if(c !== null) neighbors.push(c);
		}
	}
	
	// don't count self
	neighbors.splice(neighbors.indexOf(cell),1);
	
	return neighbors;
}

/**
 * Gets the number of neighbors of a cell
 * @param (HTMLObject) cell: The cell in consideration
 * @return (Integer): Number of neighbors of said cell
 */
function getNumNeighbors(cell) {
	var n = getNeighbors(cell);
	var c = 0;

	// Some elements of n may be null, so we don't want to count those
	for(var i = 0; i < n.length; i++) {
		if(n[i][j] !== null) c++;
	}
	
	return c;
}

/**
 * Manually activates a cell
 * @param (Integer) row: the row of the cell
 * @param (Integer) col: the column of the cell
 */
function activate(row, col) {
	var c = document.getElementById(row + "_" + col);
	
	// TODO: Try catch?
	if(c !== null) {
		c.className = "active";
	}
}


/**
 * Manually deactivates a cell
 * @param (Integer) row: the row of the cell
 * @param (Integer) col: the column of the cell
 */
function deactivate(row, col) {
	var c = document.getElementById(row + "_" + col);
	if(c !== null) {
		c.className = "inactive";
	}
}

/** 
 * Toggles whether a cell is active or not
 * @param (HTMLObject) cell: the cell to toggle
 */
 
/**
 * TODO: Validation
 */
function toggleCell(cell) {
	if(cell.className == "active") {
		cell.className = "inactive";
	}
	else {
		cell.className = "active";
	}
}

function clearGrid() {
	var actives = Array.prototype.slice.call(document.getElementsByClassName("active"));
	var inactives = Array.prototype.slice.call(document.getElementsByClassName("inactive"));
	
	for(var i in actives) {
		actives[i].removeAttribute('class');
	}
	
	for(var i in inactives) {
		inactives[i].removeAttribute('class');
	}
	
	stopTimer();
	resetIterations();
	
}

/**
 * Returns a list of all active cells
 * @return (NodeList): NodeList of HTMLObjects that are class = 'active'
 */
function getActiveCells() {
	return document.getElementsByClassName("active");
}

/**
 * Steps up/down the Iteration counter on frontend
 * @param (Integer) amt: Amount to step up or down the iteration
 */
function iterationStep(amt) {
	amt = Math.round(amt);
	var inc = document.getElementById("iteration");
	inc.value = parseInt(inc.value) + amt;
}

/**
 * Reset iteration counter
 */
function resetIterations() {
	var inc = document.getElementById("iteration");
	inc.value = 0;
}

/**
 * Sets the FPS to a user-defined value
 * @param (Integer) value: The value to set FPS
 */
function setFPS(value) {
	SPEED = value;
	if(timer !== null) { // timer is running, OK to restart
		timer = setInterval(function() { iterate(1); }, 1000/SPEED);
	}
}

/** 
 * Performs one or more iteration(s) of Life
 * @param (Integer) steps: num. of iterations to perform.
 */
function iterate(steps) {
	if(steps <= 0) return;

	var cells = new Array();
	var cellStates = new Array(); // bool duplicate representation of var cells
	var actives = getActiveCells();
	var neighbors = new Array();
	
	var temp;
	for(var i = 0; i < actives.length; i++) {
		temp = getNeighbors(actives[i]);
		while(temp.length > 0) {
			if(cells.indexOf(temp[temp.length-1]) == -1) { 
				c = temp.pop();
				if(c.className == 'active') cellStates.push(true);
				else cellStates.push(false);
				cells.push(c);
			}
			else temp.pop(); // ignore it since it's a duplicate
		}
	}
	
	for(var i = 0; i < actives.length; i++) {
		if(cells.indexOf(actives[i]) == -1) { 
			cells.push(actives[i]);
			cellStates.push(true);
		}
	}
	
	// tag the cells to make inactive/active
	for(var i = 0; i < cells.length; i++) {
		if(cells[i].className == 'active') { // the cell is currently alive.
			var numNeighbors = numAliveNeighbors(cells[i]);
			switch(numNeighbors) {
				case 0:
				case 1:
				case 4:
				case 5:
				case 6: 
				case 7: 
				case 8: cellStates[i] = false; break;
				case 2: 
				case 3: break; // keep cell alive
			}
		}
		else { // cell is dead
			if(numAliveNeighbors(cells[i]) == 3) cellStates[i] = true;
		}
	}
	
	for(var i = 0; i < cellStates.length; i++) {
		if(cellStates[i]) { // make corresponding cell active
			cells[i].className = 'active';
		}
		else {
			cells[i].className = 'inactive';
		}
	}
	
	iterationStep(1);
	
	iterate(steps-1);
}