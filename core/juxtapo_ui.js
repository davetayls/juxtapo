/**
 * @author david
 */

/*
	juxtapo.ui
------------------------------------------------------------------------*/
juxtapo.ui = {};

juxtapo.ui.blackOut = {};
juxtapo.ui.blackOut.element = document.createElement("div");
juxtapo.ui.blackOut.show = function(){
	
};

juxtapo.ui.dropDown = function(top,left, width, height){
	this.render(top,left, width, height);
};
juxtapo.ui.dropDown.prototype = {
	afterOpen:null,
	beforeOpen:null,
	controller:null,
	contents:null,
	expanded:null
};
juxtapo.ui.dropDown.prototype.contentHtml = function(s){
	if (typeof s == "undefined"){
		return $(this.contents).html();
	}else{
		$(this.contents).html(s);
	}
};
juxtapo.ui.dropDown.prototype.render = function(top,left,width,height){
	var dd = this;
	// controller
	this.controller = document.createElement("div");
	//$(this.controller).attr("style", "border: solid 1px #ccc; position: fixed; top:" + top + "px; left: " + left + "px; width: 5px; height: 6px; font-weight: bold; text-align: center; padding: 3px; cursor: pointer; background-color: white; font-size: 9px; z-index: 2000;");
	$(this.controller).attr("class","juxtapo-dropDown");
	this.controller.onclick = function(){ dd.toggleErrorBox(); };
	juxtapo.container.appendChild(this.controller);

	// errors
	this.contents = document.createElement("div");
	//var contentStyle = "border: solid 1px #ccc; display: none; position: fixed; top:" + (top + 15) + "px; left:" + left + "px; width: " + width + "px; height: " + height + "px; font-weight: bold; text-align: left; padding: 3px; background-color: white; font-size: 11px; z-index: 2000; overflow: auto;";
	$(this.contents).attr("class", "juxtapo-lightBox");
	document.getElementsByTagName("body")[0].appendChild(this.contents);
	
};
juxtapo.ui.dropDown.prototype.showErrorBox = function(b){
	this.expanded = b;
	if (b){
		if (this.beforeOpen) { this.beforeOpen(); }
		$(this.contents).show(100);
		if (this.afterOpen) { this.afterOpen(); }
	}else{
		$(this.contents).hide(100);
	}
};
juxtapo.ui.dropDown.prototype.text = function(s){
	if (typeof s == "undefined"){
		return $(this.controller).html();
	}else{
		$(this.controller).html(s);
	}
};
juxtapo.ui.dropDown.prototype.toggleErrorBox = function(){
	this.showErrorBox(!this.expanded);
};
