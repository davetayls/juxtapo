/**
 * @author david
 * @namespace juxtapo.templates
 */
(function() {

	// properties
	var _overlayImageElement = null;

	// events
	var onDesignPositionChanged = function(img, oldPos, newPos) {
		$(juxtapo).trigger("_designPositionChanged", [ img, oldPos, newPos ]);
	};

	/* public */
	/**
	 * @namespace
	 */
	juxtapo.templates = {
		// methods
		/**
		 * Moves the current visibility of the design back.
		 * If the visibility is set to 0 (hidden) then the visibility
		 * is set to 2 (opaque)
		 */
		back : function() {
			if (juxtapo.currentDesignView == juxtapo.designViews.hidden) {
				juxtapo.templates.show();
			} else if (juxtapo.currentDesignView == juxtapo.designViews.semiTransparent) {
				juxtapo.templates.hide();
			} else {
				juxtapo.templates.semiTransparent();
			}
		},
		/**
		 * Changes the current selected template to the next or previous template
		 * depending on the previous parameter.
		 * @param {bool} previous
		 */
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
			juxtapo.templates.changeTo(newIndex);
		},
		/**
		 * Changes the current selected template
		 * @param {juxtapo.templates.TemplateItem|number} item The TemplateItem or index of the added template
		 */
		changeTo : function(item) {
			var design = null;
			if (typeof (item) == "undefined") {
				return false;
			} else if (typeof (item) == "object") {
				design = item;
			} else if (typeof item == 'number' && item < juxtapo.designTemplates.length) {
				juxtapo.designCurrentImageIndex = item;
				design = juxtapo.designTemplates[item];
			}
			if (design){
				var designStyle = $.extend({},juxtapo.templates.TemplateItem.defaultStyles,design.settings.style);
				$("#design").attr("src", design.imageUrl).css(designStyle);				
			}
		},
		/**
		 * Gets the current {@link juxtapo.templates.TemplateItem}
		 */
		currentTemplateItem : function(){
			return juxtapo.designTemplates[juxtapo.designCurrentImageIndex];
		},
		/**
		 * Gets or sets the image element used as the overlay for
		 * the templates.
		 * @param {HtmlImage} el
		 */
		overlayImageElement : function(el) {
			if (typeof (el) != "undefined") {
				_overlayImageElement = el;
			} else if (!_overlayImageElement) {
				_overlayImageElement = document.getElementById("design");
			}
			return _overlayImageElement;
		},
		/**
		 * Filters the thumbnails by a search query
		 * @param {String} q
		 */
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
		/**
		 * Moves the current visibility of the design forward.
		 * If the visibility is set to 2 (opaque) then the visibility
		 * is set to 0 (hidden)
		 */
		forward : function() {
			if (juxtapo.currentDesignView == juxtapo.designViews.hidden) {
				juxtapo.templates.semiTransparent();
			} else if (juxtapo.currentDesignView == juxtapo.designViews.semiTransparent) {
				juxtapo.templates.show();
			} else {
				juxtapo.templates.hide();
			}
		},
		/**
		 * Gets the array of {@link juxtapo.templates.TemplateItem} templates which
		 * have been added to juxtapo.
		 * @return {juxtapo.templates.TemplateItem[]}
		 */
		getAll : function(){
			return juxtapo.designTemplates;
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
			juxtapo.designVisible = false;
			juxtapo.currentDesignView = juxtapo.designViews.hidden;
		},
		init : function() {
			// add design image to page
			$('<img id="design" src="noimage.jpg" alt="design image" />')
					.appendTo("body").css( {
						display : 'none'
					});

			if (juxtapo.utils.getQuery("di") != null) {
				juxtapo.templates
						.changeTo(parseInt(juxtapo.utils.getQuery("di")));
			} else {
				juxtapo.templates.changeTo(juxtapo.templates
						.getDesignFromUrl(location.href));
			}
			$(document).keydown(juxtapo.onBody_KeyDown);

			// design controller button
			juxtapo.designlayout = document.createElement("div");
			$(juxtapo.designlayout).attr("class", "juxtapo-btn");
			juxtapo.designlayout.onclick = juxtapo.templates.toggle;
			juxtapo.designlayout.innerHTML = "D E S I G N";
			juxtapo.container.appendChild(juxtapo.designlayout);
			d = juxtapo.utils.getQuery("design");
			if (d != null) {
				juxtapo.designVisible = d;
			}
			dv = juxtapo.utils.getQuery("dv");
			if (!dv) {
				dv = juxtapo.currentDesignView;
			}
			if (dv != null) {
				if (dv == juxtapo.designViews.hidden) {
					juxtapo.templates.hide();
				} else if (dv == juxtapo.designViews.semiTransparent) {
					juxtapo.templates.semiTransparent();
				} else {
					juxtapo.templates.show();
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
			var $img = $(this.overlayImageElement());
			var horizClass = 'margin-left';
			if ($img.css('left').indexOf('%') < 0){
				if ($img.css('right') != 'auto'){
					horizClass = 'right';
				}else{
					horizClass = 'left';
				}
			}
			
			var oldPos = {
				offSet : $img.offset(),
				position : $img.position()
			};
			switch (dir) {
			case "top":
				var currentTop = parseInt($img.css("top"));
				$img.css("top", currentTop - pixels);
				break;
			case "right":
				var currentLeft = parseInt($img.css(horizClass));
				horizClass != 'right' ? $img.css(horizClass, currentLeft + pixels): $img.css(horizClass, currentLeft - pixels);
				break;
			case "bottom":
				var currentTop = parseInt($img.css("top"));
				$img.css("top", currentTop + pixels);
				break;
			case "left":
				var currentLeft = parseInt($img.css(horizClass));
				horizClass != 'right' ? $img.css(horizClass, currentLeft - pixels): $img.css(horizClass, currentLeft + pixels);
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
			juxtapo.designVisible = true;
			juxtapo.currentDesignView = juxtapo.designViews.opaque;
			return juxtapo.currentDesignView;
		},
		semiTransparent : function() {
			$("#design").css( {
				display : "block",
				opacity : "0.5"
			});
			juxtapo.designVisible = true;
			juxtapo.currentDesignView = juxtapo.designViews.semiTransparent;
		},
		toggle : function() {
			juxtapo.templates.forward();
		},

		/* events */
		/**
		 * Adds a listener function which gets triggered when the overlay image
		 * has been moved
		 * @event
		 * @param {Object} fn(ev)
		 */
		designPositionChanged : function(fn) {
			$(juxtapo).bind("_designPositionChanged", fn);
		}
	};


	// SUB CLASSES
	/**
	 * Create a new instance of TemplateItem
	 * @class TemplateItem is the description of each template layout
	 * @param {Object} imageUrl
	 * @param {Object} paths
	 * @param {Object} settings Key value pair of settings
	 * @param {Object} settings.data Key:value set of meta data that can be used by plugins
	 * @param {Object} settings.style Key:value pair of css styles which will override the default styles
	 * @return {juxtapo.templates.TemplateItem} Returns a new TemplateItem
	 * @constructor
	 * 
	 * @property {juxtapo.ui.Thumbnail} thumbnail
	 */
	juxtapo.templates.TemplateItem = function(imageUrl, paths, settings) {
		this._init(imageUrl, paths, settings);
		return;
	};
	juxtapo.templates.TemplateItem.prototype = {
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
			self.settings = $.extend( {}, juxtapo.templates.TemplateItem.prototype.settings, settings);

			/**
			 * Sets the {@link juxtapo.ui.Thumbnail} connected with this TemplateItem
			 * @name juxtapo.templates.TemplateItem.setUiThumbnail
			 * @function
			 * @param {juxtapo.ui.Thumbnail} thumbnail
			 * @returns {juxtapo.templates.TemplateItem}
			 */			
			self.setUiThumbnail = function(thumbnail){
				self.thumbnail = thumbnail;
				$(self).trigger("_thumbnailSet");
				return self;
			};
			/**
			 * Adds a listener to the thumbnailSet event which fires
			 * when the TemplateItem receives a {@link juxtapo.ui.Thumbnail}
			 * through the {@link juxtapo.templates.TemplateItem.setUiThumbnail}
			 * method
			 * @event
			 * @example
			 * designTemplateInstance.thumbnailSet(function(ev){ code to run ... });
			 * @name juxtapo.templates.TemplateItem.thumbnailSet
			 * @param {Object} fn(ev)
			 */
			self.thumbnailSet = function(fn){
				$(self).bind("_thumbnailSet",fn);
				return self;
			};

		}
	};
	juxtapo.templates.TemplateItem.defaultStyles = {
		position : 'absolute',
		'z-index' : '2000',
		top : '0px',
		left : '50%',
		'margin-left' : '-550px'
	};

})();
