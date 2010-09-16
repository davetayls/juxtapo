# Rivet #
Originally Juxtapo Combiner...we are currently converting all naming over

## 1. Overview ##

JavaScript needs to be separated in to separate files. This is what Rivet solves:

1.	I want to be able to split code in to appropriate sections so that i can save them across multiple files.
	*	this will make it easier to find code
	*	this will make code more modular and help to debug
2.	I only want one script reference within the html file even at dev time
	*	I don't want to annoy the back end devs with the hassle of different versions of the html head area
	*	I want to manage easily the order in which scripts are loaded and which scripts are grouped together.
	*	I want the dev markup to mimic the live environment as closely as possible
3.	I want a system which is flexible enough to allow me to specify which scripts get combined on deployment
	*	if there are sub sections to the code which change more frequently to others i don't want the 
		client to have to download the full whack when something small has changed
4.	I want this to be extremely painless to implement
	*	I'm not a big fan of pain

With these four requirements in mind we set about creating the Rivet strategy 
and have come up with this:

1.	A root file for each set which at dev time dynamically adds the linked files to the page
2.	You can have as many root files as you want and you only need 
	to maintain one list of links within each root file.
3.	It only takes 3 very simple steps to create a Rivet file 
	and there are no front end dependencies:
	*	Copy and paste short section of standalone code in to a root file
	*	Include a reference to it in your page and set the root file js name
	*	Include a list of files which will be combined on deployment

## 2. Usage Instructions ##

### Development
1. 	Copy the contents of the example-rivet.js for each file you want to 
	split in to separate files.
2.	Change the rivetFileName to filename of the Rivet javascript file.
3.	Add includes.push("javascriptfile.js") lines for each of the files you want to
	include with this file.
4. Reference your Rivet file in your markup.

When developing you can use the following Rivet comments:

*	`//##DEBUG` at the end of a line will remove this line from the combined source
*	Wrapping lines with `//##DEBUGSTART` and `//##DEBUGEND` will remove the whole block from the combined source

You are also able to use variables `var versionNumber = '@VERSION_NUMBER'` within your javascript. 
For each variable add `-v:VERSION_NUMBER=1.0` when using the Rivet command line

### On deployment using the commandline tool    
1.	Copy your javascript files in to a separate deployment directory
2.	Run the Rivet.Console.exe pointing it to your deployment directory
	eg: Rivet.Console.exe "c:\path\to\jsdirecory\"

		Usage: Rivet.Console.exe [/help] <path> [options]
				/help   Shows this help information
				<path>  Path to directory containing javascript files

		Options:
				-v:name=value   Replaces token [name] with [value] in processed files.
								This can be specified multiple times to replace
								multiple tokens.

		Example:
				Rivet.Console.exe D:\website\js -v:debug=false -v:trace=true

3.	This will add all the contents of the included javascript files in to
	the root Rivet file and delete the referenced files.

## 3. Instructions for Building the Source Code ##

To build this project on your machine, run batch file <strong>./cfg/build.bat</strong>.

Build output is automatically placed into directory <strong>./_build/</strong>.

## 4. Related Links ##

*	Juxtapo Website: [http://juxtapo.net](http://juxtapo.net)
*	Juxtapo docs: [http://juxtapo.net/docs](http://juxtapo.net/docs)
*	Juxtapo twitter: [http://twitter.com/juxtapotools](http://twitter.com/juxtapotools) 
	*use #juxtapotools to refer to this project*

## 5. License ##

Copyright (c) 2010, Dave Taylor and Arnold Zokas<br /><br />
This source code is subject to terms and conditions of the New BSD License.<br />
A copy of the license can be found in the license.txt file at the root of this distribution.<br />
If you cannot locate the New BSD License, please send an email to dave@the-taylors.org or arnold.zokas@coderoom.net.<br />
By using this source code in any fashion, you are agreeing to be bound by the terms of the New BSD License.<br />
You must not remove this notice, or any other, from this software.
<br />
<br />
Thanks for using Rivet,<br />
Dave Taylor and Arnold Zokas