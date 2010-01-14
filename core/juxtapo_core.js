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
		designViews : { hidden: 0, semiTransparent: 1, opaque: 2 },

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
			
			juxtapo.utils.getKeyCombination("13+shift");	
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
    juxtapo.eh.logInfo("keycode is: "+keycode);

    // Check if user presses Ctl+. (ie Ctl+>) or Ctl+right
    if (e.ctrlKey && (keycode == 190 || keycode == 39)) {
		if (e.altKey){
			var currentLeft = parseInt($("#design").css("margin-left"));
			$("#design").css("margin-left", currentLeft + 1);
		}else{
			juxtapo.designs.forward();
			return false;
		}
    }
    // Check if user presses Ctl+, (ie Ctl+<) or Ctl+left
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
    
};
juxtapo.onMouseMove = function() {
    clearTimeout(juxtapo.timerId);
    if (juxtapo.currentStatus == juxtapo.statuses.play) {
        timerId = setTimeout('juxtapo.control.reload()', juxtapo.secondsBeforeRefresh * 1000);
    }
};
	
})();

if (window.addEventListener) {
    window.addEventListener('load', juxtapo.init, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', juxtapo.init);
}

