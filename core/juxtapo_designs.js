/**
 * @author david
 * @namespace juxtapo.designs
 */

(function() {

	// properties
	var _designImageElement = null;

	// events
	var onDesignPositionChanged = function(img, oldPos, newPos) {
		$(juxtapo).trigger("_designPositionChanged", [ img, oldPos, newPos ]);
	};

	/* public */
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
				if (newIndex < 0)
					newIndex = juxtapo.designLayoutImages.length - 1;
			} else {
				newIndex = juxtapo.designCurrentImageIndex + 1;
				if (newIndex > juxtapo.designLayoutImages.length - 1)
					newIndex = 0;
			}
			juxtapo.designs.changeTo(newIndex);
		},
		changeTo : function(item){
			var design = null;
			if (typeof(item)=="undefined"){
				return false;
			}else if (typeof(item)=="object"){
				design = item;
			}else{
				juxtapo.designCurrentImageIndex = item;
				design = juxtapo.designLayoutImages[item];				
			}
			$("#design").attr("src", design.imageUrl).css(design.style);			
		},
		designImageElement : function(el) {
			if (typeof (el) != "undefined") {
				_designImageElement = el;
			}else if (!_designImageElement){
				_designImageElement = document.getElementById("design");
			}
			return _designImageElement;
		},
		filterBySearch : function(q) {
			var results = null;
			var thumbs = [];
			if (q == "") {
				$("#juxtapo-designsDD li").show();
			} else {
				results = this.search(q);
				$("#juxtapo-designsDD li").hide();
				for ( var i = 0; i < results.indexes.length; i++) {
					thumbs.push($("#juxtapo-design-" + results.indexes[i])
							.show().get());
				}
			}
			return {
				"q" : q,
				"results" : results,
				"thumbs" : thumbs
			};
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
		getDesignFromUrl : function(url) {
			var href = url.toLowerCase();			
			for ( var i = 0; i < juxtapo.designLayoutImages.length; i++) {
				layout = juxtapo.designLayoutImages[i];
				for ( var p = 0; p < layout.paths.length; p++) {
					path = layout.paths[p].toLowerCase();
					if (href.juxtapoContains(path)) {
						juxtapo.designCurrentImageIndex = i;
						return layout;
					}
				}
			}
			;
			return juxtapo.designLayoutImages[0];
		},
		hide : function() {
			$("#design").css("display", "none");
			juxtapo.designvisible = false;
			juxtapo.currentDesignView = juxtapo.designViews.hidden;
		},
		init : function() {
			// add design image to page
			$('<img id="design" src="noimage.jpg" alt="design image" />')
				.appendTo("body")
				.css( {display : 'none'});
			
			
			if (juxtapo.utils.getQuery("di") != null) {
				juxtapo.designs.changeTo(parseInt(juxtapo.utils.getQuery("di")));
			} else {
				juxtapo.designs.changeTo(juxtapo.designs.getDesignFromUrl(location.href));
			}
			$(document).keydown(juxtapo.onBody_KeyDown);

			// design controller button
			juxtapo.designlayout = document.createElement("div");
			$(juxtapo.designlayout).attr("class", "juxtapo-btn");
			juxtapo.designlayout.onclick = juxtapo.designs.toggle;
			juxtapo.designlayout.innerHTML = "D E S I G N";
			juxtapo.container.appendChild(juxtapo.designlayout);
			d = juxtapo.utils.getQuery("design");
			if (d != null) {
				juxtapo.designvisible = d;
			}
			dv = juxtapo.utils.getQuery("dv");
			if (!dv) {
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
			
			// reset scroll position
			v = juxtapo.utils.getQuery("v");
			if (v) {
				$(document).scrollTop(v);
			}

		},
		nudge : function(dir, pixels) {
			if (dir == "")
				return false;
			if (typeof (pixels) == "undefined")
				pixels = 1;
			var $img = $(this.designImageElement());
			var oldPos = {
				offSet : $img.offset(),
				position : $img.position()
			};
			switch (dir) {
			case "top":
				var currentTop = parseInt($("#design").css("top"));
				$img.css("top", currentTop - pixels);
				break;
			case "right":
				var currentLeft = parseInt($("#design").css("margin-left"));
				$img.css("margin-left", currentLeft + pixels);
				break;
			case "bottom":
				var currentTop = parseInt($("#design").css("top"));
				$img.css("top", currentTop + pixels);
				break;
			case "left":
				var currentLeft = parseInt($("#design").css("margin-left"));
				$img.css("margin-left", currentLeft - pixels);
				break;
			}
			var newPos = {
				offSet : $img.offset(),
				position : $img.position()
			};
			onDesignPositionChanged($img.get(0), oldPos, newPos);
		},
		search : function(q) {
			var results = {
				designs : [],
				indexes : []
			};
			if (q != "") {
				q = q.toLowerCase();
				for ( var i = 0; i < juxtapo.designLayoutImages.length; i++) {
					var iDesign = juxtapo.designLayoutImages[i];
					if (iDesign.imageUrl.toLowerCase().indexOf(q) > -1
							|| iDesign.paths[0].toLowerCase().indexOf(q) > -1) {
						results.designs.push(iDesign);
						results.indexes.push(i);
					}
				}
			}
			return results;
		},
		show : function() {
			$("#design").css( {
				display : "block",
				opacity : "1"
			});
			juxtapo.designvisible = true;
			juxtapo.currentDesignView = juxtapo.designViews.opaque;
			return juxtapo.currentDesignView;
		},
		semiTransparent : function() {
			$("#design").css( {
				display : "block",
				opacity : "0.5"
			});
			juxtapo.designvisible = true;
			juxtapo.currentDesignView = juxtapo.designViews.semiTransparent;
		},
		toggle : function() {
			juxtapo.designs.forward();
		},

		/* events */
		designPositionChanged : function(fn) {
			$(juxtapo).bind("_designPositionChanged", fn);
		}
	};

})();

// SUB CLASSES
/**
 * Create a new instance of LayoutTemplate
 * 
 * @classDescription This class creates a new LayoutTemplate
 * @param {Object}
 *            imageUrl
 * @param {Object}
 *            paths
 * @param {Object}
 *            style
 * @return {juxtapo.designs.LayoutTemplate} Returns a new LayoutTemplate
 * @constructor
 */
juxtapo.designs.LayoutTemplate = function(imageUrl, paths, style) {
	this.imageUrl = imageUrl;
	this.paths = paths;
	this.style = $.extend( {}, juxtapo.designs.LayoutTemplate.defaultStyles,
			style);
};
juxtapo.designs.LayoutTemplate.prototype = {};
juxtapo.designs.LayoutTemplate.prototype.imageUrl = '';
juxtapo.designs.LayoutTemplate.prototype.paths = [];
juxtapo.designs.LayoutTemplate.prototype.style = {};
juxtapo.designs.LayoutTemplate.defaultStyles = {
	position : 'absolute',
	'z-index' : '2000',
	top : '0px',
	left : '50%',
	'margin-left' : '-550px'
};
