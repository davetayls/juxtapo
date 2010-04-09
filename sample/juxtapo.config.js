/*
 * Set up the default styles
 * This example centres an image template which is 750px wide on the page.
 * 
 * If your site design is centred you can just alter the margin-left to half
 * of the width of your design.
 */
juxtapo.setDefaultStyles({
	position : 'absolute',
	'z-index' : '2000',
	top : '0px',
	left : '50%',
	'margin-left' : '-375px'
});
/* 	Here are some other examples for default positioning:
	Fixed Left default styles: juxtapo.setDefaultStyles({ position: 'absolute', 'z-index': '2000', top: '0px', left: '0px'});
	Fixed Right default styles: juxtapo.setDefaultStyles({ position: 'absolute', 'z-index': '2000', top: '0px', left: '0px'});
*/

/*
 * You can include plugins as script tags in the document or you
 * can include them here by adding the paths to the addPlugins function.
 * These paths should be relative to the juxtapo.js file.
 */
juxtapo.addPlugins([
	'../plugins/juxtapo.qunit.js'
]);


/*
 * initConfig fires after juxtapo has been loaded in to the DOM
 * but before it has initialised.
 */
juxtapo.initConfig(function(){
	juxtapo.addTemplate('design1.htm', 'design1.png', {
		style : {
			top : '8px'
		},
		data : {
			qunitTests: ["../sample/tests.js"]
		}
	});
	juxtapo.addTemplate('design2.htm', 'design2.png', {
		style : {
			left : "0",
			'margin-left' : '0'
		}
	});	
});
