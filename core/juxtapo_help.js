(function(){

	var _dropDown = null;

	juxtapo.initComplete(function(){
        _dropDown = new juxtapo.ui.dropDown({style:{height:'300px',width:'300px'}});
        _dropDown.text("?");
		
		var helpHtml = '';
		helpHtml = '' +
		'<h4>Keyboard Shortcuts</h4>' +
		'<table width="100%">' +
		'<tr><td>Move Left</td><td>Ctrl+J [+shift for nudge]</td></tr>' +
		'<tr><td>Move Right</td><td>Ctrl+L [+shift for nudge]</td></tr>' +
		'<tr><td>Move Up</td><td>Ctrl+I [+shift for nudge]</td></tr>' +
		'<tr><td>Move Down</td><td>Ctrl+K [+shift for nudge]</td></tr>' +
		'<tr><td>Transparency Back</td><td>Ctrl+U</td></tr>' +
		'<tr><td>Transparency Forward</td><td>Ctrl+O</td></tr>' +
		'<tr><td>Auto Refresh Play/Stop</td><td>Ctrl+Space</td></tr>' +
		'</table>' +
		'<h4>Docs</h4>' +
		'<ul><li><a href="'+ juxtapo.utils.resolveAbsoluteUrl(juxtapo.coreJsUrl,'../docs/index.htm') + '">Documentation</a></ul>';
		
		_dropDown.contentHtml(helpHtml);
		
	});


})();


