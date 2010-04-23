(function($) {
/**
 * Creates a new toolbtn control
 * @class Represents a toolbtn control
 * @constructor
 */
juxtapo.ui.ToolBtn = function(options) {
	this._init(options);
};
juxtapo.ui.ToolBtn.prototype = {
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
		 * @name juxtapo.ui.ToolBtn.click
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
		 * @name juxtapo.ui.ToolBtn.show
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
})(jQuery);
