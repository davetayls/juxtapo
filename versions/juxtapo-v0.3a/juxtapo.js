

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
};
juxtapo.onMouseMove = function() {
    clearTimeout(juxtapo.timerId);
    if (juxtapo.currentStatus == juxtapo.statuses.play) {
        timerId = setTimeout('juxtapo.control.reload()', juxtapo.secondsBeforeRefresh * 1000);
    }
};
	
})();


/*
 * juxtapo.control
 */
juxtapo.control = {};
juxtapo.control.init = function(){
    // controller
    juxtapo.controller = document.createElement("div");
    //$(juxtapo.controller).attr("style", "border: solid 1px #ccc; position: fixed; top:0; left:0; width: 5px; height: 6px; font-weight: bold; text-align: center; padding: 3px; cursor: pointer; background-color: white; font-size: 5px; z-index: 2000;");
	$(juxtapo.controller).attr("class","juxtapo-btn");
    juxtapo.controller.onclick = juxtapo.control.toggle;
    juxtapo.container.appendChild(juxtapo.controller);	

    window.onmousemove = juxtapo.onMouseMove;
    if (juxtapo.currentStatus == juxtapo.statuses.pause) {
        juxtapo.control.pause();
    } else {
        juxtapo.control.play();
    }

};
juxtapo.control.play = function() {
    juxtapo.currentStatus = juxtapo.statuses.play;
    juxtapo.controller.innerHTML = "|&nbsp;|";
    juxtapo.timerId = setTimeout('juxtapo.control.reload()', juxtapo.secondsBeforeRefresh * 1000);
};
juxtapo.control.pause = function() {
    juxtapo.currentStatus = juxtapo.statuses.pause;
    juxtapo.controller.innerHTML = ">";
    clearTimeout(juxtapo.timerId);
    //reloadUrl = "http://" + location.host + location.pathname + "?status=" + juxtapo.currentStatus + "&design=" + juxtapo.designvisible + "&v=" + $(document).scrollTop() + "&dv=" + juxtapo.currentDesignView;
    //location.href = reloadUrl;
    
};
juxtapo.control.reload = function() {
    if (juxtapo.currentStatus == juxtapo.statuses.play) {
        reloadUrl = "http://" + location.host + location.pathname + "?r=" + new Date().toString() + "&status=" + juxtapo.currentStatus + "&design=" + juxtapo.designvisible + "&v=" + $(document).scrollTop() + "&dv=" + juxtapo.currentDesignView + "&di=" + juxtapo.designCurrentImageIndex;
        location.href = reloadUrl;
    }
};

juxtapo.control.toggle = function() {
    if (juxtapo.currentStatus == juxtapo.statuses.pause) {
        juxtapo.control.play();
    } else {
        juxtapo.control.pause();
    }
};

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
	juxtapo.eh.logInfo("thumbs rendering");
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



/**
 * @author david
 * @namespace juxtapo.designs
 */
juxtapo.designs = {};

// SUB CLASSES
/**
 * Create a new instance of LayoutTemplate
 * @classDescription This class creates a new LayoutTemplate
 * @param {Object} imageUrl
 * @param {Object} paths
 * @param {Object} style
 * @return {juxtapo.designs.LayoutTemplate}	Returns a new LayoutTemplate
 * @constructor
 */
juxtapo.designs.LayoutTemplate = function(imageUrl,paths,style){
	this.imageUrl = imageUrl;
	this.paths = paths;
	this.style = $.extend({},juxtapo.designs.LayoutTemplate.defaultStyles,style);
};
juxtapo.designs.LayoutTemplate.prototype = {};
juxtapo.designs.LayoutTemplate.prototype.imageUrl = '';
juxtapo.designs.LayoutTemplate.prototype.paths = [];
juxtapo.designs.LayoutTemplate.prototype.style = {};
juxtapo.designs.LayoutTemplate.defaultStyles = { position: 'absolute', 'z-index': '2000', top: '0px', left: '50%', 'margin-left': '-550px' };

// PROPERTIES

// METHODS
juxtapo.designs.change = function(previous) {
    if (previous) {
        newIndex = juxtapo.designCurrentImageIndex - 1;
        if (newIndex < 0) newIndex = juxtapo.designLayoutImages.length -1;
    } else {
        newIndex = juxtapo.designCurrentImageIndex + 1;
        if (newIndex > juxtapo.designLayoutImages.length - 1) newIndex = 0;
    }
    juxtapo.designCurrentImageIndex = newIndex;
    nextLayout = juxtapo.designLayoutImages[newIndex];
    $("#design")
        .attr("src", nextLayout.imageUrl)
        .css(nextLayout.style);
};
juxtapo.designs.back = function() {
    if (juxtapo.currentDesignView == juxtapo.designViews.hidden) {
        juxtapo.designs.show();
    } else if (juxtapo.currentDesignView == juxtapo.designViews.semiTransparent) {
        juxtapo.designs.hide();
    } else {
        juxtapo.designs.semiTransparent();
    }
};
juxtapo.designs.filterBySearch = function(q){
	if (q == "") {
		$("#juxtapo-designsDD li").show();
	}
	else {
		var results = this.search(q);
		$("#juxtapo-designsDD li").hide();
		for (var i = 0; i < results.indexes.length; i++) {
			$("#juxtapo-design-" + results.indexes[i]).show();
		}
	}
};
juxtapo.designs.forward = function() {
    if (juxtapo.currentDesignView == juxtapo.designViews.hidden) {
        juxtapo.designs.semiTransparent();
    } else if (juxtapo.currentDesignView == juxtapo.designViews.semiTransparent) {
        juxtapo.designs.show();
    } else {
        juxtapo.designs.hide();
    }
};
juxtapo.designs.getDesignImageSettings = function() {
	var href = location.href;
    for (var i = 0; i < juxtapo.designLayoutImages.length; i++) {
        layout = juxtapo.designLayoutImages[i];
        for (var p = 0; p < layout.paths.length; p++) {
            path = layout.paths[p].toLowerCase();
            if (href.juxtapoContains(path)) {
                juxtapo.designCurrentImageIndex = i;
                return layout;
            }
        }
    };
    return '/images/layout-home.jpg';
};
juxtapo.designs.hide = function() {
    $("#design").css("display", "none");
    juxtapo.designvisible = false;
    juxtapo.currentDesignView = juxtapo.designViews.hidden;
};
juxtapo.designs.init = function(){
    // layout image
    if (juxtapo.utils.getQuery("di") != null) {
        juxtapo.designCurrentImageIndex = parseInt(juxtapo.utils.getQuery("di"));
        designImageSettings = juxtapo.designLayoutImages[juxtapo.designCurrentImageIndex];
    } else {
        designImageSettings = juxtapo.designs.getDesignImageSettings();
    }
    if (designImageSettings) {
        $("body").append('<img id="design" src="' + designImageSettings.imageUrl + '" alt="design image" />');
        $("#design")
            .css({ display: 'none' })
            .css(designImageSettings.style);
        $(document).keydown(juxtapo.onBody_KeyDown);
    }	

    // design layout
    juxtapo.designlayout = document.createElement("div");
    //$(juxtapo.designlayout).attr("style", "border: solid 1px #ccc; position: fixed; top:0; left:15px; width: 45px; height: 6px; font-weight: bold; text-align: center; padding: 3px; cursor: pointer; background-color: white; font-size: 7px; z-index: 2000;");
	$(juxtapo.designlayout).attr("class","juxtapo-btn");
    juxtapo.designlayout.onclick = juxtapo.designs.toggle;
    juxtapo.designlayout.innerHTML = "D E S I G N";
    juxtapo.container.appendChild(juxtapo.designlayout);
    d = juxtapo.utils.getQuery("design");
    if (d != null) {
        juxtapo.designvisible = d;
        //if (d == 'true') { juxtapo.designs.show(); } else { juxtapo.designs.hide(); }
    }
    dv = juxtapo.utils.getQuery("dv");
    if(!dv){
    	dv = juxtapo.currentDesignView;
    }
    if (dv != null) {
        if (dv == juxtapo.designViews.hidden) {
            juxtapo.designs.hide();
        } else if (dv == juxtapo.designViews.semiTransparent) {
            juxtapo.designs.semiTransparent();
        } else {
            juxtapo.designs.show();
        }
    }

    v = juxtapo.utils.getQuery("v");
    if (v) {
        $(document).scrollTop(v);
    }

	
};
juxtapo.designs.search = function(q){
	var results = {designs:[],indexes:[]};
	for(var i =0;i < juxtapo.designLayoutImages.length;i++){
		var iDesign = juxtapo.designLayoutImages[i];
		if (iDesign.imageUrl.indexOf(q) > -1 || iDesign.paths[0].indexOf(q) > -1){
			results.designs.push(iDesign);
			results.indexes.push(i);
		}
	}
	return results;
};
juxtapo.designs.show = function() {
    $("#design").css({ display: "block", opacity: "1" });
    juxtapo.designvisible = true;
    juxtapo.currentDesignView = juxtapo.designViews.opjuxtapo;
};
juxtapo.designs.semiTransparent = function() {
    $("#design").css({ display: "block", opacity: "0.5" });
    juxtapo.designvisible = true;
    juxtapo.currentDesignView = juxtapo.designViews.semiTransparent;
};
juxtapo.designs.toggle = function() {
    juxtapo.designs.forward();
};








/**
 * @namespace juxtapo.utils
 */
(function(){

	juxtapo.utils = {
		date : {
				toShortTimeString : function(d){
				return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();  
			}		
		},
		getQuery : function(ji) {
		    hu = window.location.search.substring(1);
		    gy = hu.split("&");
		    for (i = 0; i < gy.length; i++) {
		        ft = gy[i].split("=");
		        if (ft[0] == ji) {
		            return ft[1];
		        }
		    }
		    return null;
		},
		is : {
			ie: navigator.appName == "Microsoft Internet Explorer",
			version: parseFloat(navigator.appVersion.substr(21)) || parseFloat(navigator.appVersion),
			win: navigator.platform == "Win32"
		},		
		getJsLocation : function(jsFileName){
			var scriptFiles = document.getElementsByTagName("script");
			for (var i=0;i<scriptFiles.length;i++){
				var scriptTag = scriptFiles[i];
				var scriptFileName = scriptTag.src.substring(scriptTag.src.lastIndexOf("/")+1).toLowerCase();
				scriptFileName = scriptFileName.split("?")[0];
				if (scriptFileName == jsFileName){
					return scriptTag.src.substring(0,scriptTag.src.lastIndexOf("/")+1);
				}
			}
			return null;
		},
		String : {
			contains : function(s,containing){
				return s.indexOf(containing) > -1;
			}
		}
	};

	String.prototype.juxtapoContains = function(containing){
		return juxtapo.utils.String.contains(this,containing);
	};
	
})();


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
