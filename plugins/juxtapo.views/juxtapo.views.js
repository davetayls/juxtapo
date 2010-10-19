/*
 *	Adds on different views of the template designs
 */
(function($){

if (!juxtapo.plg['views']) {
	var libUrl = juxtapo.utils.getJsLocation('juxtapo.views.js');
	juxtapo.utils.requireResource(libUrl + "juxtapo.views.css");
}

	var dropDown = null;
	var currentDesign;

	var setDetailsView = function(){
		$(juxtapo.thumbs.thumbsContainer())
			.addClass("juxtapo-thumb-detailsView");
		juxtapo.utils.createCookie('juxtapo-views','details',30);
	};
	var setThumbsView = function(){
		$(juxtapo.thumbs.thumbsContainer())
			.removeClass("juxtapo-thumb-detailsView");		
		juxtapo.utils.createCookie('juxtapo-views','thumbs',30);
	};
	
juxtapo.plg.add('views', {	
	_init: function(){
		
		var details = new juxtapo.ui.ToolBtn();		
		details.text("List").click(setDetailsView);		
		
		var thumbs = new juxtapo.ui.ToolBtn();
		thumbs.text("Thumbs").click(setThumbsView);
		
		juxtapo.thumbs
			.appendToToolbarRight(details.container)
			.appendToToolbarRight(thumbs.container);
			
		var lastView = juxtapo.utils.readCookie('juxtapo-views');
		if (lastView === 'details'){
			setDetailsView();
		}else{
			setThumbsView();
		}
	}
});

})(jQuery);