<<<<<<< HEAD
Soysauce
==========================
Original Author: Edward Gaba
Last Modified: 1/1/2013

About
--------------
Soysauce is a mobile-specific javascript widget package that expedites development.
=======
Soysauce (BETA)
==========================
Original Author: Edward Gaba

About
--------------
Soysauce is a mobile-specific javascript widget library.
>>>>>>> 1633f6608f2af119f71120b022b3d094f0bb7f3d

Widgets
--------------

<<<<<<< HEAD
These pre-built widgets are simple to use. Some widgets have additional options for extra effects and functionality.

### 1) Accordion

Accordions allow for hiding and showing content when necessary.

Options:

	1) overlay - provides a transparent overlay behind main content
	2) ajax - transfer JSON information from the same-domain
	3) tab - only one accordion open at a time per group
	4) slide - animate a slidedown effect
=======
These pre-built widgets are simple to use. Some widgets have additional options for extra effects and functionality. I will bundle these later, but to use for now you will need to include:

	soysauce.css
	fastclick.js
	base.js
	[your widget].js

### 1) Carousel

Carousels allow for "slideshow" effects for images.

Required Attributes:

	1) ss-widget="carousel"
	2) ss-component="item"

Usage:

	<div ss-widget="carousel">
		<img ss-component="item" src="http://placehold.it/600x400/cdcdcd">
		<img ss-component="item" src="http://placehold.it/300x200/cdcdcd">
		<img ss-component="item" src="http://placehold.it/600x400/cdcdcd">
		<img ss-component="item" src="http://placehold.it/600x400/cdcdcd">
	</div>

Additional Options:

	1) autoscroll - timer based autoscrolling, default is 5000ms. To change, use [ss-autoscroll-interval="x"]
	2) fullscreen
	3) peek
	4) finite
	5) noswipe
	6) zoom - coming soon

### 2) Accordion

Accordions allow for hiding and showing content when necessary.

Required Attributes:

	1) ss-widget="accordion"
	2) ss-component="button"
	3) ss-component="content"
>>>>>>> 1633f6608f2af119f71120b022b3d094f0bb7f3d

Usage:

	<div ss-widget="accordion" ss-options="tab slide">
		<h1 ss-component="button">BUTTON</h1>
		<div ss-component="content">
			<ul>
				<li>content</li>
				<li>content</li>
				<li>content</li>
				<li>content</li>
			</ul>
		</div>
	</div>

<<<<<<< HEAD
### 2) Lateload
=======
Options:

	1) overlay - provides a transparent overlay behind main content
	2) ajax - transfer JSON information from the same-domain
	3) tab - only one accordion open at a time per group
	4) slide - animate a slidedown effect

### 3) Lateload
>>>>>>> 1633f6608f2af119f71120b022b3d094f0bb7f3d

Lateloading is an optimization technique. There are two events that get fired as browser processes the page, "DOMContentLoaded", which is fired on the document object, and "load," which is fired on the window object.

The process goes like this:

	1) User hits the page and waits
	2) "DOMContentLoaded" occurs and user can see the page processing
	3) "load" occurs and user doesn't see the page loading anymore

##### "DOMContentLoaded" event

It's recommended load content on this event for hidden, but necessary content such as non-primary images in a carousel.

Usage:

	<img ss-dcl-src="/images/brownie.png">

##### "load" event

It's recommended to load all unnecessary images/scripts on this event, such as images in an accordion or images in a popup.

Usage:

	<img ss-ll-src="/images/brownie.png">

<<<<<<< HEAD
=======


>>>>>>> 1633f6608f2af119f71120b022b3d094f0bb7f3d
Notes
--------------
* This widget package requires jQuery 1.7+

