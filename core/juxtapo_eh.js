/**
 * @author david
 */
/*
    juxtapo.eh
-----------------------------------------------------------*/
juxtapo.eh = {};
juxtapo.eh.controller = null;
juxtapo.eh.errorsBox = null;
juxtapo.eh.errors = "";
juxtapo.eh.errorsBoxVisible = false;
juxtapo.eh.hasError = false;


juxtapo.eh.init = function(){
	// controller
	juxtapo.eh.controller = document.createElement("div");
	$(juxtapo.eh.controller).attr("style", "border: solid 1px #ccc; position: fixed; top:15px; left:0; width: 5px; height: 6px; font-weight: bold; text-align: center; padding: 3px; cursor: pointer; background-color: white; font-size: 9px; z-index: 2000;");
	juxtapo.eh.controller.onclick = juxtapo.eh.toggleErrorBox;
	document.getElementsByTagName("body")[0].appendChild(juxtapo.eh.controller);

	// errors
	juxtapo.eh.errorsBox = document.createElement("ul");
	$(juxtapo.eh.errorsBox).attr("style", "border: solid 1px #ccc; display: none; position: fixed; top:15px; left:15px; width: 300px; height: 400px; font-weight: bold; text-align: left; padding: 3px; background-color: white; font-size: 9px; z-index: 2000; overflow: auto;");
	document.getElementsByTagName("body")[0].appendChild(juxtapo.eh.errorsBox);
	
	juxtapo.eh.renderErrors();
};
juxtapo.eh.logInfo = function(message){
	juxtapo.eh.errors  += "<li class=\"juxtapo-info\">" + "[" + juxtapo.utils.date.toShortTimeString(new Date()) + "] " + message + "</li>";
	juxtapo.eh.renderErrors();
};
juxtapo.eh.logError = function(err){
	if (typeof(err) == "string"){
		juxtapo.eh.errors  += "<li class=\"juxtapo-error\">" + err + "</li>";
	}else{
		juxtapo.eh.errors  += "<li class=\"juxtapo-error\">" + err.message + "</li>";
	}
	juxtapo.eh.hasError = true;
	juxtapo.eh.renderErrors();
};
juxtapo.eh.renderErrors = function(){
	if (juxtapo.eh.errorsBox){	$(juxtapo.eh.errorsBox).html(juxtapo.eh.errors); }
	if (juxtapo.eh.controller) {
		if (juxtapo.eh.hasError === true){
			$(juxtapo.eh.controller)
				.css("border-color","red")
				.css("color","red")
				.html("!");
		}else{
			$(juxtapo.eh.controller)
				.css("border-color","#ccc")
				.css("color","#444")
				.html("e");
		}
	}
};
juxtapo.eh.showErrorBox = function(b){
	juxtapo.eh.errorsBoxVisible = b;
	if (b){
		$(juxtapo.eh.errorsBox).show(100);
	}else{
		$(juxtapo.eh.errorsBox).hide(100);
	}
};
juxtapo.eh.toggleErrorBox = function(){
	juxtapo.eh.showErrorBox(!juxtapo.eh.errorsBoxVisible);
};

