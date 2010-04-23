(function($) {

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
	juxtapo.ui.DropDown = function(options) {
		this._init(options);
	};
	juxtapo.ui.DropDown.prototype = {
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
})(jQuery);
