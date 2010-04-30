var juxtapo;

(function($){

    /* private */
	var _coreJsUrl = '';
    
    // Methods
    var addResources = function(){
        if (juxtapo.coreJsUrl()) {
            juxtapo.utils.requireResource(juxtapo.coreJsUrl() + 'juxtapo.css');
        }
    };
    var initContainer = function(){
        juxtapo.container = document.createElement("div");
        $(juxtapo.container).attr("id", "juxtapo-container");
        $("body").append(juxtapo.container);
    };
    var initStatus = function(){
        // get current status
        var s = juxtapo.utils.getQuery("status");
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
	 * juxtapo library 
	 * @class
	 * @name juxtapo
     * @property {HtmlElement} container The div element containing the juxtapo tools
     * @property {juxtapo.designViews} currentDesignView The enum signifying the visibility of the current overlay
     * @property {juxtapo.statuses} currentStatus The enum specifying the auto refresh state
     * @property {bool} designVisible Set to true if the current design is semiTransparent or completely visible
     * @property {Object} plugins The namespace for adding plugin specific public methods/properties
     * @property {Object} globalSettings A global namespace for public methods/properties
	 */
    juxtapo = {
		version : '@JUXTAPO_VERSION',
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
        designVisible: false,
        plugins : {}, // convention for adding plugin specific functionality
		globalSettings:{},
        coreJsUrl: function(){
	        if (_coreJsUrl === '') {
				_coreJsUrl = juxtapo.utils.getJsLocation('juxtapo.js');
			}
			return _coreJsUrl;
		},
        
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
            if (juxtapo.currentStatus !== juxtapo.statuses.off) {
                initContainer();
                juxtapo.templates.init();
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
			for (var i=0;i<pluginPaths.length;i+=1){
				var jsLoc = juxtapo.utils.resolveAbsoluteUrl(juxtapo.coreJsUrl(),pluginPaths[i]);
				document.write("<script type=\"text/javascript\" src=\"" + jsLoc + "\"></script>");
			}
		},
        /**
         * Adds a juxtapo.templates.TemplateItem object to the juxtapo.templates.collection
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
         * @return {juxtapo.templates.TemplateItem} Returns the new template
         */
        addTemplate: function(path, imageUrl, settings){
			if (path instanceof juxtapo.templates.TemplateItem) {
	            juxtapo.templates.collection.push(path);
	            return path;				
			} else {
				if (typeof path === 'string'){ 
					path = [path]; 
				}
	            var t = new juxtapo.templates.TemplateItem(imageUrl, path, settings);				
	            juxtapo.templates.collection.push(t);
	            return t;
			}
        },
        /**
         * This sets the default styles applied to each design template
         * image when added to the page.
         * @param {Object} styles
         */
		setDefaultStyles : function(styles){
			juxtapo.templates.TemplateItem.defaultStyles = styles;
		},
        // events
		/**
		 * Adds a listener function which gets fired when juxtapo
		 * needs the configuration to be initialised
		 * @event
		 * @example
		 * juxtapo.initConfig(function(ev){
		 *		juxtapo.addTemplate('path.htm','image.png',{}); 
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
        if (window.event) {
			keycode = window.event.keyCode;
		}
		else {
			if (e) {
				keycode = e.which;
			}
			else {
				return true;
			}
		}
        
        juxtapo.eh.logInfo("keycode is: " + keycode); // ##DEBUG
        // Check if user presses Ctl+o or Ctl+right
        if (e.ctrlKey && (keycode === 79 || keycode === 39)) {
            juxtapo.templates.forward();
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        // Check if user presses Ctl+u or Ctl+left
        if (e.ctrlKey && (keycode === 85 || keycode === 37)) {
            juxtapo.templates.back();
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        // Check if user presses Ctl+up-arrow
        if (e.ctrlKey && keycode === 38) {
            juxtapo.templates.change(true);
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        // Check if user presses Ctl+down-arrow
        if (e.ctrlKey && keycode === 40) {
            juxtapo.templates.change(false);
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        // Ctl+Space
        if (e.ctrlKey && keycode === 32) {
            juxtapo.control.toggle();
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        // nudge designs
		var pixels = e.shiftKey ? 1 : 25;
        if (e.ctrlKey && keycode === 73) {
            juxtapo.templates.nudge("top", pixels);
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        if (e.ctrlKey && keycode === 76) {
            juxtapo.templates.nudge("right", pixels);
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        if (e.ctrlKey && keycode === 75) {
            juxtapo.templates.nudge("bottom", pixels);
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        if (e.ctrlKey && keycode === 74) {
            juxtapo.templates.nudge("left", pixels);
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        
        return true;
    };
    
})(jQuery);

if (window.addEventListener) {
    window.addEventListener('load', juxtapo.init, false);
}
else 
    if (window.attachEvent) {
        window.attachEvent('onload', juxtapo.init);
    }
