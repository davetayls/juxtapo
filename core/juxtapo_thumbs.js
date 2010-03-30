/*
 juxtapo.thumbs
 -----------------------------------------------------------*/
(function(){

	var self;
    var _dropDown = null;
    var _toolbar = new juxtapo.ui.Toolbar();
    //var _$toolbarLeft = $('<div id="juxtapo-ui-toolbarL" />');
    //var _$toolbarRight = $('<div id="juxtapo-ui-toolbarR" />');
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
		 * The {@link juxtapo.ui.dropDown} used by the thumbnail control
		 * @returns {juxtapo.ui.dropDown}
		 */        
		dropDown : function(){
			return _dropDown;
		},
		/** @private */
        init: function(){
			self = juxtapo.thumbs;
			_dropDown = new juxtapo.ui.dropDown();
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
				var thumb = new juxtapo.ui.thumbnail(juxtapo.designTemplates[i]);
				_$thumbsContainer.append(thumb.container);
            }
            $("#juxtapo-searchDesigns").keyup(this.searchKeyup);
            this.rendered = true;
            $(juxtapo.thumbs).trigger("_thumbsRendered");
        },
		/** @private */
        searchKeyup: function(e){
            juxtapo.designs.filterBySearch($("#juxtapo-searchDesigns").val());
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


