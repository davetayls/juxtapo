---
layout: post
title: A look at the designInfo Plugin
categories: plugins
author: davetayls
---

I thought I would take you through a real world example of a plugin so you can get a better picture of how they can work. This is looking at the designInfo plugin which gives up to date information about the positioning of the overlay image so that you can tweak your config file to make sure it always loads in the correct position.

Here is the complete plugin code to walk through:

	juxtapo.plg.designInfo = new juxtapo.Plugin({
		_init: function(){
			var info = new juxtapo.ui.DropDown({
				style:{
					height: '150px',
					width:'300px'
				}
			});
			var $design = $(juxtapo.templates.overlayImageElement());
			
			var setInfo = function(){
				var infoText = 'info:<br />';
				infoText += "margin-left:" 
						+ $design.css("margin-left") 
						+ '<br />';
				infoText += "top:" 
						+ $design.css("top") 
						+ '<br />'; 
				infoText += "left:" 
						+ $design.css("left") 
						+ '<br />';
				infoText += "height:" 
						+ $design.height() 
						+ '<br />';
				infoText += "width:" 
						+ $design.width() 
						+ '<br />';
				
				info.contentHtml(infoText);
			};
			info.text('info');
			setInfo();
			
			// add an event listener to the 
			// overlayImagePositionChanged event
			juxtapo.templates.overlayImagePositionChanged(
				function(img, oldPos, newPos) {
					setInfo();
				}
			);
		}
	});

We start by creating a new `juxtapo.Plugin` object. The constructor also alows us to pass in an object of properties and methods which will be assigned to the plugin immediately.

	juxtapo.plg.designInfo = new juxtapo.Plugin({

We want to construct the plugin UI and logic once Juxtapo has initialised so we include a function called `_init` within the object we pass to the constructor.

	_init: function(){
	
Juxtapo has a set of UI components, we can use the DropDown component to add a button to the juxtapo bar with a pop up for further content.

	var info = new juxtapo.ui.DropDown({
		style:{
			height: '150px',
			width:'300px'
		}
	});

The `juxtapo.templates` namespace has a set of methods for interacting with the set of templates added and the overlay image. Here we load the overlay img element in to a jQuery object.
	
	var $design = $(juxtapo.templates.overlayImageElement());
			
Next we create a simple function which will output the img element's current position.		
		
	var setInfo = function(){
		var infoText = 'info:<br />';
		infoText += "margin-left:" + $design.css("margin-left") + '<br />';
		infoText += "top:" + $design.css("top") + '<br />'; 
		infoText += "left:" + $design.css("left") + '<br />';
		infoText += "height:" + $design.height() + '<br />';
		infoText += "width:" + $design.width() + '<br />';
		
		info.contentHtml(infoText);
	};

Set the `juxtapo.ui.DropDown` component's text for the juxtapo bar.

	info.text('info');
	
Run setInfo on startup

	setInfo();

The `juxtapo.templates` namespace allows us to add an event listener to fire when the position of the overlay changes so we add a function which calls the `setInfo` function we made earlier.
			
	juxtapo.templates.overlayImagePositionChanged(
		function(img, oldPos, newPos) {
			setInfo();
		}
	);

This is a very quick overview to show how simple it is to create a plugin with Juxtapo. You can read more by looking at [the **Writing a basic plugin** post](http://juxtapo.net/docs/plugins/writingabasicplugin.html) or browsing the [Juxtapo API docs](http://juxtapo.net/docs/api/).