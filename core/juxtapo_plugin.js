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
	init: function(){
		if (this.initComplete){
			return true;
		}
		if (typeof this._init === 'function'){
			try {
				this._init.call(this);				
			}catch(ex){
				juxtapo.eh.logError(ex);
				return false;
			}
			this.initComplete = true;
			this.onInitCompleted();
			return true;
		}else{
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
