/**
 * Creates an animated bubble background
 * @author Gerard Godone-Maresca
 */

/*
 * An object that stores different settings for the bubbles
 */
var bubbleOptions = {
	maxBubbles     : 250,   //A bubble ceiling, for high resolution monitors
	timer          : -1,    //The interval time
	tick           : 100,   //The tick speed
	bubbles        : [],    //The array of bubbles
	hue            : 188,   //The hue
	hueRand        : 20,    //The hue variance
	saturation     : 63,    //The saturation
	saturationRand : 10,    //The saturation variance
	light          : 57,    //The lightness
	lightRand      : 10,    //The lightness variance
	opacityFactor  : 3,     //What Math.random() opacity should be divided by
	minOpacity     : 0.1,   //The minimum opacity
	ratio          : 45000, //The bubble:pixel ratio
	update		   : function(tick) { //Function to change the tick timer
		//Since IE8 and below don't support HSLA colors,
		//do nothing for these browsers
		if(!document.addEventListener) return;
		window.clearInterval(this.timer);
		if(!tick) tick = this.tick;
		if(!this.bubbles.length) this.bubbles = instantiateBubbles();
		var bubbles = this.bubbles;
		this.timer = window.setInterval(
			function() {
				for(var i = 0; i < bubbles.length; i++)
					bubbles[i].move();
			},
			tick
		);
	}
};

//Instantiate the bubble on page load
if(window.onload) {
	windowOnLoad = window.onload;
	window.onload = function() {
		windowOnLoad();
		bubbleOptions.update();
	}
} else window.onload = function() { bubbleOptions.update(); };

/**
 * instantiateBubbles creates the array of bubble objects, and adds them to <body>
 * @returns {Array} An array of bubbles
 */
function instantiateBubbles() {
	//The bubbles need a container element
	var bubbleContainer = document.getElementById("bubbleContainer");
	if(!bubbleContainer) {
		bubbleContainer = document.createElement('div');
		bubbleContainer.setAttribute('id', 'bubbleContainer');
		document.body.appendChild(bubbleContainer);
	}
	//Create the bubbles
	var bubbles = [];
	//The default number of bubbles is set to a ratio of 1 bubble to every 45,000 pixels (bubbleOptions.ratio)
	var bubbleLength = Math.floor(window.innerWidth*window.innerHeight/bubbleOptions.ratio);
	for(var i = 0; i < bubbleLength; i++) {
		var bubbleElem = document.createElement('div');
		bubbleElem.setAttribute('id', 'bubble'+i);
		bubbleContainer.appendChild(bubbleElem);
		bubbles.push(new Bubble(bubbleElem));
	}
	//Return the array of bubbles
	return bubbles;
}


/**
 * The Bubble class holds a div that should be located inside div#bubbleContainer
 * A Bubble has its own random hsla background color, box shadow, size, & position
 * It also moved by velocity with the move() function
 * Whenever the bubble moves outside of the page boundaries, it gets reset
 * @constructor
 * @this {Bubble}
 * @param {[object HTMLDivElement]} element The bubble <div> element
 */
function Bubble(element) {
	this.x = 0;			// X position
	this.y = 0;			// Y position
	this.xVel = 0;		// Velocity in the X direction
	this.yVel = 0;		// Velocity in the Y direction
	this.time = 0;		// The amount of ticks that has occured since the Bubble was created
	this.e = element;	// Store the element
	this.diam = 0;		// The size of the bubble
	
	//Set up the element
	this.create();
}

/**
 * create() sets the position and velocity of the bubble element.
 * It then sets a semi-random visual styling of a bubble
 * The styling being set is the size, background, box shadow, and opacity
 * @this {Bubble}
 */
Bubble.prototype.create = function() {
	//Reset counter
	this.time = 0;
	
	//Position
	this.x = Math.random() * window.innerWidth;
	this.y = Math.random() * window.innerHeight;
	
	//Random velocity
	this.xVel = (Math.random() * 4) - 2;
	this.yVel = (Math.random() * 4) - 2;

	//Set the size
	this.diam = Math.floor(Math.random() * 160) + 40;
	this.e.style.width=this.diam + "px";
	this.e.style.height=this.diam + "px";
	
	//Set the color, with default bubbleOptions it is a bluish color
	var hue = Math.floor(Math.random()*bubbleOptions.hueRand)
	          +bubbleOptions.hue;
	var saturation = Math.floor(Math.random() * bubbleOptions.saturationRand)
	                 + bubbleOptions.saturation;
	var light = Math.floor(Math.random()*bubbleOptions.lightRand)
	            + bubbleOptions.light;
	var opacity = Math.min( //The opacity must be <= 1
	                  Math.max( //The random opacity must be >= minOpacity
	                      Math.random()/bubbleOptions.opacityFactor,
	                      bubbleOptions.minOpacity
	                  ),
	                  1
	              );
	var hsla="hsla("+hue+","+saturation+"%,"+light+"%,"+opacity+")";
	this.e.style.backgroundColor = hsla;
	
	//Set the glow
	this.e.style.boxShadow= "0 0 "+ (Math.floor(Math.random()*10)+5)
	                        + "px "+hsla;

	//Start at 0 opacity for the bubble to fade in
	this.e.style.opacity = "0";
}

/**
 * move() moves the bubble based on its velocity
 * If it has been fewer than 10 ticks it needs to increase its opacity to 1
 * If the bubble has moved out of bounds it recreates the bubble
 * @this {Bubble}
 */
Bubble.prototype.move = function() {
	//If out of the window bounds recreate the bubble
	if(this.x + this.diam < 0 || this.x > window.innerWidth ||
	   this.y + this.diam < 0 || this.y - this.diam > window.innerHeight) {
		this.create();
	} else {
		//Set opacity
		if(this.time < 11) this.e.style.opacity = (this.time / 10);
		
		//Change position
		this.x += this.xVel;
		this.y += this.yVel;
		
		//Set the position via CSS
		this.e.style.left = Math.floor(this.x) + "px";
		this.e.style.top = Math.floor(this.y) + "px";
		
		//Increment counter
		this.time++;
	}
}
