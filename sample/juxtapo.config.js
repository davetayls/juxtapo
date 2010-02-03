juxtapo.designs.designTemplate.defaultStyles = {
	position : 'absolute',
	'z-index' : '2000',
	top : '0px',
	left : '50%',
	'margin-left' : '-375px'
};

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
