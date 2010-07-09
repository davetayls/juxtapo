Juxtapo
Front End Tools: JavaScript Library
http://juxtapo.net/

Copyright (c) 2010 Dave Taylor (@davetayls), http://the-taylors.org
This source code is subject to terms and conditions of the New BSD License.
A copy of the license can be found in the license.txt file at the root of this distribution.

If you find this software useful please support it's development by 
donating at http://github.com/davetayls/juxtapo.

What is juxtapo
===============
In browser tools using javascript to assist while you're turning designs in to html\css.

The core library is designed to be basic and fast to get up and running and gives:

	* Overlays with keyboard nudging and positioning
	* Auto refresh

It has a plugin api which allows for any developer to extend the core functionality.
Currently the following plugin concepts have been created:

	* qunit: Allows for in browser unit testing using the qunit library
	* Google Spreadsheets: Get your design templates and template metadata from a Google spreadsheet
	* Design Info: Show the positioning and size of the current design
	* Views: Different displays for the template thumbnails	
	
Juxtapo is designed to be as simple as possible to integrate and use.
If you have any issues with installation please contact us.

Installation
------------

	1. Download the latest version
	2. Extract the files in to your website root 
	   (doesn't need to be in the root, just needs to be accessible)
	3. Include a script reference to the juxtapo.js file within your page
	4. Copy and paste the juxtapo.config.js file from the core directory
	5. Edit the juxtapo.config.js file and add your templates

Pre-requisites
--------------
juxtapo currently utilises the jQuery library for much of it's functionality.
If you don't already have this library included within your page then you will 
need to add a reference to it. It has been added to the lib folder so you don't
have to download it.

Initial Setup
-------------
Juxtapo gets it's settings from the juxtapo.config.js file within 
the juxtapo directory.

### Setting the default overlay styles

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

### Add templates

For each page which has a corresponding design image add the following within the juxtapo.initConfig section provided:

	// Links a single page url to a template image
	juxtapo.addTemplate('/path/to/page', '/path/to/image.png');

	// Links multiple page urls to a template image
	juxtapo.addTemplate(
	  ['/path/to/page','/path/to/other/page'], 
	  '/path/to/image.png'
	);

#### pageUrl (String)
this is the absolute or partial url of the page which you are matching a design to. 
juxtapo compares the url of the browser to these and when it finds a match it will 
default to the design linked.
	
here are some examples:

	*	../design1.htm (relative to the juxtapo.js file location)
	*	http://juxtapo.net/sample/design1.htm
	*	/sample/design1.htm
	*	design1.htm

if you are using juxtapo on a static site then best practice is to use a path 
relative to the juxtapo.js file ie: "../../design1.htm"
	
#### designUrl (String)
the designUrl is the location of the image file which you want to overlay on to your page. 
This will be placed as entered here in to the src of the img tag

#### settings (object) optional
This is a key/value object containing any style tweaks to be applied to the default 
overlay styles and any data related to your template. Here is an example:

	{ 
	  style: { top: '-10px' }, 
	  data:  { status: 'complete' }
	}

For more detailed information see the [addTemplate specification within the API docs](/docs/api/symbols/juxtapo.html#.addTemplate)
	
More information
---------------------------------------------------------
The juxtapo project is still in its early stages so please inform me of any errors or bugs
you come across at http://github.com/davetayls/juxtapo.

If you would like to contribute to the project please let me know by posting a message on github.

License
---------------------------------------------------------
Copyright (c) 2010, Dave Taylor

This source code is subject to terms and conditions of the New BSD License.<br />
A copy of the license can be found in the license.txt file at the root of this distribution.

If you cannot locate the New BSD License, please send an email to dave@the-taylors.org.<br />
By using this source code in any fashion, you are agreeing to be bound by the terms of the New BSD License.<br />
You must not remove this notice, or any other, from this software.

Thanks for using Juxtapo,<br />
Dave Taylor