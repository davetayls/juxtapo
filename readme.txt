
juxtapo
Front End Tools: JavaScript Library
http://juxtapo.net/

Copyright (c) 2010 David Taylor (@davetayls), http://the-taylors.org
Licensed under the GNU v3 license.
http://www.gnu.org/licenses/gpl.html

If you find this software useful please support it's development by 
donating at http://github.com/davetayls/juxtapo.

What is juxtapo
=========================================================
juxtapo has two streams at the moment.

1. In browser tools using javascript to assist while you're turning designs in to html\css.

	The core library is designed to be basic and fast to get up and running and gives:
	- Overlays with keyboard nudging and positioning
	- Auto refresh
	
	It has a plugin api which allows for any developer to extend the core functionality.
	Currently the following plugin concepts have been created:
	* qunit: Allows for in build unit testing using the qunit library
	* Google Spreadsheets: Get your design templates and template metadata from a Google spreadsheet
	* Design Info: Show the positioning and size of the current design
	* Views: Different displays for the template thumbnails
	
2. 	Ease the management of your javascript by providing a framework for working with and deploying JavaScript
	
	This enables you to split your javascript in to separate files but only reference and use a central combiner js file
	to link them all while developing.
	
	The combiner can then be run on deployment to join all the included files in to one large js file.
	
	You can have as many root combiners as you wish to give you complete control over which files get combined.

	
	
Front End Tools: Installation
=========================================================
juxtapo is designed to be as simple as possible to integrate and use.
If you have any issues with installation please contact us.

1. Download the latest version
2. Extract the files in to your website root 
   (doesn't need to be in the root, just needs to be accessible)
3. Include a script reference to the juxtapo.js file within your page
4. Copy and paste the juxtapo.config.js file from the core directory
5. Edit the juxtapo.config.js file and add your templates

Pre-requisites
==============
juxtapo currently utilises the jQuery library for much of it's functionality.
If you don't already have this library included within your page then you will 
need to add a reference to it. It has been added to the lib folder so you don't
have to download it.

Initial Setup
=============
Juxtapo gets it's settings from the juxtapo.config.js file within 
the juxtapo directory.

1. Setting the default overlay styles

	You will need to tweak the default image overlay styles to match 
	the size and positioning of your designs. This example default styles 
	positions a 900px wide the image centrally on the page:

	juxtapo.setDefaultStyles({ 
		position: 'absolute', 
		'z-index': '2000', 
		top: '0px', 
		left: '50%', 
		'margin-left': '-450px' 
	});

2. For each page which has a corresponding design image add the following within the juxtapo.initConfig section provided:

	juxtapo.addTemplate(pageUrl,designUrl,settings);

	@param pageUrl {String}
	this is the absolute or partial url of the page which you are matching a design to. 
	juxtapo compares the url of the browser to these and when it finds a match it will 
	default to the design linked
	
	here are some examples:
	* http://juxtapo.net/sample/design1.htm
	* /sample/design1.htm
	* design1.htm
	
	if you are using juxtapo on a static site then you would use something like the 
	following for a file located at: c:\juxtapo\sample\design1.htm

	- to match any file called design1.htm you could use "design1.htm"
	- to only match design1.htm files within the sample folder use "/sample/design1.htm"
	
	you will notice this is the same as if you were using it within a website url.
	
	@param designUrl {String}
	the designUrl is the location of the image file which you want to overlay on to your page. 
	This will be placed as entered here in to the src of the img tag
	
	@param settings {object} optional
	This is a key/value object containing any style tweaks to be applied to the default 
	overlay styles and any data related to your template.

	for more detailed information see the docs withn the juxtapo directory:
	/docs/symbols/juxtapo.html#.addTemplate
	
Combiner Installation
=========================================================
1. 	Copy the contents of the /combiner/example-combiner.js for each file you want to 
	split in to separate files.
2.	Change the combinerFileName to filename of the combiner javascript file.
3.	Add includes.push("javascriptfile.js") lines for each of the files you want to
	include with this file.

On deployment:    
    Copy your javascript files in to a separate deployment directory 
	and use this with the juxtapo-combiner.exe file.
    eg: juxtapo-combiner.exe "c:\full\path\to\jsdirecory\"
	
	This will add all the contents of the included javascript files in to
	the root combiner file and delete the referenced files.

	
More information
=========================================================
The juxtapo project is still in its early stages so please inform me of any errors or bugs
you come across at http://github.com/davetayls/juxtapo.

If you would like to contribute to the project please let me know by posting a message on github.
