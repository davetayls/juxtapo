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
					newIndex = juxtapo.designTemplates.length - 1;
			} else {
				newIndex = juxtapo.designCurrentImageIndex + 1;
				if (newIndex > juxtapo.designTemplates.length - 1)
					newIndex = 0;
			}
			juxtapo.designs.changeTo(newIndex);
		},
		changeTo : function(item) {
			var design = null;
			if (typeof (item) == "undefined") {
				return false;
			} else if (typeof (item) == "object") {
				design = item;
			} else {
				juxtapo.designCurrentImageIndex = item;
				design = juxtapo.designTemplates[item];
			}
			var designStyle = $.extend({},juxtapo.designs.designTemplate.defaultStyles,design.settings.style);
			$("#design").attr("src", design.imageUrl).css(designStyle);
		},
		currentDesign : function(){
			return juxtapo.designTemplates[juxtapo.designCurrentImageIndex];
		},
		designImageElement : function(el) {
			if (typeof (el) != "undefined") {
				_designImageElement = el;
			} else if (!_designImageElement) {
				_designImageElement = document.getElementById("design");
			}
			return _designImageElement;
		},
		filterBySearch : function(q) {
			var results = null;
			var thumbs = [];
			if (q == "") {
				$("#juxtapo-thumbs-container li").show();
			} else {
				results = this.search(q);
				$("#juxtapo-thumbs-container li").hide();
				for ( var i = 0; i < results.designs.length; i++) {
					var design = results.designs[i]
					design.thumbnail.show();
				}
			}
			return {
				"q" : q,
				"designs" : results
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
			for ( var i = 0; i < juxtapo.designTemplates.length; i++) {
				layout = juxtapo.designTemplates[i];
				for ( var p = 0; p < layout.paths.length; p++) {
					path = layout.paths[p].toLowerCase();
					if (href.juxtapoContains(path)) {
						juxtapo.designCurrentImageIndex = i;
						return layout;
					}
				}
			}
			;
			return juxtapo.designTemplates[0];
		},
		hide : function() {
			$("#design").css("display", "none");
			juxtapo.designvisible = false;
			juxtapo.currentDesignView = juxtapo.designViews.hidden;
		},
		init : function() {
			// add design image to page
			$('<img id="design" src="noimage.jpg" alt="design image" />')
					.appendTo("body").css( {
						display : 'none'
					});

			if (juxtapo.utils.getQuery("di") != null) {
				juxtapo.designs
						.changeTo(parseInt(juxtapo.utils.getQuery("di")));
			} else {
				juxtapo.designs.changeTo(juxtapo.designs
						.getDesignFromUrl(location.href));
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
				for ( var i = 0; i < juxtapo.designTemplates.length; i++) {
					var iDesign = juxtapo.designTemplates[i];
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


	// SUB CLASSES
	/**
	 * Create a new instance of designTemplate
	 * 
	 * @classDescription This class creates a new designTemplate
	 * @param {Object}
	 *            imageUrl
	 * @param {Object}
	 *            paths
	 * @param {Object}
	 *            style
	 * @return {juxtapo.designs.designTemplate} Returns a new designTemplate
	 * @constructor
	 */
	juxtapo.designs.designTemplate = function(imageUrl, paths, settings) {
		this._init(imageUrl, paths, settings);
		return;
	};
	juxtapo.designs.designTemplate.prototype = {
		imageUrl : '',
		paths : [],
		settings : {
			data : {},
			style : {}
		},
		thumbnail:null,
		
		_init : function(imageUrl, paths, settings){
			var self = this;
			self.imageUrl = imageUrl;
			self.paths = paths;
			self.settings = $.extend( {}, juxtapo.designs.designTemplate.prototype.settings, settings);
			
			self.setUiThumbnail = function(thumbnail){
				self.thumbnail = thumbnail;
				$(self).trigger("_thumbnailSet");
			};
			self.thumbnailSet = function(fn){
				$(self).bind("_thumbnailSet",fn);
			};

		},
	};
	juxtapo.designs.designTemplate.defaultStyles = {
		position : 'absolute',
		'z-index' : '2000',
		top : '0px',
		left : '50%',
		'margin-left' : '-550px'
	};

})();
