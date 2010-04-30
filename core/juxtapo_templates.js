/**
 * @author david
 * @namespace juxtapo.templates
 */
(function() {

	// properties
	var _overlayImageElement = null;

	// events
	var onOverlayImagePositionChanged = function(img, oldPos, newPos) {
		$(juxtapo).trigger("_overlayImagePositionChanged", [ img, oldPos, newPos ]);
	};
	
	// methods
	var clearOverlayClasses = function(){
		$(juxtapo.templates.overlayButton)
			.removeClass('juxtapo-overlayTransparent')
			.removeClass('juxtapo-overlaySemiTrans')
			.removeClass('juxtapo-overlayOpaque');		
	};

	/* public */
	/**
	 * @namespace
     * @property {juxtapo.templates.TemplateItem[]} collection Array of {@link juxtapo.templates.TemplateItem} which describe the designs within the project
     * @property {int} selectedTemplateIndex The index of the current matched template
	 */
	juxtapo.templates = {
		// properties
        collection: [],
        selectedTemplateIndex: 0,
		// methods
		/**
		 * Moves the current visibility of the design back.
		 * If the visibility is set to 0 (hidden) then the visibility
		 * is set to 2 (opaque)
		 */
		back : function() {
			if (juxtapo.currentDesignView === juxtapo.designViews.hidden) {
				juxtapo.templates.show();
			} else if (juxtapo.currentDesignView === juxtapo.designViews.semiTransparent) {
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
			var newIndex;
			if (previous) {
				newIndex = juxtapo.templates.selectedTemplateIndex - 1;
				if (newIndex < 0) {
					newIndex = juxtapo.templates.collection.length - 1;
				}
			} else {
				newIndex = juxtapo.templates.selectedTemplateIndex + 1;
				if (newIndex > juxtapo.templates.collection.length - 1) {
					newIndex = 0;
				}
			}
			juxtapo.templates.changeTo(newIndex);
		},
		/**
		 * Changes the current selected template
		 * @param {juxtapo.templates.TemplateItem|number} item The TemplateItem or index of the added template
		 */
		changeTo : function(item) {
			var design = null;
			if (typeof (item) === "undefined") {
				return false;
			} else if (typeof (item) === "object") {
				design = item;
			} else if (typeof item === 'number' && item < juxtapo.templates.collection.length) {
				juxtapo.templates.selectedTemplateIndex = item;
				design = juxtapo.templates.collection[item];
			}
			if (design){
				var designStyle = $.extend({},juxtapo.templates.TemplateItem.defaultStyles,design.settings.style);
				$("#design").attr("src", design.getImageSrc()).css(designStyle);				
			}
		},
		/**
		 * Gets the current {@link juxtapo.templates.TemplateItem}
		 */
		selectedTemplateItem : function(){
			return juxtapo.templates.collection[juxtapo.templates.selectedTemplateIndex];
		},
		/**
		 * Gets or sets the image element used as the overlay for
		 * the templates.
		 * @param {HtmlImage} el
		 */
		overlayImageElement : function(el) {
			if (typeof (el) !== "undefined") {
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
			if (q === "") {
				$("#juxtapo-thumbs-container .juxtapo-thumb").show();
			} else {
				results = this.search(q);
				$("#juxtapo-thumbs-container .juxtapo-thumb").hide();
				for ( var i = 0; i < results.designs.length; i+=1) {
					var design = results.designs[i];
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
			if (juxtapo.currentDesignView === juxtapo.designViews.hidden) {
				juxtapo.templates.semiTransparent();
			} else if (juxtapo.currentDesignView === juxtapo.designViews.semiTransparent) {
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
			return juxtapo.templates.collection;
		},
		/**
		 * Searches the paths specified within each added template for the first one that 
		 * matches the url string.
		 * 
		 * @param {String} url
		 * @return {juxtapo.templates.TemplateItem}
		 * @example
		 * - http://juxtapo.net/sample/design1.htm
		 * - /sample/design1.htm
		 * - design1.htm
	
		 * If you are using juxtapo on a static site then you would use something 
		 * like the following for a file located at: c:\juxtapo\sample\design1.htm
		 * - to match any file called design1.htm you could 
		 *   use "design1.htm"
		 * - to only match design1.htm files within the sample 
		 *   folder use "/sample/design1.htm"
		 * 
		 * You will notice this is the same as if you were using it within 
		 * a website url.
		 */
		getTemplateFromUrl : function(url) {
			var href = url.toLowerCase();
			for ( var i = 0; i < juxtapo.templates.collection.length; i+=1) {
				var layout = juxtapo.templates.collection[i];
				for ( var p = 0; p < layout.paths.length; p+=1) {
					var path = layout.paths[p].toLowerCase();
					if (href.juxtapoContains(path)) {
						juxtapo.templates.selectedTemplawteIndex = i;
						return layout;
					}
				}
			}
			return juxtapo.templates.collection[0];
		},
		/**
		 * Hides the current overlay image
		 */
		hide : function() {
			$("#design").css("display", "none");
			juxtapo.designVisible = false;
			juxtapo.currentDesignView = juxtapo.designViews.hidden;
			clearOverlayClasses();
			$(this.overlayButton).addClass('juxtapo-overlayTransparent');
			return juxtapo.currentDesignView;			
		},
		/**
		 * @private
		 */
		init : function() {
			// add design image to page
			$('<img id="design" src="noimage.jpg" alt="design image" />')
					.appendTo("body").css({display : 'none'});

			if (juxtapo.utils.getQuery("di") !== null) {
				juxtapo.templates
						.changeTo(parseInt(juxtapo.utils.getQuery("di"),10));
			} else {
				juxtapo.templates.changeTo(juxtapo.templates.getTemplateFromUrl(location.href));
			}
			$(document).keydown(juxtapo.onBody_KeyDown);

			// design controller button
			juxtapo.templates.overlayButton = document.createElement("div");
			$(juxtapo.templates.overlayButton).attr("class", "juxtapo-btn");
			juxtapo.templates.overlayButton.onclick = juxtapo.templates.toggle;
			juxtapo.templates.overlayButton.innerHTML = "OVERLAY";
			juxtapo.container.appendChild(juxtapo.templates.overlayButton);
			var d = juxtapo.utils.getQuery("design");
			if (d !== null) {
				juxtapo.designVisible = d;
			}
			var dv = juxtapo.utils.getQuery("dv");
			if (!dv) {
				dv = juxtapo.currentDesignView;
			}
			if (dv !== null) {
				if (dv === juxtapo.designViews.hidden) {
					juxtapo.templates.hide();
				} else if (dv === juxtapo.designViews.semiTransparent) {
					juxtapo.templates.semiTransparent();
				} else {
					juxtapo.templates.show();
				}
			}

			// reset scroll position
			var v = juxtapo.utils.getQuery("v");
			if (v) {
				$(document).scrollTop(v);
			}

		},
		/**
		 * Moves the current overlay image
		 * @param {String} dir This can be 'top','right','bottom','left'
		 * @param {Number} pixels The number of pixels to move the image by
		 */
		nudge : function(dir, pixels) {
			if (dir === "") {
				return false;
			}
			if (typeof(pixels) === "undefined") {
				pixels = 1;
			}
			var $img = $(this.overlayImageElement());
			var horizClass = 'margin-left';
			if ($img.css('left').indexOf('%') < 0){
				if ($img.css('right') !== 'auto'){
					horizClass = 'right';
				}else{
					horizClass = 'left';
				}
			}
			
			var oldPos = {
				offSet : $img.offset(),
				position : $img.position()
			};
			var currentTop,currentLeft;
			switch (dir) {
			case "top":
				currentTop = parseInt($img.css("top"),10);
				$img.css("top", currentTop - pixels);
				break;
			case "right":
				currentLeft = parseInt($img.css(horizClass),10);
				if (horizClass !== 'right') {
					$img.css(horizClass, currentLeft + pixels);
				}
				else {
					$img.css(horizClass, currentLeft - pixels);
				}
				break;
			case "bottom":
				currentTop = parseInt($img.css("top"),10);
				$img.css("top", currentTop + pixels);
				break;
			case "left":
				currentLeft = parseInt($img.css(horizClass),10);
				if (horizClass !== 'right') {
					$img.css(horizClass, currentLeft - pixels);
				}
				else {
					$img.css(horizClass, currentLeft + pixels);
				}
				break;
			}
			var newPos = {
				offSet : $img.offset(),
				position : $img.position()
			};
			onOverlayImagePositionChanged($img.get(0), oldPos, newPos);
		},
		/**
		 * Search through the url paths and imagePath for each of the added 
		 * templates and return any that contain the query
		 * @param {Object} q Query to search for
		 * @return {Object} {designs[],indexes[]}
		 */
		search : function(q) {
			var results = {
				designs : [],
				indexes : []
			};
			if (q !== "") {
				q = q.toLowerCase();
				for ( var i = 0; i < juxtapo.templates.collection.length; i+=1) {
					var iDesign = juxtapo.templates.collection[i];
					if (iDesign.imageUrl.toLowerCase().indexOf(q) > -1 || iDesign.paths[0].toLowerCase().indexOf(q) > -1) {
						results.designs.push(iDesign);
						results.indexes.push(i);
					}
				}
			}
			return results;
		},
		/**
		 * Show the currently selected template image
		 */
		show : function() {
			$("#design").css( {
				display : "block",
				opacity : "1"
			});
			juxtapo.designVisible = true;
			juxtapo.currentDesignView = juxtapo.designViews.opaque;
			clearOverlayClasses();
			$(this.overlayButton).addClass('juxtapo-overlayOpaque');			
			return juxtapo.currentDesignView;
		},
		/**
		 * Make the currently selected template image semi transparent
		 */
		semiTransparent : function() {
			$("#design").css( {
				display : "block",
				opacity : "0.5"
			});
			juxtapo.designVisible = true;
			juxtapo.currentDesignView = juxtapo.designViews.semiTransparent;
			clearOverlayClasses();
			$(this.overlayButton).addClass('juxtapo-overlaySemiTrans');			
			return juxtapo.currentDesignView;
		},
		/**
		 * @deprecated
		 */
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
		overlayImagePositionChanged : function(fn) {
			$(juxtapo).bind("_overlayImagePositionChanged", fn);
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

		},
		getImageSrc: function(){
			if (juxtapo.utils.isRelativeUrl(this.imageUrl)) {
				return juxtapo.utils.resolveAbsoluteUrl(juxtapo.coreJsUrl(), this.imageUrl);
			}
			else {
				return this.imageUrl;
			}
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
