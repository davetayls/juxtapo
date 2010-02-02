/**
 * @author david
 */
/*
 juxtapo.eh
 -----------------------------------------------------------*/
(function(){

    var _dropDown = null;
    
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
        
            _dropDown = new juxtapo.ui.dropDown({style:{height:'300px',width:'450px'}});
            _dropDown.text("e");
                        
            juxtapo.eh.renderErrors();
            this.initCompleted = true;
        },
        logInfo: function(message){
            juxtapo.eh.errors += "<li class=\"juxtapo-info\">" + "[" + juxtapo.utils.date.toShortTimeString(new Date()) + "] " + message + "</li>";
            juxtapo.eh.renderErrors();
            return juxtapo.eh.errors;
        },
        logError: function(err){
            if (typeof(err) == "string") {
                juxtapo.eh.errors += "<li class=\"juxtapo-error\">" + err + "</li>";
            }
            else {
                juxtapo.eh.errors += "<li class=\"juxtapo-error\">" + err.message + "</li>";
            }
            juxtapo.eh.hasError = true;
            juxtapo.eh.renderErrors();
            return juxtapo.eh.errors;
        },
        renderErrors: function(){
            if (_dropDown) {
                _dropDown.contentHtml(juxtapo.eh.errors);

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
        },
        showErrorBox: function(b){
            juxtapo.eh.errorsBoxVisible = b;
            if (b) {
                $(juxtapo.eh.errorsBox).show(100);
            }
            else {
                $(juxtapo.eh.errorsBox).hide(100);
            }
        },
        toggleErrorBox: function(){
            juxtapo.eh.showErrorBox(!juxtapo.eh.errorsBoxVisible);
        }
        
    }; // juxtapo.eh
})();


