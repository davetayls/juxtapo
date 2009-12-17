/**
 * juxtapo JavaScript Library v0.3a
 * http://juxtapo.net/
 *
 * Copyright (c) 2009 David Taylor (@davetayls)
 * Licensed under the GNU v3 license.
 * http://www.gnu.org/licenses/gpl.html
 *
 * @author @davetayls
 * @namespace juxtapo
 */
var juxtapo = {};

(function(){

	/* private */

	// Methods
	function addResources(){
		var loc = juxtapo.utils.getJsLocation('juxtapo.js');
		if (loc){
			$("head").append('<link href="' + loc + 'juxtapo.css" rel="stylesheet" type="text/css" />');
		}
	};
	function initContainer(){
		juxtapo.container = document.createElement("div");
		$(juxtapo.container).attr("id","juxtapo-container");
		$("body").append(juxtapo.container);
		/*
		if (juxtapo.utils.is.ie && juxtapo.utils.is.version == 6){
			$(juxtapo.container).css({position:"absolute",top:"0",left:"0"});
		}*/
	};
	function initStatus(){
		// get current status
	    s = juxtapo.utils.getQuery("status");
	    if (s) { juxtapo.currentStatus = s; }
	    else { juxtapo.currentStatus = juxtapo.statuses.pause; }
	};
	
	/* public */
	juxtapo = {
		statuses : { off: 0, play: 1, pause: 2 },
		designViews : { hidden: 0, semiTransparent: 1, opjuxtapo: 2 },

		// Properties
		container : null,
		controller : null,
		designlayout : null,
		designvisible : false,
		designCurrentImageIndex : 0,
		designLayoutImages : [],  // list of layout images to place as the design overlay 
		currentStatus : 2,
		secondsBeforeRefresh : 2.5,
		currentDesignView : 0,
		timerId : -1,
		
		// methods
		init : function() {
			addResources();
			initStatus();
			
			// init if not turned off
		    if (juxtapo.currentStatus != juxtapo.statuses.off) {
				initContainer();
				juxtapo.designs.init();
		        juxtapo.control.init();
		    }
			juxtapo.eh.init();
			juxtapo.thumbs.init();	
		},

		/**
		 * Adds a juxtapo.designs.LayoutTemplate object to the designLayoutImages array
		 * @param {String} imageUrl
		 * @param {Array} paths An array of urls to match this image with
		 * @param {Object} style A set of key:value pairs to customise the style from the defaultStyles
		 * @return {juxtapo.designs.LayoutTemplate} Returns the new template 
		 */
		addTemplate : function(path,imageUrl,style){
			var t = new juxtapo.designs.LayoutTemplate(imageUrl,[path],style);
			this.designLayoutImages.push(t);
			return t;
		}
		
		
	};


// Methods

juxtapo.onBody_KeyDown = function(e) {
    var keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    else return true;

    // Check if user presses Ctl+. (ie Ctl+>)
    if (e.ctrlKey && (keycode == 190 || keycode == 39)) {
		if (e.altKey){
			var currentLeft = parseInt($("#design").css("margin-left"));
			$("#design").css("margin-left", currentLeft + 1);
		}else{
			juxtapo.designs.forward();
			return false;
		}
    }
    // Check if user presses Ctl+, (ie Ctl+<)
    if (e.ctrlKey && (keycode == 188 || keycode == 37)) {
		if (e.altKey){
			var currentLeft = parseInt($("#design").css("margin-left"));
			$("#design").css("margin-left", currentLeft - 1);
		}else{
			juxtapo.designs.back();
			return false;
		}
    }
    // Check if user presses Ctl+up-arrow
    if (e.ctrlKey && keycode == 38) {
		if (e.altKey){
			var currentTop = parseInt($("#design").css("top"));
			$("#design").css("top", currentTop - 1);
		}else{
			juxtapo.designs.change(true);
			return false;
		}
    }
    // Check if user presses Ctl+down-arrow
    if (e.ctrlKey && keycode == 40) {
		if (e.altKey){
			var currentTop = parseInt($("#design").css("top"));
			$("#design").css("top", currentTop + 1);
		}else{
			juxtapo.designs.change(false);
			return false;
		}
    }
    // Ctl+Space
    else if (e.ctrlKey && keycode == 32) {
        juxtapo.control.toggle();
        return false;
    }
    else {
        return true;
    }
}
juxtapo.onMouseMove = function() {
    clearTimeout(juxtapo.timerId);
    if (juxtapo.currentStatus == juxtapo.statuses.play) {
        timerId = setTimeout('juxtapo.control.reload()', juxtapo.secondsBeforeRefresh * 1000);
    }
}
	
})();


/*
 * juxtapo.control
 */
juxtapo.control = {};
juxtapo.control.init = function(){
    // controller
    juxtapo.controller = document.createElement("div");
    //$(juxtapo.controller).attr("style", "border: solid 1px #ccc; position: fixed; top:0; left:0; width: 5px; height: 6px; font-weight: bold; text-align: center; padding: 3px; cursor: pointer; background-color: white; font-size: 5px; z-index: 2000;");
	$(juxtapo.controller).attr("class","juxtapo-btn")
    juxtapo.controller.onclick = juxtapo.control.toggle;
    juxtapo.container.appendChild(juxtapo.controller);	

    window.onmousemove = juxtapo.onMouseMove;
    if (juxtapo.currentStatus == juxtapo.statuses.pause) {
        juxtapo.control.pause();
    } else {
        juxtapo.control.play();
    }

}
juxtapo.control.play = function() {
    juxtapo.currentStatus = juxtapo.statuses.play;
    juxtapo.controller.innerHTML = "|&nbsp;|";
    juxtapo.timerId = setTimeout('juxtapo.control.reload()', juxtapo.secondsBeforeRefresh * 1000);
}
juxtapo.control.pause = function() {
    juxtapo.currentStatus = juxtapo.statuses.pause;
    juxtapo.controller.innerHTML = ">";
    clearTimeout(juxtapo.timerId);
    //reloadUrl = "http://" + location.host + location.pathname + "?status=" + juxtapo.currentStatus + "&design=" + juxtapo.designvisible + "&v=" + $(document).scrollTop() + "&dv=" + juxtapo.currentDesignView;
    //location.href = reloadUrl;
    
}
juxtapo.control.reload = function() {
    if (juxtapo.currentStatus == juxtapo.statuses.play) {
        reloadUrl = "http://" + location.host + location.pathname + "?r=" + new Date().toString() + "&status=" + juxtapo.currentStatus + "&design=" + juxtapo.designvisible + "&v=" + $(document).scrollTop() + "&dv=" + juxtapo.currentDesignView + "&di=" + juxtapo.designCurrentImageIndex;
        location.href = reloadUrl;
    }
}

juxtapo.control.toggle = function() {
    if (juxtapo.currentStatus == juxtapo.statuses.pause) {
        juxtapo.control.play();
    } else {
        juxtapo.control.pause();
    }
}

/*
    juxtapo.thumbs
-----------------------------------------------------------*/
juxtapo.thumbs = {};
juxtapo.thumbs.dropDown = null;
juxtapo.thumbs.rendered = false;
juxtapo.thumbs.init = function(){
	var designs = new juxtapo.ui.dropDown(0,70, 920, 500);
	this.dropDown = designs;
	designs.text("+");
	var thumbs = this;
	designs.beforeOpen = function(){
		if (!thumbs.rendered){
			thumbs.renderThumbs(designs);
		}
	};
	designs.afterOpen = function(){
		$("#juxtapo-searchDesigns").focus();
	};
};
juxtapo.thumbs.renderThumbs = function(designsDropDown){
	juxtapo.eh.logInfo("thumbs rendering")
	var designList; designList = "";
	for (var i=0;i<juxtapo.designLayoutImages.length;i++){
		designList += '<li id="juxtapo-design-' + i + '"><a style="display:block;" href="' + juxtapo.designLayoutImages[i].paths[0] + '"><img height="220" src="' + juxtapo.designLayoutImages[i].imageUrl + '" alt="design image" /><span>' + juxtapo.designLayoutImages[i].paths[0] + '</span></a></li>';
	}
	designsDropDown.contentHtml('<div id="juxtapo-designsToolbar"><input id="juxtapo-searchDesigns" type="text" /></div><ul id="juxtapo-designsDD">' + designList + '</ul>');
	$("#juxtapo-searchDesigns").keyup(this.searchKeyup);	
	this.rendered = true;
};
juxtapo.thumbs.searchKeyup = function(e){
	juxtapo.designs.filterBySearch($("#juxtapo-searchDesigns").val());
};



if (window.addEventListener) {
    window.addEventListener('load', juxtapo.init, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', juxtapo.init);
}

