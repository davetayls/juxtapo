/**
 * @author david
 * @namespace juxtapo.designs
 */

(function(){
	
	juxtapo.designs = {
		back : function() {
		    if (juxtapo.currentDesignView == juxtapo.designViews.hidden) {
		        juxtapo.designs.show();
		    } else if (juxtapo.currentDesignView == juxtapo.designViews.semiTransparent) {
		        juxtapo.designs.hide();
		    } else {
		        juxtapo.designs.semiTransparent();
		    }
		},
		change : function(previous) {
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
		},
		filterBySearch : function(q){
			var results = null;
			var thumbs = [];
			if (q == "") {
				$("#juxtapo-designsDD li").show();
			}
			else {
				results = this.search(q);
				$("#juxtapo-designsDD li").hide();
				for (var i = 0; i < results.indexes.length; i++) {
					thumbs.push($("#juxtapo-design-" + results.indexes[i]).show().get());
				}
			}
			return {"q":q,"results":results,"thumbs":thumbs};
		},
		forward : function() {
		    if (juxtapo.currentDesignView == juxtapo.designViews.hidden) {
		        juxtapo.designs.semiTransparent();
		    } else if (juxtapo.currentDesignView == juxtapo.designViews.semiTransparent) {
		        juxtapo.designs.show();
		    } else {
		        juxtapo.designs.hide();
		    }
		},
		getDesignImageSettings : function(url) {
			var href = url.toLowerCase();;
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
		    return juxtapo.designLayoutImages[0];
		},
		hide : function() {
		    $("#design").css("display", "none");
		    juxtapo.designvisible = false;
		    juxtapo.currentDesignView = juxtapo.designViews.hidden;
		},
		init : function(){
		    // layout image
		    if (juxtapo.utils.getQuery("di") != null) {
		        juxtapo.designCurrentImageIndex = parseInt(juxtapo.utils.getQuery("di"));
		        designImageSettings = juxtapo.designLayoutImages[juxtapo.designCurrentImageIndex];
		    } else {
		        designImageSettings = juxtapo.designs.getDesignImageSettings(location.href);
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

			
		},
		nudge : function(dir,pixels){
			if (dir == "") return false;
			if (typeof(pixels) == "undefined") pixels = 1;
			switch (dir) {
			case "top":
				var currentTop = parseInt($("#design").css("top"));
				$("#design").css("top", currentTop - pixels);				
				break;
			case "right":
				var currentLeft = parseInt($("#design").css("margin-left"));
				$("#design").css("margin-left", currentLeft + pixels);				
				break;
			case "bottom":
				var currentTop = parseInt($("#design").css("top"));
				$("#design").css("top", currentTop + pixels);				
				break;
			case "left":
				var currentLeft = parseInt($("#design").css("margin-left"));
				$("#design").css("margin-left", currentLeft - pixels);				
				break;
			}
		},
		search : function(q){
			var results = {designs:[],indexes:[]};
			if (q != ""){
				for(var i =0;i < juxtapo.designLayoutImages.length;i++){
					var iDesign = juxtapo.designLayoutImages[i];
					if (iDesign.imageUrl.indexOf(q) > -1 || iDesign.paths[0].indexOf(q) > -1){
						results.designs.push(iDesign);
						results.indexes.push(i);
					}
				}		
			}
			return results;
		},
		show : function() {
		    $("#design").css({ display: "block", opacity: "1" });
		    juxtapo.designvisible = true;
		    juxtapo.currentDesignView = juxtapo.designViews.opaque;
			return juxtapo.currentDesignView;
		},
		semiTransparent : function() {
		    $("#design").css({ display: "block", opacity: "0.5" });
		    juxtapo.designvisible = true;
		    juxtapo.currentDesignView = juxtapo.designViews.semiTransparent;
		},
		toggle : function() {
		    juxtapo.designs.forward();
		}
			
	};

})();


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






