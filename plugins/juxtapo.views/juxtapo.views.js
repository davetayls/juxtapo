/*
 *	Adds on qunit functionality to any page 
 */
(function(){

	var dropDown = null;
	var currentDesign;

	juxtapo.initComplete(function(){
			var details = new juxtapo.ui.toolbtn();
			details
				.text("List")
				.click(function(e){
					$(juxtapo.thumbs.thumbsContainer)
						.find(".juxtapo-thumb")
						.addClass("juxtapo-thumb-detailsView");
				});
			
			
			var thumbs = new juxtapo.ui.toolbtn();
			thumbs
				.text("Thumbs")
				.click(function(e){
					$(juxtapo.thumbs.thumbsContainer)
						.find(".juxtapo-thumb")
						.removeClass("juxtapo-thumb-detailsView");
				});
			
			juxtapo.thumbs
				.appendToToolbarRight(details.container)
				.appendToToolbarRight(thumbs.container);

		
	});

})();