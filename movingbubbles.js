/**
 * Animated Bubble Background
 * By Gerard Godone-Maresca
 */

var width;	// Width of the window
var height;	// Height of the window
var elem;	// Array of elements

/**
 * instantiate grabs the height and width of the browser for bubbles to use
 * It then creates an array of bubbles with the size proportional to (pixels
 * in window)/45,000
 * Finally, it makes a timer that calls update() every 100 milliseconds.
 */
function instantiate() {
	width = window.innerWidth;
	height = window.innerHeight;
	elem = new Array(Math.floor((width*height)/45000));
	var elements = "";
	for(i = 0; i < elem.length; i++) {
		elements += "<div id='bubble" + i + "'></div>";
	}
	//A number of elements are created and added to #bubbleContainer
	getID("bubbleContainer").innerHTML=elements;
	for(i = 0; i < elem.length; i++) {
		elem[i] = new bubble(getID("bubble" + i));
		elem[i].create();
	}
	timer = window.setInterval("update()", 100);
}

/**
 * update goes through each bubble and calls their move method
 */
function update() {
	width = window.innerWidth;
	height = window.innerHeight;
	for(i = 0; i < elem.length; i++) elem[i].move();
}

/**
 * bubble is a class that is meant to be contained in #bubbleContainer.
 * It is meant to be a div that has border radius and position:absolute set
 * A bubble has its own hsla background color, box shadow, size, & position
 * It also moved by velocity with the move function
 * @param element The document.getElementById of the bubble
 */
function bubble(element) {
	this.x = 0;			// X position
	this.y = 0;			// Y position
	this.xVel = 0;		// Velocity in the X direction
	this.yVel = 0;		// Velocity in the Y direction
	this.time = 0;		// The amount of ticks that has occured since being created
	this.e = element;	// Storing element
	this.diam = 0;		// The size of the bubble
	
	/**
	 * create sets the instance variables, and is required to be called after a bubble is created.
	 * it passes visual styling work to the morph function
	 */
	this.create = function() {
		this.time = 0; //Counter
		//Position
		this.x = Math.random() * width;
		this.y = Math.random() * height;
		//Random velocity
		this.xVel = (Math.random() * 4) - 2;
		this.yVel = (Math.random() * 4) - 2;
		this.morph(); //Set the style
	}
	
	/**
	 * move moves the bubble based on velocity
	 * If it has been 10 or less ticks it increments opacity
	 * If the bubble has moved out of bounds it recreates the bubble
	 */
	this.move = function() {
		if(this.x + this.diam < 0 || this.x > width ||
		(this.y + this.diam) < 0 || this.y - this.diam > height) {
			this.create(); //If out of the window bounds recreate the bubble
		}
		else {
			//Set opacity
			if(this.time < 11) this.e.style.opacity = (this.time / 10);
			//Change position
			this.x += this.xVel;
			this.y += this.yVel;
			//Set the position via CSS
			this.e.style.left = Math.floor(this.x) + "px";
			this.e.style.top = Math.floor(this.y) + "px";
			this.time++; //Increment counter
		}
	}
	
	/**
	 * morph sets the random visual styling of the bubble
	 * It sets the size, background, box shadow, and opacity
	 */
	this.morph = function() {
		//Set the size
		this.diam = Math.floor(Math.random() * 160) + 40;
		//if((this.x + diam) >= width) this.x -= diam;
		//if((this.y + diam) >= height) this.y -= diam;
		this.e.style.width=this.diam + "px";
		this.e.style.height=this.diam + "px";
		
		//Set the color, it is set to bluish colors
		var hue = Math.floor(Math.random()*20)+188;
		var saturation = Math.floor(Math.random()*10)+63;
		var light = Math.floor(Math.random()*10)+57;
		var opacity = (Math.random() / 3) + 0.1;
		var hsla="hsla("+hue+","+saturation+"%,"+light+"%,"+opacity+")";
		this.e.style.backgroundColor = hsla;
		
		this.e.style.boxShadow=("0 0 "+(Math.floor(Math.random()*10)+5)+
		"px "+hsla);//Set the glow
		//Start at 0 opacity for them to fade in
		this.e.style.opacity = "0";
	}
}

/**
 * getID() returns the HTML element of the specified ID, to shorten the document.getElementById() function.
 * @param id Id of the element, as a string.
 * @return The element with id of id is returned.
 */
function getID(id) { return document.getElementById(id); }
