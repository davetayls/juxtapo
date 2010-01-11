juxapo Installation
===================
View online at juxtapo.net

I have designed juxtapo to be as simple as possible to integrate and use 
and so this will be short:

1. Download the latest version
2. Extract the files in to your website root 
   (doesn't need to be in the root, just needs to be accessible)
3. Include a script reference to the juxtapo.js file within your page

Initial Setup
=============

Juxtapo gets it's settings from the juxtapo.config.js file within 
the juxtapo directory. More in depth customisation details can be
found on the juxtapo website.

1. Setting the default overlay styles

	You will need to tweak the default image overlay styles to match 
	the size and positioning of your designs. This example default styles 
	positions a 900px wide the image centrally on the page:

	juxtapo.designs.LayoutTemplate.defaultStyles = { 
		position: 'absolute', 
		'z-index': '2000', 
		top: '0px', 
		left: '50%', 
		'margin-left': '-450px' 
	};

2. For each page which has a corresponding design image add the following:

	juxtapo.addTemplate(pageUrl,designUrl);

	@param pageUrl {String}
	this is the absolute or partial url of the page which you are matching a design to. 
	juxtapo compares the url of the browser to these and when it finds a match it will 
	default to the design linked
	
	here are some examples:
	- http://juxtapo.net/sample/design1.htm
	- /sample/design1.htm
	- design1.htm
	
	if you are using juxtapo on a static site then you would use something like the 
	following for a file located at: c:\juxtapo\sample\design1.htm

	- to match any file called design1.htm you could use "design1.htm"
	- to only match design1.htm files within the sample folder use "/sample/design1.htm"
	
	you will notice this is the same as if you were using it within a website url.
	
	@param designUrl {String}
	the designUrl is the location of the image file which you want to overlay on to your page. 
	This will be placed as entered here in to the src of the img tag
	