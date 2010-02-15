// set up the default styles
juxtapo.designs.designTemplate.defaultStyles = {
    position: 'absolute',
    'z-index': '2000',
    top: '0px',
    left: '50%',
    'margin-left': '-375px'
};
juxtapo.initConfig(function(){
	// include each template below
	juxtapo.addTemplate('example.htm', 'example.png', {
	    style: {},
	    data: {}
	});	
});

