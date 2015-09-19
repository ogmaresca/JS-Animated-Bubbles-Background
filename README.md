# JS-Animated-Bubbles-Background

Javascript Animated Bubbles Background
==================

This is a JS script that creates a number of moving bubbles (1/45000 of the amount of pixels in the window) that mimics the animated wallapers introduced in iOS 7. The bubbles will reset if they leave the bounds of the window, and it'll change with window resizes, but the amount of bubbles won't change without refreshing the page.

##How to add it to your own page
First, add the Javascript file to your page, either by using movingbubbles.js or adding it directly into the page. Then in the HTML add
<pre><code>onload="instantiate();"</pre><code>
as an attribute of the body element. Then add
<pre><code><div id="bubbleContainer"></div></pre></code>
at the bottom of the body element. For CSS, the following CSS is added to ensure that the background covers the entire page, and that the bubbles don't cover other elements:
<pre><code>
	html, body {
		padding:0;
		margin:0;
		min-height:100%;
		background-color:#50afe4;
		background-image:linear-gradient(to bottom, #57B7E0, #3C799D);
		background-attachment:fixed;
	}
	html * { z-index: 1; position:relative; }
</pre></code>
This CSS code also includes a CSS gradient background that matches the bubble colors.
And this CSS makes the bubbles cover the entire background and that the bubbles are round:
<pre></code>
	#bubbleContainer {
		z-index:0;
		overflow:hidden;
		position:fixed;
		height:100%;
		width:100%;
	}
	#bubbleContainer div {
		position:fixed;
		z-index:-1;
		border-radius:1000px;
	}
<pre></code>

##Supports
Any browser that supports opacity (for fade-in of bubbles), HSLA colors (for bubble backgrounds), border-radius (for round bubbles), and box shadow (for the bubble glow) should be able to properly see this, so any modern browser and IE9+.

For the CSS gradient background any modern browser and IE10+ should be able to see it. This has only been tested on Firefox.

##How to change colors
For the CSS background, you just need to change the colors in background-color and background-image for the html and body elements, if you keep the background.

For the bubble colors, look for the morph() function in movingbubbles.js and find the relevant variables. The hue is set to be within 188-208, the saturation between 63%-73% the brightness between 57%-67%, and the color opacity between 0.1 and 0.433.

For hue, saturation, and brightness the value being added to the random number is the lower bound and the number being multiplied, when added to the value of the lower bound, is the upper bound. Hue values go between 0-255 and saturation and brightness go between 0 and 100. The opacity value goes between 0.0 and 1.0 and random numbers generate a floating point number between 0.1 and 1.0, so the upper bound number needs to divide the random number instead of multiply it.
