/*
 juxtapo.thumbs
 -----------------------------------------------------------*/
(function($){

	var self;
    var _dropDown = null;
    var _toolbar = new juxtapo.ui.Toolbar();
    var _$searchBox = $('<input id="juxtapo-searchDesigns" type="text" title="Search" />');
	var _search$ = $('<label><span class="label-text">Search:</span></label>').append(_$searchBox);
    var _$thumbsContainer = $('<div id="juxtapo-thumbs-container" />');
 
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
			_dropDown.title('View template thumbnails');
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
			var windowHeight = parseInt($(window).height(),10);
			var contentsHeight = windowHeight - 50; 
            $(_dropDown.contents)
				.append(_toolbar.toolbar$)
				.append(_$thumbsContainer);
            _toolbar.toolbarLeft$.append(_search$);
			_$thumbsContainer.css("height",(contentsHeight - 39)+'px');
            for (var i = 0; i < juxtapo.templates.collection.length; i+=1) {
				var thumb = new juxtapo.ui.Thumbnail(juxtapo.templates.collection[i]);
				_$thumbsContainer.append(thumb.container);
            }
            _$searchBox.keyup(this.searchKeyup);
            this.rendered = true;
            $(juxtapo.thumbs).trigger("_thumbsRendered");
        },
		/** @private */
        searchKeyup: function(e){
			var q = $(this).val();
            juxtapo.templates.filterBySearch(q);
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
    
})(jQuery);


