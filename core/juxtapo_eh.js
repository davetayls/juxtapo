/*
 juxtapo.eh
 -----------------------------------------------------------*/
(function($){

    var _dropDown = null;

	/**
	 * Error handler
	 * @namespace
	 */    
    juxtapo.eh = {
        // properties
        errors: "",
        hasError: false,
        initCompleted: false,
        
        // methods
		dropDown : function(){
			return _dropDown;
		},
        init: function(){
        
            _dropDown = new juxtapo.ui.DropDown({style:{height:'300px',width:'450px'}});
            _dropDown.text("e");
			_dropDown.title('Error logger');
			$(_dropDown.contents).addClass("juxtapo-errorBox");
                        
            juxtapo.eh.renderErrors();
			/*
			$(window).bind("onerror",function(e){
				juxtapo.eh.logError(e);
			});*/
            this.initCompleted = true;
        },
        logInfo: function(message){
            juxtapo.eh.errors = "<li class=\"juxtapo-info\">" + "[" + juxtapo.utils.date.toShortTimeString(new Date()) + "] " + message + "</li>"+juxtapo.eh.errors;
            juxtapo.eh.renderErrors();
            return juxtapo.eh.errors;
        },
        logError: function(err){
            if (typeof(err) === "string") {
                juxtapo.eh.errors = "<li class=\"juxtapo-error\">" + err + "</li>"+juxtapo.eh.errors;
            }else if (typeof(err) === "object") {
				juxtapo.eh.errors = "<li class=\"juxtapo-error\">[object]" + juxtapo.utils.objectToStructureString(err) + "</li>"+juxtapo.eh.errors;
			}
			else {
				juxtapo.eh.errors += "<li class=\"juxtapo-error\">" + err.toString() + "</li>";
			}
            juxtapo.eh.hasError = true;
            juxtapo.eh.renderErrors();
            return juxtapo.eh.errors;
        },
        renderErrors: function(){
            if (_dropDown) {
                _dropDown.contentHtml("<ul>"+juxtapo.eh.errors+"</ul>");

				$(_dropDown.controller).removeClass("juxtapo-eh-error");
                if (juxtapo.eh.hasError === true) {
                    $(_dropDown.controller).addClass("juxtapo-eh-error");
                    _dropDown.text("!");
                }
                else {
                    _dropDown.text("e");
                }
            }
            return true;
        }        
    }; // juxtapo.eh
    
	juxtapo.eh.Exception = function(message,trace){
		this.message = message;
		this.trace = trace;
	};

})(jQuery);


