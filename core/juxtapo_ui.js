/**
 * @author david
 */
/*
 * juxtapo.ui
 * ------------------------------------------------------------------------
 */
/**
 * UI namespace of controls
 * @namespace
 */
juxtapo.ui = {};

(function() {

	_openDropDown = null;
	
	/**
	 * Creates a new dropDown control which puts a button in the tool strip and gives a popup
	 * @class Represents a dropDown control
	 * @constructor
	 * @param {Object} options
	 * @param {Object} options.style
	 * @property {HtmlElement} controller The button the sits on the toolstrip
	 * @property {HtmlElement} contents The main lightbox container
	 * @property {bool} expanded
	 * @property {Object} settings
	 */
	juxtapo.ui.dropDown = function(options) {
		this._init(options);
	};
	juxtapo.ui.dropDown.prototype = {
		// properties
		afterOpen : null,
		beforeOpen : null,
		controller : null,
		contents : null,
		expanded : null,
		settings : {
			cssClass : '',
			style : {
				height : 'auto',
				width : '905px'
			}
		},

		// methods
		/** @private */
		_init : function(options) {
			this.settings = $.extend( {}, this.settings, options);
			this.render();

			var self = this;
			$(document).bind("keydown", function(e) {
				if (self.expanded && e.which == 27) {
					self.show(false);
					return false;
				}
			});
		},
		contentHtml : function(s) {
			if (typeof s == "undefined") {
				return $(this.contents).html();
			} else {
				$(this.contents).html(s);
			}
		},
		/** @private */
		render : function() {
			var dd = this;

			// controller
			this.controller = document.createElement("div");
			$(this.controller).attr("class", "juxtapo-dropDown");
			/** @private */
			this.controller.onclick = function() {
				dd.toggleShow();
			};
			juxtapo.container.appendChild(this.controller);

			// pop up
			this.contents = document.createElement("div");
			$(this.contents)
				.attr("class", ("juxtapo-lightBox"))
				.css(this.settings.style);
			document.getElementsByTagName("body")[0].appendChild(this.contents);

		},
		show : function(b) {
			if (typeof (b) == "undefined")
				b = true;
			if (b && !this.expanded) {
				if (_openDropDown){
					_openDropDown.show(false);
					_openDropDown = null;
				}
				if (this.beforeOpen) {
					this.beforeOpen();
				}
				$(this.contents).show();
				$(this.controller).addClass("juxtapo-btn-open");
				this.expanded = true;
				_openDropDown = this;
				if (this.afterOpen) {
					this.afterOpen();
				}
			} else if (!b) {
				$(this.contents).hide();
				$(this.controller).removeClass("juxtapo-btn-open");
				this.expanded = false;
			}
			return this.expanded;
		},
		text : function(s) {
			if (typeof s == "undefined") {
				return $(this.controller).html();
			} else {
				$(this.controller).html(s);
			}
		},
		toggleShow : function() {
			return this.show(!this.expanded);
		}

	};
})();

/**
 * Creates a new thumbnail control which contains a link to the page
 * a small image and the page name
 * @class Represents a thumbnail control
 * @constructor
 * @property {HtmlElement} caption The Html element containing the thumbnail caption
 * @property {HtmlElement} container The main thumbnail container li
 * @property {juxtapo.designs.designTemplate} designTemplate The designTemplate this thumbnail is associated with
 * @property {HtmlElement} link The Html anchor element for the thumbnail 
 * @property {HtmlSpanElement} imageContainer The Html span element containing the thumbnail image 
 * @property {HtmlImage} image The thumbnail image
 * @property {Object} settings
 */
juxtapo.ui.thumbnail = function(designTemplate, options) {
	this._init(designTemplate, options);
};
juxtapo.ui.thumbnail.prototype = {
	caption : null,
	container : null,
	designTemplate : null,
	link : null,
	imageContainer : null,
	image : null,
	settings : {},

	// methods
	_init : function(designTemplate, options) {
		var self = this;

		self.settings = $.extend( {}, this.settings, options);
		self.designTemplate = designTemplate;

		self.image = $(
				'<img height="220" src="' + designTemplate.imageUrl + '" alt="design image" />')
				.get(0);
		self.imageContainer = $('<span class="juxtapo-thumb-img" />').append(
				self.image).get(0);

		self.caption = $('<span class="juxtapo-thumb-caption" />').html(
				self.designTemplate.paths[0]).get(0);
		self.link = $(
				'<a class="juxtapo-thumb-lnk" style="display:block;" href="' + self.designTemplate.paths[0] + '" />')
				.append(self.imageContainer).append(self.caption).get(0);
		self.container = $('<li class="juxtapo-thumb" />').append(self.link)
				.get(0);

		designTemplate.setUiThumbnail(self);

		/**
		 * Shows or hides the thumbnail
		 * @function
		 * @name juxtapo.ui.thumbnail.show
		 * @param {bool} [b=true] A boolean value to determine whether to show the thumbnail 
		 */
		self.show = function(b) {
			if (typeof (b) == 'undefined')
				b = true;
			if (b) {
				$(self.container).show();
			} else {
				$(self.container).show();
			}
		};

	}
};

/**
 * Creates a new toolbtn control
 * @class Represents a toolbtn control
 * @constructor
 */
juxtapo.ui.toolbtn = function(options) {
	this._init(options);
};
juxtapo.ui.toolbtn.prototype = {
	container : null,
	contents : null,

	settings : {},

	// methods
	_init : function(designTemplate, options) {
		var self = this;

		self.settings = $.extend( {}, this.settings, options);

		self.contents = $('<span class="juxtapo-toolbtn-contents" />').get(0);
		self.container = $('<a class="juxtapo-toolbtn" />').append(
				self.contents).get(0);

		/**
		 * Adds a listener function which is triggered when a user clicks on the button
		 * @name juxtapo.ui.toolbtn.click
		 * @event
		 * @param {Object} fn
		 */
		self.click = function(fn) {
			$(self.container).click(fn);
			return self;
		};
		/**
		 * Shows or hides the button
		 * @function
		 * @name juxtapo.ui.toolbtn.show
		 * @param {bool} [b=true] A boolean value to determine whether to show the button 
		 */
		self.show = function(b) {
			if (typeof (b) == 'undefined')
				b = true;
			if (b) {
				$(self.container).show();
			} else {
				$(self.container).show();
			}
			return self;
		};
		/**
		 * Sets the contents of the button
		 * @property
		 * @param {Html|String} text
		 */
		self.text = function(text) {
			$(self.contents).html(text);
			return self;
		};
	}
};
