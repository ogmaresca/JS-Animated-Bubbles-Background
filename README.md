# Javascript Animated Bubbles Background
This is a JS script that creates a number of moving bubbles (1/45000 of the amount of pixels in the window by default) that mimics the animated wallapers introduced in iOS 7. The bubbles will run as long as the page is open, and individual bubbles will reset if they leave the bounds of the window.

##Screenshots
![Screenshot](https://raw.github.com/ggodone-maresca/JS-Animated-Bubbles-Background/master/screenshot.png)
To see it in action, download this repository and open <code>page.html</code> in a web browser.

##How to add it to your own page
First, add the CSS file to your page by adding the following to the <code>&lt;head&gt;</code> element:
<pre><code>&lt;link rel="stylesheet" href="movingbubbles.css" type="text/css" /&gt;</code></pre>
Then, add the Javascript file to your page by adding the following to the &lt;<code>head</code>&gt; element:
<pre><code>&lt;script src="movingbubbles.js" type="text/javascript"&gt;&lt;/script&gt;</code></pre>

##Supports
Any browser that supports <code>opacity</code> (for the fade-in of bubbles), <code>hsla</code> colors (for bubble backgrounds), <code>border-radius</code> (for round bubbles), and <code>box-shadow</code> (for the bubble glow) should be able to properly see this, so it should work on any modern browser and IE9+. This has has been tested to work on Firefox and Chrome.

##How to change colors
For the CSS background, if you wish to keep the background, you just need to change the colors in the <code>background-color</code> and <code>background-image</code> rules for the <code>html</code> and <code>body</code> elements in <code>movingbubbles.css</code>.

For the bubbles, first open <code>page.html</code> in a web browser and play around with the setting sliders (Firefox, Chrome, and IE11+ only). After finding a setting you like, change the respective value in the <code>bubbleOptions</code> variable in <code>movingbubbles.js</code>. You can change the hue, saturation, and brightness, as well as their random variances, the opacity and the minimum opacity, the tick speed, and the density. The only bubble setting that does not directly correspond to a variable in the <code>bubbleOptions</code> variable is the density. For the density, set the <code>bubbleOptions.ratio</code> variable to 120000 - (density * 1000).
