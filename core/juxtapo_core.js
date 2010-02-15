/**
 * juxtapo JavaScript Library http://juxtapo.net/
 *
 * Copyright (c) 2009 David Taylor (@davetayls) Licensed under the GNU v3
 * license. http://www.gnu.org/licenses/gpl.html
 * 
 * Version 0.4a
 *
 */

(function(){

    /* private */
    
    // Methods
    function addResources(){
        juxtapo.coreJsUrl = juxtapo.utils.getJsLocation('juxtapo.js');
        if (juxtapo.coreJsUrl) {
            juxtapo.utils.requireResource(juxtapo.coreJsUrl + 'juxtapo.css');
        }
    };
    function initContainer(){
        juxtapo.container = document.createElement("div");
        $(juxtapo.container).attr("id", "juxtapo-container");
        $("body").append(juxtapo.container);
        /*
         * if (juxtapo.utils.is.ie && juxtapo.utils.is.version == 6){
         * $(juxtapo.container).css({position:"absolute",top:"0",left:"0"}); }
         */
    };
    function initStatus(){
        // get current status
        s = juxtapo.utils.getQuery("status");
        if (s) {
            juxtapo.currentStatus = s;
        }
        else {
            juxtapo.currentStatus = juxtapo.statuses.pause;
        }
    };
    
    // events
    var onInitComplete = function(){
        $(juxtapo).trigger("_initComplete");
    };
    var onInitConfig = function(){
        $(juxtapo).trigger("_initConfig");
    };
    
    /* public */
	/**
	 * Juxtapo library 
	 * @class
	 * @name juxtapo
     * @property {HtmlElement} container
     * @property {HtmlElement} controller
     * @property {juxtapo.designViews} currentDesignView
     * @property {juxtapo.statuses} currentStatus
     * @property {bool} designvisible
     * @property {int} designCurrentImageIndex
     * @property {juxtapo.designs.designTemplate[]} designTemplates Array of {@link juxtapo.designs.designTemplate} which describe the designs within the project
     * @property {Object} globalSettings
     * @property {String} coreJsUrl
     * @property {int} secondsBeforeRefresh
	 */
    juxtapo = {
		/**
		 * The various states the auto refresh can be in
		 * @constant
		 * @default pause:2
		 * @field
		 * @type Object {off,play,pause}
		 */
        statuses: {
            off: 0,
            play: 1,
            pause: 2
        },
		/**
		 * The states to choose the transparency of the design
		 * @constant
		 * @type Object {hidden,semiTransparent,opaque}
		 */
        designViews: {
            hidden: 0,
            semiTransparent: 1,
            opaque: 2
        },
        
        // Properties
        container: null,
        controller: null,
        currentDesignView: 0,
        currentStatus: 2,
        //designlayout: null,
        designvisible: false,
        designCurrentImageIndex: 0,
        designTemplates: [], // list of layout images to place as the
		globalSettings:{},
        coreJsUrl: '',
        secondsBeforeRefresh: 2.5,
        timerId: -1,
        
        // methods
		/**
		 * Initialises juxtapo
		 * @private
		 */
        init: function(){
            addResources();
			onInitConfig();
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
            
            onInitComplete();
        },
		/**
		 * Adds plugin files to juxtapo
		 * @param {Object} pluginPaths An array of paths to plugins relative to the juxtapo.js
		 * @example
		 * juxtapo.addPlugins(['../plugins/juxtapo.views.js']);
		 */
        addPlugins : function(pluginPaths){
			for (var i=0;i<pluginPaths.length;i++){
				var jsLoc = juxtapo.utils.resolveAbsoluteUrl(juxtapo.coreJsUrl,pluginPaths[i]);
				juxtapo.utils.requireResource(jsLoc);
			}
		},
        /**
         * Adds a juxtapo.designs.designTemplate object to the designTemplates
         * array
         *
         * @param {String}
         *            imageUrl
         * @param {Array}
         *            paths An array of urls to match this image with
         * @param {Object}
         *            Object with the following settings
         *            - style: A set of key:value pairs to customise the style from the
         *              defaultStyles
         *            - data: A set of key:value pairs to be associated with the template 
         * @return {juxtapo.designs.designTemplate} Returns the new template
         */
        addTemplate: function(path, imageUrl, settings){
            var t = new juxtapo.designs.designTemplate(imageUrl, [path], settings);
            this.designTemplates.push(t);
            return t;
        },
        
        // events
		/**
		 * Adds a listener function which gets fired when juxtapo
		 * needs the configuration to be initialised
		 * @event
		 * @example
		 * juxtapo.iniConfig(function(ev){
		 * 		juxtapo.addTemplate('path.htm','image.png',{}); 
		 * });
		 * @param {Function} fn(ev)
		 */
        initConfig: function(fn){
            $(juxtapo).bind("_initConfig", fn);
        },
		/**
		 * Adds a listener to the initComplete event
		 * @event
		 * @example
		 * juxtapo.iniComplete(function(ev){ run code here... });
		 * @param {Function} fn(ev)
		 */
        initComplete: function(fn){
            $(juxtapo).bind("_initComplete", fn);
        }
        
    };
    
    // Methods
    
	/**
	 * Listener attached to the keydown event on the body
	 * @private
	 */
    juxtapo.onBody_KeyDown = function(e){
        var keycode;
        if (window.event) 
            keycode = window.event.keyCode;
        else 
            if (e) 
                keycode = e.which;
            else 
                return true;
        
        juxtapo.eh.logInfo("keycode is: " + keycode); // ##DEBUG
        // Check if user presses Ctl+o or Ctl+right
        if (e.ctrlKey && (keycode == 79 || keycode == 39)) {
            juxtapo.designs.forward();
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        // Check if user presses Ctl+u or Ctl+left
        if (e.ctrlKey && (keycode == 85 || keycode == 37)) {
            juxtapo.designs.back();
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        // Check if user presses Ctl+up-arrow
        if (e.ctrlKey && keycode == 38) {
            juxtapo.designs.change(true);
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        // Check if user presses Ctl+down-arrow
        if (e.ctrlKey && keycode == 40) {
            juxtapo.designs.change(false);
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        // Ctl+Space
        if (e.ctrlKey && keycode == 32) {
            juxtapo.control.toggle();
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        // nudge designs
        if (e.ctrlKey && keycode == 73) {
            var pixels = e.shiftKey ? 1 : 25;
            juxtapo.designs.nudge("top", pixels);
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        if (e.ctrlKey && keycode == 76) {
            var pixels = e.shiftKey ? 1 : 25;
            juxtapo.designs.nudge("right", pixels);
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        if (e.ctrlKey && keycode == 75) {
            var pixels = e.shiftKey ? 1 : 25;
            juxtapo.designs.nudge("bottom", pixels);
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        if (e.ctrlKey && keycode == 74) {
            var pixels = e.shiftKey ? 1 : 25;
            juxtapo.designs.nudge("left", pixels);
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        
        return true;
    };
	/** @private */
    juxtapo.onMouseMove = function(){
        clearTimeout(juxtapo.timerId);
        if (juxtapo.currentStatus == juxtapo.statuses.play) {
            juxtapo.timerId = setTimeout('juxtapo.control.reload()', juxtapo.secondsBeforeRefresh * 1000);
        }
    };
    
})();

if (window.addEventListener) {
    window.addEventListener('load', juxtapo.init, false);
}
else 
    if (window.attachEvent) {
        window.attachEvent('onload', juxtapo.init);
    }
