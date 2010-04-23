

/**
 * juxtapo JavaScript Library http://juxtapo.net/
 *
 * Copyright (c) 2009 David Taylor (@davetayls) Licensed under the GNU v3
 * license. http://www.gnu.org/licenses/gpl.html
 * 
 * Version 0.6
 *
 */



(function($){

    /* private */
	var _coreJsUrl = ''
    
    // Methods
    function addResources(){
        if (juxtapo.coreJsUrl()) {
            juxtapo.utils.requireResource(juxtapo.coreJsUrl() + 'juxtapo.css');
        }
    };
    function initContainer(){
        juxtapo.container = document.createElement("div");
        $(juxtapo.container).attr("id", "juxtapo-container");
        $("body").append(juxtapo.container);
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
	 * juxtapo library 
	 * @class
	 * @name juxtapo
     * @property {HtmlElement} container The div element containing the juxtapo tools
     * @property {juxtapo.designViews} currentDesignView The enum signifying the visibility of the current overlay
     * @property {juxtapo.statuses} currentStatus The enum specifying the auto refresh state
     * @property {bool} designVisible Set to true if the current design is semiTransparent or completely visible
     * @property {juxtapo.templates.TemplateItem[]} designTemplates Array of {@link juxtapo.templates.TemplateItem} which describe the designs within the project
     * @property {Object} plugins The namespace for adding plugin specific public methods/properties
     * @property {Object} globalSettings A global namespace for public methods/properties
	 */
    juxtapo = {
		version : '0.6',
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
        designVisible: false,
        designTemplates: [],
        plugins : {}, // convention for adding plugin specific functionality
		globalSettings:{},
        coreJsUrl: function(){
	        if (_coreJsUrl == '') _coreJsUrl = juxtapo.utils.getJsLocation('juxtapo.js');
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
            if (juxtapo.currentStatus != juxtapo.statuses.off) {
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
			for (var i=0;i<pluginPaths.length;i++){
				var jsLoc = juxtapo.utils.resolveAbsoluteUrl(juxtapo.coreJsUrl(),pluginPaths[i]);
				document.write("<script type=\"text/javascript\" src=\"" + jsLoc + "\"></script>");
			}
		},
        /**
         * Adds a juxtapo.templates.TemplateItem object to the designTemplates
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
            var t = new juxtapo.templates.TemplateItem(imageUrl, [path], settings);
            this.designTemplates.push(t);
            return t;
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
            juxtapo.templates.forward();
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        // Check if user presses Ctl+u or Ctl+left
        if (e.ctrlKey && (keycode == 85 || keycode == 37)) {
            juxtapo.templates.back();
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        // Check if user presses Ctl+up-arrow
        if (e.ctrlKey && keycode == 38) {
            juxtapo.templates.change(true);
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        // Check if user presses Ctl+down-arrow
        if (e.ctrlKey && keycode == 40) {
            juxtapo.templates.change(false);
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
            juxtapo.templates.nudge("top", pixels);
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        if (e.ctrlKey && keycode == 76) {
            var pixels = e.shiftKey ? 1 : 25;
            juxtapo.templates.nudge("right", pixels);
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        if (e.ctrlKey && keycode == 75) {
            var pixels = e.shiftKey ? 1 : 25;
            juxtapo.templates.nudge("bottom", pixels);
            juxtapo.utils.preventDefaultEventAction(e);
            return false;
        }
        if (e.ctrlKey && keycode == 74) {
            var pixels = e.shiftKey ? 1 : 25;
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


/**
 * @author david
 */
/*
 juxtapo.eh
 -----------------------------------------------------------*/
(function(){

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
            if (typeof(err) == "string") {
                juxtapo.eh.errors = "<li class=\"juxtapo-error\">" + err + "</li>"+juxtapo.eh.errors;
            }else if (typeof(err) == "object") {
				juxtapo.eh.errors = "<li class=\"juxtapo-error\">[object]" + juxtapo.utils.objectToStructureString(err) + "</li>"+juxtapo.eh.errors;
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




/*
 * juxtapo.control
 */
(function(){
	/**
	 * The control name
	 * @namespace
	 * @property {bool} initCompleted Set to true at the end of the init function
	 * @property {HtmlElement} controller The div element used for the play button 
	 */
	juxtapo.control = {
		
		// properties
		controller : document.createElement("div"),
		initCompleted:false,
        secondsBeforeRefresh: 2.5,
        timerId: -1,
		
		// methods
		init : function(){
			$(this.controller)
				.attr({"class":"juxtapo-btn",'id':'juxtapo-controller'})
				.click(this.toggle)
				.appendTo(juxtapo.container);
		
			/*
		    $(window).mousemove(function(){
		        clearTimeout(this.timerId);
		        if (juxtapo.currentStatus == juxtapo.statuses.play) {
		            this.timerId = setTimeout('juxtapo.control.reload()', this.secondsBeforeRefresh * 1000);
		        }
		    });*/
			
		    if (juxtapo.currentStatus == juxtapo.statuses.pause) {
		        juxtapo.control.pause();
		    } else {
		        juxtapo.control.play();
		    }
			this.initCompleted = true;
		},
		/**
		 * Sets the currentStatus to play and begins
		 * automatically refreshing the page
		 * @return {int} returns the int value of juxtapo.statuses.play
		 */
		play : function() {
		    juxtapo.currentStatus = juxtapo.statuses.play;
		    this.controller.innerHTML = "|&nbsp;|";
		    this.timerId = setTimeout('juxtapo.control.reload()', this.secondsBeforeRefresh * 1000);
			return juxtapo.currentStatus;
		},
		pause : function() {
		    juxtapo.currentStatus = juxtapo.statuses.pause;
		    this.controller.innerHTML = ">";
		    clearTimeout(this.timerId);
		    //reloadUrl = "http://" + location.host + location.pathname + "?status=" + juxtapo.currentStatus + "&design=" + juxtapo.designVisible + "&v=" + $(document).scrollTop() + "&dv=" + juxtapo.currentDesignView;
		    //location.href = reloadUrl;
			return juxtapo.currentStatus;
		},
		reload : function() {
		    if (juxtapo.currentStatus == juxtapo.statuses.play) {
				var originalUrl = juxtapo.utils.getQuery('jxurl');
				originalUrl= originalUrl? unescape(originalUrl): location.href;
				var joiner = originalUrl.indexOf('?') > -1 ? '&' : '?';
		        reloadUrl = originalUrl + 
							joiner +
							"jxurl=" + escape(originalUrl) + 
							"&r=" + new Date().toString() + 
							"&status=" + juxtapo.currentStatus + 
							"&design=" + juxtapo.designVisible + 
							"&v=" + $(document).scrollTop() + 
							"&dv=" + juxtapo.currentDesignView + 
							"&di=" + juxtapo.templates.selectedTemplateIndex;
		        location.href = reloadUrl;
		    }
		},
		toggle : function() {
		    if (juxtapo.currentStatus == juxtapo.statuses.pause) {
		        return juxtapo.control.play();
		    } else {
		        return juxtapo.control.pause();
		    }
		}
	};
	
})();


/**
 * @author david
 * @namespace juxtapo.templates
 */
(function() {

	// properties
	var _overlayImageElement = null;

	// events
	var onOverlayImagePositionChanged = function(img, oldPos, newPos) {
		$(juxtapo).trigger("_overlayImagePositionChanged", [ img, oldPos, newPos ]);
	};

	/* public */
	/**
	 * @namespace
     * @property {int} selectedTemplateIndex The index of the current matched template
	 */
	juxtapo.templates = {
		// properties
        selectedTemplateIndex: 0,
		// methods
		/**
		 * Moves the current visibility of the design back.
		 * If the visibility is set to 0 (hidden) then the visibility
		 * is set to 2 (opaque)
		 */
		back : function() {
			if (juxtapo.currentDesignView == juxtapo.designViews.hidden) {
				juxtapo.templates.show();
			} else if (juxtapo.currentDesignView == juxtapo.designViews.semiTransparent) {
				juxtapo.templates.hide();
			} else {
				juxtapo.templates.semiTransparent();
			}
		},
		/**
		 * Changes the current selected template to the next or previous template
		 * depending on the previous parameter.
		 * @param {bool} previous
		 */
		change : function(previous) {
			if (previous) {
				newIndex = juxtapo.templates.selectedTemplateIndex - 1;
				if (newIndex < 0)
					newIndex = juxtapo.designTemplates.length - 1;
			} else {
				newIndex = juxtapo.templates.selectedTemplateIndex + 1;
				if (newIndex > juxtapo.designTemplates.length - 1)
					newIndex = 0;
			}
			juxtapo.templates.changeTo(newIndex);
		},
		/**
		 * Changes the current selected template
		 * @param {juxtapo.templates.TemplateItem|number} item The TemplateItem or index of the added template
		 */
		changeTo : function(item) {
			var design = null;
			if (typeof (item) == "undefined") {
				return false;
			} else if (typeof (item) == "object") {
				design = item;
			} else if (typeof item == 'number' && item < juxtapo.designTemplates.length) {
				juxtapo.templates.selectedTemplateIndex = item;
				design = juxtapo.designTemplates[item];
			}
			if (design){
				var designStyle = $.extend({},juxtapo.templates.TemplateItem.defaultStyles,design.settings.style);
				$("#design").attr("src", design.imageUrl).css(designStyle);				
			}
		},
		/**
		 * Gets the current {@link juxtapo.templates.TemplateItem}
		 */
		selectedTemplateItem : function(){
			return juxtapo.designTemplates[juxtapo.templates.selectedTemplateIndex];
		},
		/**
		 * Gets or sets the image element used as the overlay for
		 * the templates.
		 * @param {HtmlImage} el
		 */
		overlayImageElement : function(el) {
			if (typeof (el) != "undefined") {
				_overlayImageElement = el;
			} else if (!_overlayImageElement) {
				_overlayImageElement = document.getElementById("design");
			}
			return _overlayImageElement;
		},
		/**
		 * Filters the thumbnails by a search query
		 * @param {String} q
		 */
		filterBySearch : function(q) {
			var results = null;
			var thumbs = [];
			if (q == "") {
				$("#juxtapo-thumbs-container li").show();
			} else {
				results = this.search(q);
				$("#juxtapo-thumbs-container li").hide();
				for ( var i = 0; i < results.designs.length; i++) {
					var design = results.designs[i]
					design.thumbnail.show();
				}
			}
			return {
				"q" : q,
				"designs" : results
			};
		},
		/**
		 * Moves the current visibility of the design forward.
		 * If the visibility is set to 2 (opaque) then the visibility
		 * is set to 0 (hidden)
		 */
		forward : function() {
			if (juxtapo.currentDesignView == juxtapo.designViews.hidden) {
				juxtapo.templates.semiTransparent();
			} else if (juxtapo.currentDesignView == juxtapo.designViews.semiTransparent) {
				juxtapo.templates.show();
			} else {
				juxtapo.templates.hide();
			}
		},
		/**
		 * Gets the array of {@link juxtapo.templates.TemplateItem} templates which
		 * have been added to juxtapo.
		 * @return {juxtapo.templates.TemplateItem[]}
		 */
		getAll : function(){
			return juxtapo.designTemplates;
		},
		/**
		 * Searches the paths specified within each added template for the first one that 
		 * matches the url string.
		 * 
		 * @param {String} url
		 * @return {juxtapo.templates.TemplateItem}
		 * @example
		 * - http://juxtapo.net/sample/design1.htm
		 * - /sample/design1.htm
		 * - design1.htm
	
		 * If you are using juxtapo on a static site then you would use something 
		 * like the following for a file located at: c:\juxtapo\sample\design1.htm
		 * - to match any file called design1.htm you could 
		 *   use "design1.htm"
		 * - to only match design1.htm files within the sample 
		 *   folder use "/sample/design1.htm"
		 * 
		 * You will notice this is the same as if you were using it within 
		 * a website url.
		 */
		getTemplateFromUrl : function(url) {
			var href = url.toLowerCase();
			for ( var i = 0; i < juxtapo.designTemplates.length; i++) {
				layout = juxtapo.designTemplates[i];
				for ( var p = 0; p < layout.paths.length; p++) {
					path = layout.paths[p].toLowerCase();
					if (href.juxtapoContains(path)) {
						juxtapo.templates.selectedTemplawteIndex = i;
						return layout;
					}
				}
			}
			;
			return juxtapo.designTemplates[0];
		},
		/**
		 * Hides the current overlay image
		 */
		hide : function() {
			$("#design").css("display", "none");
			juxtapo.designVisible = false;
			juxtapo.currentDesignView = juxtapo.designViews.hidden;
		},
		/**
		 * @private
		 */
		init : function() {
			// add design image to page
			$('<img id="design" src="noimage.jpg" alt="design image" />')
					.appendTo("body").css({display : 'none'});

			if (juxtapo.utils.getQuery("di") != null) {
				juxtapo.templates
						.changeTo(parseInt(juxtapo.utils.getQuery("di")));
			} else {
				juxtapo.templates.changeTo(juxtapo.templates
						.getTemplateFromUrl(location.href));
			}
			$(document).keydown(juxtapo.onBody_KeyDown);

			// design controller button
			juxtapo.designlayout = document.createElement("div");
			$(juxtapo.designlayout).attr("class", "juxtapo-btn");
			juxtapo.designlayout.onclick = juxtapo.templates.toggle;
			juxtapo.designlayout.innerHTML = "D E S I G N";
			juxtapo.container.appendChild(juxtapo.designlayout);
			d = juxtapo.utils.getQuery("design");
			if (d != null) {
				juxtapo.designVisible = d;
			}
			dv = juxtapo.utils.getQuery("dv");
			if (!dv) {
				dv = juxtapo.currentDesignView;
			}
			if (dv != null) {
				if (dv == juxtapo.designViews.hidden) {
					juxtapo.templates.hide();
				} else if (dv == juxtapo.designViews.semiTransparent) {
					juxtapo.templates.semiTransparent();
				} else {
					juxtapo.templates.show();
				}
			}

			// reset scroll position
			v = juxtapo.utils.getQuery("v");
			if (v) {
				$(document).scrollTop(v);
			}

		},
		/**
		 * Moves the current overlay image
		 * @param {String} dir This can be 'top','right','bottom','left'
		 * @param {Number} pixels The number of pixels to move the image by
		 */
		nudge : function(dir, pixels) {
			if (dir == "")
				return false;
			if (typeof (pixels) == "undefined")
				pixels = 1;
			var $img = $(this.overlayImageElement());
			var horizClass = 'margin-left';
			if ($img.css('left').indexOf('%') < 0){
				if ($img.css('right') != 'auto'){
					horizClass = 'right';
				}else{
					horizClass = 'left';
				}
			}
			
			var oldPos = {
				offSet : $img.offset(),
				position : $img.position()
			};
			switch (dir) {
			case "top":
				var currentTop = parseInt($img.css("top"));
				$img.css("top", currentTop - pixels);
				break;
			case "right":
				var currentLeft = parseInt($img.css(horizClass));
				horizClass != 'right' ? $img.css(horizClass, currentLeft + pixels): $img.css(horizClass, currentLeft - pixels);
				break;
			case "bottom":
				var currentTop = parseInt($img.css("top"));
				$img.css("top", currentTop + pixels);
				break;
			case "left":
				var currentLeft = parseInt($img.css(horizClass));
				horizClass != 'right' ? $img.css(horizClass, currentLeft - pixels): $img.css(horizClass, currentLeft + pixels);
				break;
			}
			var newPos = {
				offSet : $img.offset(),
				position : $img.position()
			};
			onOverlayImagePositionChanged($img.get(0), oldPos, newPos);
		},
		/**
		 * Search through the url paths and imagePath for each of the added 
		 * templates and return any that contain the query
		 * @param {Object} q Query to search for
		 * @return {Object} {designs[],indexes[]}
		 */
		search : function(q) {
			var results = {
				designs : [],
				indexes : []
			};
			if (q != "") {
				q = q.toLowerCase();
				for ( var i = 0; i < juxtapo.designTemplates.length; i++) {
					var iDesign = juxtapo.designTemplates[i];
					if (iDesign.imageUrl.toLowerCase().indexOf(q) > -1
							|| iDesign.paths[0].toLowerCase().indexOf(q) > -1) {
						results.designs.push(iDesign);
						results.indexes.push(i);
					}
				}
			}
			return results;
		},
		/**
		 * Show the currently selected template image
		 */
		show : function() {
			$("#design").css( {
				display : "block",
				opacity : "1"
			});
			juxtapo.designVisible = true;
			juxtapo.currentDesignView = juxtapo.designViews.opaque;
			return juxtapo.currentDesignView;
		},
		/**
		 * Make the currently selected template image semi transparent
		 */
		semiTransparent : function() {
			$("#design").css( {
				display : "block",
				opacity : "0.5"
			});
			juxtapo.designVisible = true;
			juxtapo.currentDesignView = juxtapo.designViews.semiTransparent;
		},
		/**
		 * @deprecated
		 */
		toggle : function() {
			juxtapo.templates.forward();
		},

		/* events */
		/**
		 * Adds a listener function which gets triggered when the overlay image
		 * has been moved
		 * @event
		 * @param {Object} fn(ev)
		 */
		overlayImagePositionChanged : function(fn) {
			$(juxtapo).bind("_overlayImagePositionChanged", fn);
		}
	};


	// SUB CLASSES
	/**
	 * Create a new instance of TemplateItem
	 * @class TemplateItem is the description of each template layout
	 * @param {Object} imageUrl
	 * @param {Object} paths
	 * @param {Object} settings Key value pair of settings
	 * @param {Object} settings.data Key:value set of meta data that can be used by plugins
	 * @param {Object} settings.style Key:value pair of css styles which will override the default styles
	 * @return {juxtapo.templates.TemplateItem} Returns a new TemplateItem
	 * @constructor
	 * 
	 * @property {juxtapo.ui.Thumbnail} thumbnail
	 */
	juxtapo.templates.TemplateItem = function(imageUrl, paths, settings) {
		this._init(imageUrl, paths, settings);
		return;
	};
	juxtapo.templates.TemplateItem.prototype = {
		imageUrl : '',
		paths : [],
		settings : {
			data : {},
			style : {}
		},
		thumbnail:null,
		
		_init : function(imageUrl, paths, settings){
			var self = this;
			self.imageUrl = imageUrl;
			self.paths = paths;
			self.settings = $.extend( {}, juxtapo.templates.TemplateItem.prototype.settings, settings);

			/**
			 * Sets the {@link juxtapo.ui.Thumbnail} connected with this TemplateItem
			 * @name juxtapo.templates.TemplateItem.setUiThumbnail
			 * @function
			 * @param {juxtapo.ui.Thumbnail} thumbnail
			 * @returns {juxtapo.templates.TemplateItem}
			 */			
			self.setUiThumbnail = function(thumbnail){
				self.thumbnail = thumbnail;
				$(self).trigger("_thumbnailSet");
				return self;
			};
			/**
			 * Adds a listener to the thumbnailSet event which fires
			 * when the TemplateItem receives a {@link juxtapo.ui.Thumbnail}
			 * through the {@link juxtapo.templates.TemplateItem.setUiThumbnail}
			 * method
			 * @event
			 * @example
			 * designTemplateInstance.thumbnailSet(function(ev){ code to run ... });
			 * @name juxtapo.templates.TemplateItem.thumbnailSet
			 * @param {Object} fn(ev)
			 */
			self.thumbnailSet = function(fn){
				$(self).bind("_thumbnailSet",fn);
				return self;
			};

		}
	};
	juxtapo.templates.TemplateItem.defaultStyles = {
		position : 'absolute',
		'z-index' : '2000',
		top : '0px',
		left : '50%',
		'margin-left' : '-550px'
	};

})();


(function(){

	/**
	 * Utils namespace which contains useful functions
	 * @namespace
	 */
	juxtapo.utils = {
		createCookie : function(name,value,days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
			else var expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
			return true;
		},
		/**
		 * Set of date functions
		 * @namespace
		 */
		date : {
			/**
			 * Returns a string with hours:minutes:seconds:milliseconds
			 * @param {Date} d
			 */
			toShortTimeString : function(d){
				return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();  
			}		
		},
		eraseCookie : function(name) {
			self.createCookie(name,"",-1);
			return true;
		},
		/**
		 * Returns the value of a query string variable
		 * @param {String} ji The query string variable name
		 */
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
		getJsLocation : function(jsFileName){
			jsFileName = jsFileName.toLowerCase();
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
		getKeyCombination : function(combination){
			var items = combination.split("+");
			var ret = {
				ctrl: false,
				keyCode: -1,
				shift: false
			};
			for (var i=0;i<items.length;i++){
				var itm = items[i].toLowerCase();
				if (isNaN(parseInt(itm))){
					ret.shift = (ret.shift || itm == "shift");
					ret.ctrl = (ret.ctrl || itm == "ctrl");
				}else{
					ret.keyCode = parseInt(itm);	
				}
			}
			return ret;
		},
		isAbsoluteUrl : function(url) {
		    Url = url.toLowerCase();
		    if (Url.substr(0, 7) == "http://") { return true; }
		    if (Url.substr(0, 6) == "ftp://") { return true; }
		    return false;
		},
		isRelativeUrl : function(url) {
		    Url = url.toLowerCase();
		    if (Url.substr(0, 2) == "~/") { return true; }
		    if (Url.substr(0, 3) == "../") { return true; }
		    return false;
		},
		isStaticUrl : function(url){
		    Url = url.toLowerCase();
		    if (Url.substr(0, 7) == "file://") { return true; }
		    if (Url.substr(0, 6) == "ftp://") { return true; }
			if (Url.substr(1, 1) == ":") { return true; }
		    return false;			
		},
		objectToStructureString : function(obj,tab,level){
			if (obj == window) return "window";
		    if (typeof(tab)=='undefined'){tab='';}
			if (typeof(level)=='undefined'){level=0;}
			var newLine = "<br />";
			var tabString = "&nbsp;&nbsp;&nbsp;&nbsp;"
		    // Loop through the properties/functions
		    var properties = '';
		    for (var propertyName in obj) {
		        // Check if it's NOT a function
		        if (!(obj[propertyName] instanceof Function)) {
		            if (typeof(obj[propertyName]) == 'object'){
						if (level < 3){							
		                	properties +='<li>'+propertyName+':'+newLine+juxtapo.utils.objectToStructureString(obj[propertyName],tab+tabString,level+1) + '</li>';
						}
		            }else{
		                properties +='<li>'+propertyName+':'+obj[propertyName] + '</li>';
		            }
		        }
		    }
		    // Loop through the properties/functions
		    var functions = '';
		    for (var functionName in obj) {
		        // Check if it�s a function
		        if (obj[functionName] instanceof Function) {
		            functions +='<li>'+functionName + '</li>';
		        }
		    }
		    var sReturn = '';
		    if (properties !=''){sReturn+='<li>Properties : <ul>' + properties + '</ul></li>';}
		    if (functions !=''){sReturn+=newLine+tab+'<li>Functions : <ul>'+functions + '</ul></li>';}
		    return '<ul>' + sReturn + '</ul>';
		},
		preventDefaultEventAction : function(event){
			event.preventDefault();
			event.keyCode = 0;
			event.which = 0;
			if (event.originalEvent){
				event.originalEvent.keyCode = 0;
			}
		},
		readCookie : function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		},
		requireResource : function(url,callBack){
			var head = document.getElementsByTagName('head')[0];
			var callBackRun = false;
			var resourceLoaded = false;

			if (url.substr(url.lastIndexOf(".")) == ".css"){
				var link = document.createElement('link');
				link.setAttribute('rel','stylesheet');
				link.setAttribute('type','text/css');
				link.setAttribute('href',url);
				head.appendChild(link);
				return link;

			}else if (url.substr(url.lastIndexOf(".")) == ".js"){
				var script = document.createElement('script');
				script.type= 'text/javascript';
				if (typeof(callBack) != 'undefined'){
					script.onreadystatechange= function () {
					  if (this.readyState == 'complete' && !callBackRun) {
					  	callBackRun = true;
						resourceLoaded = true;
						if (typeof(callBack) != 'undefined') callBack.call(script,url);
					  }
					};
					script.onload = function(){
						if (!callBackRun){
							callBackRun = true;
							resourceLoaded = true;
							if (typeof(callBack) != 'undefined') callBack.call(script,url);
						}
					};
				}
				script.src = url;
				$(script).appendTo(head);
				//head.appendChild(script);
				return script;
			}
			return null;
		},
		resolveAbsoluteUrl : function(baseUrl,relativeUrl) {
		    if (relativeUrl.substr(0, 1) == '/') {
		        return baseUrl + relativeUrl; 
		    }else if (self.isAbsoluteUrl(relativeUrl)) {
		        return relativeUrl;
		    } else {
		        var Loc = baseUrl;
		        Loc = Loc.substring(0, Loc.lastIndexOf('/'));
		        while (/^\.\./.test(relativeUrl)) {
		            Loc = Loc.substring(0, Loc.lastIndexOf('/'));
		            relativeUrl = relativeUrl.substring(3);
		        }
		        relativeUrl = self.String.ltrim(relativeUrl, "/");
		        return Loc + '/' + relativeUrl;
		    }
		},
		/**
		 * A namespace of string functions
		 * @namespace 
		 */
		String : {
			contains : function(s,containing){
				return s.indexOf(containing) > -1;
			},
			ltrim : function(str, chars) {
			    chars = chars || "\\s";
			    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
			},
			replace : function(str, oldChar, newChar) {
			    var RegEx = new RegExp('['+oldChar+']','g');
			    return str.replace(RegEx, newChar);
			},
			right : function(str, n){
			        if (n <= 0)     // Invalid bound, return blank string
			           return "";
			        else if (n > String(str).length)   // Invalid bound, return
			           return str;                     // entire string
			        else { // Valid bound, return appropriate substring
			           var iLen = String(str).length;
			           return String(str).substring(iLen, iLen - n);
			        }
			},
			rtrim : function(str, chars) {
			    chars = chars || "\\s";
			    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
			},
			trim : function(str, chars) {
			    return self.String.ltrim(self.String.rtrim(str, chars), chars);
			}
		}
	};

	var self = juxtapo.utils;
	String.prototype.juxtapoContains = function(containing){
		return juxtapo.utils.String.contains(this,containing);
	};
	
})();


/**
 * @author david
 */
/*
 * juxtapo.ui
 * ------------------------------------------------------------------------
 */
/**
 * UI namespace of controls
 * @namespace
 */
juxtapo.ui = {};

(function($) {

	_openDropDown = null;
	
	/**
	 * Creates a new dropDown control which puts a button in the tool strip and gives a popup
	 * @class Represents a dropDown control
	 * @constructor
	 * @param {Object} options
	 * @param {Object} options.style
	 * @property {HtmlElement} controller The button the sits on the toolstrip
	 * @property {HtmlElement} contents The main lightbox container
	 * @property {bool} expanded
	 * @property {Object} settings
	 */
	juxtapo.ui.DropDown = function(options) {
		this._init(options);
	};
	juxtapo.ui.DropDown.prototype = {
		// properties
		afterOpen : null,
		beforeOpen : null,
		controller : null,
		contents : null,
		expanded : null,
		settings : {
			cssClass : '',
			style : {
				height : 'auto',
				width : '905px'
			}
		},

		// methods
		/** @private */
		_init : function(options) {
			this.settings = $.extend( {}, this.settings, options);
			this.render();

			var self = this;
			$(document).bind("keydown", function(e) {
				if (self.expanded && e.which == 27) {
					self.show(false);
					return false;
				}
			});
		},
		contentHtml : function(s) {
			if (typeof s == "undefined") {
				return $(this.contents).html();
			} else {
				$(this.contents).html(s);
			}
		},
		/** @private */
		render : function() {
			var dd = this;

			// controller
			this.controller = document.createElement("div");
			$(this.controller).attr("class", "juxtapo-dropDown");
			/** @private */
			this.controller.onclick = function() {
				dd.toggleShow();
			};
			juxtapo.container.appendChild(this.controller);

			// pop up
			this.contents = document.createElement("div");
			$(this.contents)
				.attr("class", ("juxtapo-lightBox"))
				.css(this.settings.style);
			document.getElementsByTagName("body")[0].appendChild(this.contents);

		},
		show : function(b) {
			if (typeof (b) == "undefined")
				b = true;
			if (b && !this.expanded) {
				if (_openDropDown){
					_openDropDown.show(false);
					_openDropDown = null;
				}
				if (this.beforeOpen) {
					this.beforeOpen();
				}
				$(this.contents).show();
				$(this.controller).addClass("juxtapo-btn-open");
				this.expanded = true;
				_openDropDown = this;
				if (this.afterOpen) {
					this.afterOpen();
				}
			} else if (!b) {
				$(this.contents).hide();
				$(this.controller).removeClass("juxtapo-btn-open");
				this.expanded = false;
			}
			return this.expanded;
		},
		text : function(s) {
			if (typeof s == "undefined") {
				return $(this.controller).html();
			} else {
				$(this.controller).html(s);
			}
		},
		toggleShow : function() {
			return this.show(!this.expanded);
		}

	};
})(jQuery);

(function($) {
/**
 * Creates a new thumbnail control which contains a link to the page
 * a small image and the page name
 * @class Represents a thumbnail control
 * @constructor
 * @property {HtmlElement} caption The Html element containing the thumbnail caption
 * @property {HtmlElement} container The main thumbnail container li
 * @property {juxtapo.templates.TemplateItem} designTemplate The designTemplate this thumbnail is associated with
 * @property {HtmlElement} link The Html anchor element for the thumbnail 
 * @property {HtmlSpanElement} imageContainer The Html span element containing the thumbnail image 
 * @property {HtmlImage} image The thumbnail image
 * @property {Object} settings
 */
juxtapo.ui.Thumbnail = function(designTemplate, options) {
	this._init(designTemplate, options);
};
juxtapo.ui.Thumbnail.prototype = {
	caption : null,
	container : null,
	designTemplate : null,
	link : null,
	imageContainer : null,
	image : null,
	settings : {},

	// methods
	_init : function(designTemplate, options) {
		var self = this;

		self.settings = $.extend( {}, this.settings, options);
		self.designTemplate = designTemplate;

		self.image = $(
				'<img height="220" src="' + designTemplate.imageUrl + '" alt="design image" />')
				.get(0);
		self.imageContainer = $('<span class="juxtapo-thumb-img" />').append(
				self.image).get(0);

		self.caption = $('<span class="juxtapo-thumb-caption" />').html(
				self.designTemplate.paths[0]).get(0);
		self.link = $(
				'<a class="juxtapo-thumb-lnk" style="display:block;" href="' + self.designTemplate.paths[0] + '" />')
				.append(self.imageContainer).append(self.caption).get(0);
		self.container = $('<li class="juxtapo-thumb" />').append(self.link)
				.get(0);

		designTemplate.setUiThumbnail(self);

		/**
		 * Shows or hides the thumbnail
		 * @function
		 * @name juxtapo.ui.Thumbnail.show
		 * @param {bool} [b=true] A boolean value to determine whether to show the thumbnail 
		 */
		self.show = function(b) {
			if (typeof (b) == 'undefined')
				b = true;
			if (b) {
				$(self.container).show();
			} else {
				$(self.container).show();
			}
		};

	}
};
})(jQuery);

(function($) {
/**
 * Creates a new toolbtn control
 * @class Represents a toolbtn control
 * @constructor
 */
juxtapo.ui.ToolBtn = function(options) {
	this._init(options);
};
juxtapo.ui.ToolBtn.prototype = {
	container : null,
	contents : null,

	settings : {},

	// methods
	_init : function(designTemplate, options) {
		var self = this;

		self.settings = $.extend( {}, this.settings, options);

		self.contents = $('<span class="juxtapo-toolbtn-contents" />').get(0);
		self.container = $('<a class="juxtapo-toolbtn" />').append(
				self.contents).get(0);

		/**
		 * Adds a listener function which is triggered when a user clicks on the button
		 * @name juxtapo.ui.ToolBtn.click
		 * @event
		 * @param {Object} fn
		 */
		self.click = function(fn) {
			$(self.container).click(fn);
			return self;
		};
		/**
		 * Shows or hides the button
		 * @function
		 * @name juxtapo.ui.ToolBtn.show
		 * @param {bool} [b=true] A boolean value to determine whether to show the button 
		 */
		self.show = function(b) {
			if (typeof (b) == 'undefined')
				b = true;
			if (b) {
				$(self.container).show();
			} else {
				$(self.container).show();
			}
			return self;
		};
		/**
		 * Sets the contents of the button
		 * @property
		 * @param {Html|String} text
		 */
		self.text = function(text) {
			$(self.contents).html(text);
			return self;
		};
	}
};
})(jQuery);


(function(){	
	/**
	 * Toolbar ui control which can be added to the contents of a dropdown.
	 * @class Represents a Toolbar control
	 * @constructor
	 */
	juxtapo.ui.Toolbar = function(options){
		this._init(options);
	};
	juxtapo.ui.Toolbar.prototype = {
		_init: function(options){
			var _self = this;
			this.settings = $.extend({}, this.settings, options);
		    this.toolbar$ = $('<div class="juxtapo-ui-toolbar juxtapo-cc" class="juxtapo-cc" />');
		    this.toolbarLeft$ = $('<div class="juxtapo-ui-toolbarL juxtapo-cc" />').appendTo(_self.toolbar$);
		    this.toolbarRight$ = $('<div class="juxtapo-ui-toolbarR juxtapo-cc" />').appendTo(_self.toolbar$);
			this.appendTo = function(selector){
				_self.toolbar$.appendTo(selector);
				return _self;
			};
			this.appendLeft = function(html){
				_self.toolbarLeft$.append(html);
				return _self;
			};
			this.appendRight = function(html){
				_self.toolbarRight$.append(html);
				return _self;
			};
		},
		settings : {}
	};
})();


/*
 juxtapo.thumbs
 -----------------------------------------------------------*/
(function(){

	var self;
    var _dropDown = null;
    var _toolbar = new juxtapo.ui.Toolbar();
    var _$searchBox = $('<input id="juxtapo-searchDesigns" type="text" title="Search" />');
	var _search$ = $('<label><span class="label-text">Search:</span></label>').append(_$searchBox);
    var _$thumbsContainer = $('<ul id="juxtapo-thumbs-container" />');
 
	/**
	 * Pop up for displaying thumbnails
	 * @namespace
	 */
    juxtapo.thumbs = {
        rendered: false,
		/**
		 * The {@link juxtapo.ui.DropDown} used by the thumbnail control
		 * @returns {juxtapo.ui.DropDown}
		 */        
		dropDown : function(){
			return _dropDown;
		},
		/** @private */
        init: function(){
			self = juxtapo.thumbs;
			_dropDown = new juxtapo.ui.DropDown();
            _dropDown.text("+");
            var thumbs = this;

			/** @private */
            _dropDown.beforeOpen = function(){
                if (!thumbs.rendered) {
                    thumbs.renderThumbs();
                }
            };
			/** @private */
            _dropDown.afterOpen = function(){
                $("#juxtapo-searchDesigns").focus();
            };
        },
		/**
		 * @param {HtmlElement} el
		 */
		appendToToolbarLeft : function(el){
			_toolbar.toolbarLeft$.append(el);
			return self;
		},
		/**
		 * @param {HtmlElement} el
		 */
		appendToToolbarRight : function(el){
			_toolbar.toolbarRight$.append(el);
			return self;
		},
		/** @private */
        renderThumbs: function(){
            juxtapo.eh.logInfo("thumbs rendering");
            var designList;
            designList = "";
			var windowHeight = parseInt($(window).height());
			var contentsHeight = windowHeight - 50; 
            $(_dropDown.contents)
            	.append(_toolbar.toolbar$)
            	.append(_$thumbsContainer);
            _toolbar.toolbarLeft$.append(_search$);
			_$thumbsContainer.css("height",(contentsHeight - 39)+'px');
            for (var i = 0; i < juxtapo.designTemplates.length; i++) {
				var thumb = new juxtapo.ui.Thumbnail(juxtapo.designTemplates[i]);
				_$thumbsContainer.append(thumb.container);
            }
            $("#juxtapo-searchDesigns").keyup(this.searchKeyup);
            this.rendered = true;
            $(juxtapo.thumbs).trigger("_thumbsRendered");
        },
		/** @private */
        searchKeyup: function(e){
            juxtapo.templates.filterBySearch($("#juxtapo-searchDesigns").val());
        },
		/**
		 * The html ul element which contains the list of thumbs
		 * @returns {HtmlUlElement}
		 */
		thumbsContainer : function(){
			return _$thumbsContainer.get(0);
		},
        
        // events
        thumbsRendered : function(fn){
			$(juxtapo.thumbs).bind("_thumbsRendered", fn);
		}
    };
    
})();




(function(){

	var _dropDown = null;

	juxtapo.initComplete(function(){
        _dropDown = new juxtapo.ui.DropDown({style:{width:'300px'}});
        _dropDown.text("?");
		
		var helpHtml = '';
		helpHtml = '' +
		'<h4>juxtapo version: '+ juxtapo.version + ', <a href="http://juxtapo.net">website</a></h4>' +
		'<h4>Keyboard Shortcuts</h4>' +
		'<table width="100%">' +
		'<tr><td>Move Left</td><td>Ctrl+J [+shift for nudge]</td></tr>' +
		'<tr><td>Move Right</td><td>Ctrl+L [+shift for nudge]</td></tr>' +
		'<tr><td>Move Up</td><td>Ctrl+I [+shift for nudge]</td></tr>' +
		'<tr><td>Move Down</td><td>Ctrl+K [+shift for nudge]</td></tr>' +
		'<tr><td>Transparency Back</td><td>Ctrl+U</td></tr>' +
		'<tr><td>Transparency Forward</td><td>Ctrl+O</td></tr>' +
		'<tr><td>Auto Refresh Play/Stop</td><td>Ctrl+Space</td></tr>' +
		'</table>' +
		'<h4>Documention</h4>' +
		'<ul><li><a href="'+ juxtapo.utils.resolveAbsoluteUrl(juxtapo.coreJsUrl(),'../docs/index.htm') + '">juxtapo API documentation</a></ul>';
		
		_dropDown.contentHtml(helpHtml);
		
	});


})();


