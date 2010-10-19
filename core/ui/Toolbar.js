(function($){	
	/**
	 * Toolbar ui control which can be added to the contents of a dropdown.
	 * @class Represents a Toolbar control
	 * @constructor
	 */
	juxtapo.ui.Toolbar = function(options){
		this._init(options);
	};
	juxtapo.ui.Toolbar.prototype = {
		_init: function(options){
			var _self = this;
			this.settings = $.extend({}, this.settings, options);
		    this.toolbar$ = $('<div class="juxtapo-ui-toolbar juxtapo-cc" class="juxtapo-cc" />');
		    this.toolbarLeft$ = $('<div class="juxtapo-ui-toolbarL juxtapo-cc" />').appendTo(_self.toolbar$);
		    this.toolbarRight$ = $('<div class="juxtapo-ui-toolbarR juxtapo-cc" />').appendTo(_self.toolbar$);
			this.appendTo = function(selector){
				_self.toolbar$.appendTo(selector);
				return _self;
			};
			this.appendLeft = function(html){
				_self.toolbarLeft$.append(html);
				return _self;
			};
			this.appendRight = function(html){
				_self.toolbarRight$.append(html);
				return _self;
			};
		},
		settings : {}
	};
})(jQuery);
