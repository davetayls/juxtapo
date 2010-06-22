/*
 *	Adds on design info functionality 
 */
juxtapo.plg.designInfo = new juxtapo.Plugin({
	_init: function(){
        var info = new juxtapo.ui.DropDown({style:{height: '150px',width:'300px'}});
        var $design = $(juxtapo.templates.overlayImageElement());
		
		var setInfo = function(){
			var infoText = 'info:<br />';
			infoText += "margin-left:" + $design.css("margin-left") + '<br />';
			infoText += "top:" + $design.css("top") + '<br />'; 
			infoText += "left:" + $design.css("left") + '<br />';
			infoText += "height:" + $design.height() + '<br />';
			infoText += "width:" + $design.width() + '<br />';
			
            info.contentHtml(infoText);			
		};
		this.setInfo = setInfo;
        info.text('info');
		setInfo();		
        juxtapo.templates.overlayImagePositionChanged(function(img, oldPos, newPos) {
			setInfo();
        });
	}
});
