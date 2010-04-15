/*
*	Adds on status css class and notes functionality to any thumbnail 
*/
(function() {

    var dropDown = null;
    var currentDesign;

    juxtapo.initComplete(function() {

        juxtapo.thumbs.thumbsRendered(function() {
            var designs = juxtapo.templates.getAll();
            for (var i = 0; i < designs.length; i++) {
                var design = designs[i];
                $(design.thumbnail.container).addClass("juxtapo-status-" + design.settings.data.status);
                if (design.settings.data.notes != "") {
                    var caption = $(design.thumbnail.caption);
                    caption.html(caption.html() + '<div class="juxtapo-thumb-notes">notes: ' + design.settings.data.notes + '</div>');
                }
            }
        });

    });

})();