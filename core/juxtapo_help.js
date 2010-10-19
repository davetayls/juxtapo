(function($){

	var _dropDown = null;

	juxtapo.initComplete(function(){
        _dropDown = new juxtapo.ui.DropDown({style:{width:'300px'}});
        _dropDown.text("?");
		_dropDown.title('Juxtapo help and information');
		
		var helpHtml = '';
		helpHtml = '' +
		'<h4>juxtapo version: '+ juxtapo.version + ', <a href="http://juxtapo.net">website</a></h4>' +
		'<h4>Keyboard Shortcuts</h4>' +
		'<table width="100%">' +
		'<tr><td>Move Left</td><td>Ctrl+J [+shift for nudge]</td></tr>' +
		'<tr><td>Move Right</td><td>Ctrl+L [+shift for nudge]</td></tr>' +
		'<tr><td>Move Up</td><td>Ctrl+I [+shift for nudge]</td></tr>' +
		'<tr><td>Move Down</td><td>Ctrl+K [+shift for nudge]</td></tr>' +
		'<tr><td>Previous Design</td><td>Ctrl+Up</td></tr>' +
		'<tr><td>Next Design</td><td>Ctrl+Down</td></tr>' +
		'<tr><td>Transparency Back</td><td>Ctrl+U</td></tr>' +
		'<tr><td>Transparency Forward</td><td>Ctrl+O</td></tr>' +
		'<tr><td>Auto Refresh Play/Stop</td><td>Ctrl+Space</td></tr>' +
		'</table>' +
		'<h4>Documention</h4>' +
		'<ul><li><a href="'+ juxtapo.utils.resolveAbsoluteUrl(juxtapo.coreJsUrl(),'../docs/index.html') + '">juxtapo API documentation</a></ul>';
		
		_dropDown.contentHtml(helpHtml);
		
	});


})(jQuery);


