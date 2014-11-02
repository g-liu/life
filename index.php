<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Conway's Game of Life</title>
	<script type="text/javascript" src="js/cellfunctions.js"></script>
	<script type="text/javascript" src="js/cellrunner.js"></script>
	
	<link href="css/style.css" rel="stylesheet" type="text/css" />
</head>
<body>
	<p>A demonstration of the popular Conway's Game of Life, with JavaScript</p>
	
	<p>Conway's Game of Life is determined as follows. Given an arbitrary size grid where some
	   cells are "live",</p>
	<ol>
		<li>Any live cell with fewer than two live neighbours dies, as if caused by under-population;</li>
		<li>Any live cell with two or three live neighbours lives on to the next generation;</li>
		<li>Any live cell with more than three live neighbours dies, as if by overcrowding; and</li>
		<li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
	</ol>
	
	<p>Life is a very popular programming project, and is a fine example of cellular automaton simulation.</p>
	
	<table id="celltable">
	
	</table>
	
	<form id="controls" name="controls">
		<input type="button" value="Start" onclick="startTimer();" />
		<input type="button" value="Stop" onclick="stopTimer();" />
		
		<input type="button" value="Step backward" onclick="void(0);" />
		<input type="button" value="Step forward" onclick="iterate(1);" />
		<label for="iteration">Iteration #</label>
		<input type="text" id="iteration" size="4" readonly value="0" />
		
		<label for="fps">Set FPS: </label>
		<input type="number" id="fps" size="3" min="0" max="127" onchange="setFPS(this.value);"/>
		
		<input type="button" value="Reset grid" onclick="clearGrid();" />
	</form>
	<!-- Quantcast Tag -->
	<script type="text/javascript">
		var _qevents = _qevents || [];

		(function() {
		var elem = document.createElement('script');
		elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";
		elem.async = true;
		elem.type = "text/javascript";
		var scpt = document.getElementsByTagName('script')[0];
		scpt.parentNode.insertBefore(elem, scpt);
		})();

		_qevents.push({
		qacct:"p-gxZBSGMCGZ6DU"
		});
	</script>

	<noscript>
		<div style="display:none;">
			<img src="//pixel.quantserve.com/pixel/p-gxZBSGMCGZ6DU.gif" border="0" height="1" width="1" alt="Quantcast"/>
		</div>
	</noscript>
	<!-- End Quantcast tag -->
</body>
</html>