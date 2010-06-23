/*
 *	Adds on qunit functionality to any page 
 */
(function(){

	var dropDown = null;
	var currentDesign;

juxtapo.plg.views = new juxtapo.Plugin({	
	_init: function(){
		var details = new juxtapo.ui.ToolBtn();
		details.text("List").click(function(e){
			$(juxtapo.thumbs.thumbsContainer).find(".juxtapo-thumb").addClass("juxtapo-thumb-detailsView");
		});		
		
		var thumbs = new juxtapo.ui.ToolBtn();
		thumbs.text("Thumbs").click(function(e){
			$(juxtapo.thumbs.thumbsContainer).find(".juxtapo-thumb").removeClass("juxtapo-thumb-detailsView");
		});
		
		juxtapo.thumbs.appendToToolbarRight(details.container).appendToToolbarRight(thumbs.container);	
	}
});

})();