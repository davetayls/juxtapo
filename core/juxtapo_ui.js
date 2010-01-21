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
	$(this.controller).attr("class","juxtapo-dropDown");
	this.controller.onclick = function(){ dd.toggleShow(); };
	juxtapo.container.appendChild(this.controller);

	// pop up
	this.contents = document.createElement("div");
	$(this.contents).attr("class", "juxtapo-lightBox");
	document.getElementsByTagName("body")[0].appendChild(this.contents);
	
};
juxtapo.ui.dropDown.prototype.show = function(b){
	if (typeof(b)=="undefined") b = true;
	this.expanded = b;
	if (b){
		if (this.beforeOpen) { this.beforeOpen(); }
		$(this.contents).show(100);
		if (this.afterOpen) { this.afterOpen(); }
	}else{
		$(this.contents).hide(100);
	}
	return this.expanded;
};
juxtapo.ui.dropDown.prototype.text = function(s){
	if (typeof s == "undefined"){
		return $(this.controller).html();
	}else{
		$(this.controller).html(s);
	}
};
juxtapo.ui.dropDown.prototype.toggleShow = function(){
	return this.show(!this.expanded);
};
