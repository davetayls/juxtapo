/*
 *	Adds on design info functionality 
 */
(function() {

    juxtapo.initComplete(function() {
        var info = new juxtapo.ui.DropDown({style:{height: '150px',width:'300px'}});
        var $design = $(juxtapo.designs.designImageElement());
		
		var setInfo = function(){
			var infoText = 'info:<br />';
			infoText += "margin-left:" + $design.css("margin-left") + '<br />';
			infoText += "top:" + $design.css("top") + '<br />'; 
			infoText += "left:" + $design.css("left") + '<br />';
			infoText += "height:" + $design.height() + '<br />';
			infoText += "width:" + $design.width() + '<br />';
			
            info.contentHtml(infoText);			
		};
        info.text('info');
		setInfo();		
        juxtapo.designs.designPositionChanged(function(img, oldPos, newPos) {
			setInfo();
        });
    });

})();