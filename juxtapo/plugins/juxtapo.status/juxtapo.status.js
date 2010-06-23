/*
*	Adds on status css class and notes functionality to any thumbnail 
*/
(function($) {

var dropDown = null;
var currentDesign;

juxtapo.plg.status = new juxtapo.Plugin({
	_init: function(){
		juxtapo.thumbs.thumbsRendered(function(){
			var templates = juxtapo.templates.getAll();
			for (var i = 0; i < templates.length; i+=1) {
				var design = templates[i];
				$(design.thumbnail.container).addClass("juxtapo-status-" + design.settings.data.status);
				if (design.settings.data.notes != "") {
					var caption = $(design.thumbnail.container).find('.juxtapo-thumb-caption');
					caption.append('<div class="juxtapo-thumb-notes">notes: ' + design.settings.data.notes + '</div>');
				}
			}
		});
	}
});

})(jQuery);