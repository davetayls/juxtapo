---
layout: docs
title: Writing a Basic Plugin
---

{{ page.title }}
================

Juxtapo plugins generally initiate themselves as Juxtapo does and extend the core functionality. An example of this is the QUnit plugin
which allows the developer to link a number of unit tests to a particular template. It hooks in to the API and once juxtapo has
initialised looks up the current template and runs the tests.

## Your two options

There are two ways to write your plugin, both allow you to pass in an object of custom properties and methods to add to the new plugin. If you specify an `_init` function it will be called during Juxtapo's initialising stage.

### 1. Plugin Object

This method uses a Plugin constructor to create a Plugin object which could then be assigned to a variable.

	juxtapo.plg.newPlugin = new juxtapo.Plugin({
		_init: function(){
			juxtapo.initComplete(function(){
				// functionality added on Juxtapo's initComplete
				// event which fires after all the plugins have
				// been initialised
			});
		},
		publicVar: 'public'
	});

You are also able to pass in a function which will be called immediately after the plugin defaults have been set. This function should return an object of custom properties and methods.

	juxtapo.plg.newPlugin = new juxtapo.Plugin(function(){
		juxtapo.initConfig(function(){
			// functionality added on Juxtapo's initConfig event
			// which fires at the beginning of Juxtapo's initialisation
			// and before plugins are initialised
		});
		
		// Passing a function allows you to use private variables within 
		// the context of the plugin
		var privateVar = 'private';
		
		// You need to return an object of any public properties
		// and methods
		return {
			_init: function(){
				juxtapo.initComplete(function(){
					// functionality added on initComplete
				});
			},
			publicVar: 'public'
		};
	});

### 2. Add Function

The plugin namespace has a wrapper function which will create a new plugin named by the first parameter and pass the second parameter to the constructor as described above.

	juxtapo.plg.add('newPlugin', {
		_init: function(){
			juxtapo.initComplete(function(){
				// functionality added on initComplete
			});
		},
		publicVar: 'public'
	});
	
## Important Conventions

* Name your file juxtapo.[name of plugin].js, eg juxtapo.views.js
* Juxtapo.plg.add is the only restricted name within the plg namespace