/*
 *	Adds on design info functionality 
 */
(function() {

    juxtapo.initComplete(function() {
        var info = new juxtapo.ui.dropDown();
        if (juxtapo.designs.designImageElement()) {
            var $design = $(juxtapo.designs.designImageElement());
            info.text("info: left:" + $design.css("left") + ", top:" + $design.css("top"));
            info.contentHtml("");
        } else {
            info.text("No design");
            info.contentHtml("<h3>No design matches the current url<h3>");
        }
        juxtapo.designs.designPositionChanged(function(img, oldPos, newPos) {
            info.text("info: left:" + $design.css("left") + ", top:" + $design.css("top"));
            info.contentHtml("");
        });
    });

})();