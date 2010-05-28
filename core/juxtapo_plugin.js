(function($){

juxtapo.Plugin = function(settings){
	var extendObject;
	if (typeof settings === 'object'){
		extendObject = settings;
	}else if (typeof settings === 'function'){
		extendObject = settings.call(this);
		if (typeof extendObject !== 'object'){
			extendObject = {};
		}
	}else if (typeof settings === 'undefined'){
		extendObject = {};
	}else{
		throw new juxtapo.eh.Exception('A plugin cannot be instantiated with a '+ typeof settings);
	}
	$.extend(this,{},extendObject);
};
juxtapo.Plugin.prototype = {
	_init: function(){
		if (typeof this.init === 'function'){
			try {
				this.init.call(this);				
			}catch(ex){
				juxtapo.eh.logError(ex);
				return false;
			}
			this.initComplete = true;
			this.onInitCompleted();
			return true;
		}
	},
	initComplete :false,
	initCompleted: function(fn){
		$(this).bind('_initCompleted',fn);
	},
	onInitCompleted: function(){
		$(this).trigger('_initCompleted');
	}
};
	
})(jQuery);
