/**
 * @author david
 * @namespace juxtapo.designs
 */
juxtapo.designs = {};

// SUB CLASSES
/**
 * Create a new instance of LayoutTemplate
 * @classDescription This class creates a new LayoutTemplate
 * @param {Object} imageUrl
 * @param {Object} paths
 * @param {Object} style
 * @return {juxtapo.designs.LayoutTemplate}	Returns a new LayoutTemplate
 * @constructor
 */
juxtapo.designs.LayoutTemplate = function(imageUrl,paths,style){
	this.imageUrl = imageUrl;
	this.paths = paths;
	this.style = $.extend({},juxtapo.designs.LayoutTemplate.defaultStyles,style);
};
juxtapo.designs.LayoutTemplate.prototype = {};
juxtapo.designs.LayoutTemplate.prototype.imageUrl = '';
juxtapo.designs.LayoutTemplate.prototype.paths = [];
juxtapo.designs.LayoutTemplate.prototype.style = {};
juxtapo.designs.LayoutTemplate.defaultStyles = { position: 'absolute', 'z-index': '2000', top: '0px', left: '50%', 'margin-left': '-550px' };

// PROPERTIES

// METHODS
juxtapo.designs.change = function(previous) {
    if (previous) {
        newIndex = juxtapo.designCurrentImageIndex - 1;
        if (newIndex < 0) newIndex = juxtapo.designLayoutImages.length -1;
    } else {
        newIndex = juxtapo.designCurrentImageIndex + 1;
        if (newIndex > juxtapo.designLayoutImages.length - 1) newIndex = 0;
    }
    juxtapo.designCurrentImageIndex = newIndex;
    nextLayout = juxtapo.designLayoutImages[newIndex];
    $("#design")
        .attr("src", nextLayout.imageUrl)
        .css(nextLayout.style);
};
juxtapo.designs.back = function() {
    if (juxtapo.currentDesignView == juxtapo.designViews.hidden) {
        juxtapo.designs.show();
    } else if (juxtapo.currentDesignView == juxtapo.designViews.semiTransparent) {
        juxtapo.designs.hide();
    } else {
        juxtapo.designs.semiTransparent();
    }
};
juxtapo.designs.filterBySearch = function(q){
	if (q == "") {
		$("#juxtapo-designsDD li").show();
	}
	else {
		var results = this.search(q);
		$("#juxtapo-designsDD li").hide();
		for (var i = 0; i < results.indexes.length; i++) {
			$("#juxtapo-design-" + results.indexes[i]).show();
		}
	}
};
juxtapo.designs.forward = function() {
    if (juxtapo.currentDesignView == juxtapo.designViews.hidden) {
        juxtapo.designs.semiTransparent();
    } else if (juxtapo.currentDesignView == juxtapo.designViews.semiTransparent) {
        juxtapo.designs.show();
    } else {
        juxtapo.designs.hide();
    }
};
juxtapo.designs.getDesignImageSettings = function() {
	var href = location.href.toLowerCase();;
    for (var i = 0; i < juxtapo.designLayoutImages.length; i++) {
        layout = juxtapo.designLayoutImages[i];
        for (var p = 0; p < layout.paths.length; p++) {
            path = layout.paths[p].toLowerCase();
            if (href.juxtapoContains(path)) {
                juxtapo.designCurrentImageIndex = i;
                return layout;
            }
        }
    };
    return '/images/layout-home.jpg';
};
juxtapo.designs.hide = function() {
    $("#design").css("display", "none");
    juxtapo.designvisible = false;
    juxtapo.currentDesignView = juxtapo.designViews.hidden;
};
juxtapo.designs.init = function(){
    // layout image
    if (juxtapo.utils.getQuery("di") != null) {
        juxtapo.designCurrentImageIndex = parseInt(juxtapo.utils.getQuery("di"));
        designImageSettings = juxtapo.designLayoutImages[juxtapo.designCurrentImageIndex];
    } else {
        designImageSettings = juxtapo.designs.getDesignImageSettings();
    }
    if (designImageSettings) {
        $("body").append('<img id="design" src="' + designImageSettings.imageUrl + '" alt="design image" />');
        $("#design")
            .css({ display: 'none' })
            .css(designImageSettings.style);
        $(document).keydown(juxtapo.onBody_KeyDown);
    }	

    // design layout
    juxtapo.designlayout = document.createElement("div");
    //$(juxtapo.designlayout).attr("style", "border: solid 1px #ccc; position: fixed; top:0; left:15px; width: 45px; height: 6px; font-weight: bold; text-align: center; padding: 3px; cursor: pointer; background-color: white; font-size: 7px; z-index: 2000;");
	$(juxtapo.designlayout).attr("class","juxtapo-btn");
    juxtapo.designlayout.onclick = juxtapo.designs.toggle;
    juxtapo.designlayout.innerHTML = "D E S I G N";
    juxtapo.container.appendChild(juxtapo.designlayout);
    d = juxtapo.utils.getQuery("design");
    if (d != null) {
        juxtapo.designvisible = d;
        //if (d == 'true') { juxtapo.designs.show(); } else { juxtapo.designs.hide(); }
    }
    dv = juxtapo.utils.getQuery("dv");
    if(!dv){
    	dv = juxtapo.currentDesignView;
    }
    if (dv != null) {
        if (dv == juxtapo.designViews.hidden) {
            juxtapo.designs.hide();
        } else if (dv == juxtapo.designViews.semiTransparent) {
            juxtapo.designs.semiTransparent();
        } else {
            juxtapo.designs.show();
        }
    }

    v = juxtapo.utils.getQuery("v");
    if (v) {
        $(document).scrollTop(v);
    }

	
};
juxtapo.designs.search = function(q){
	var results = {designs:[],indexes:[]};
	for(var i =0;i < juxtapo.designLayoutImages.length;i++){
		var iDesign = juxtapo.designLayoutImages[i];
		if (iDesign.imageUrl.indexOf(q) > -1 || iDesign.paths[0].indexOf(q) > -1){
			results.designs.push(iDesign);
			results.indexes.push(i);
		}
	}
	return results;
};
juxtapo.designs.show = function() {
    $("#design").css({ display: "block", opacity: "1" });
    juxtapo.designvisible = true;
    juxtapo.currentDesignView = juxtapo.designViews.opjuxtapo;
};
juxtapo.designs.semiTransparent = function() {
    $("#design").css({ display: "block", opacity: "0.5" });
    juxtapo.designvisible = true;
    juxtapo.currentDesignView = juxtapo.designViews.semiTransparent;
};
juxtapo.designs.toggle = function() {
    juxtapo.designs.forward();
};






