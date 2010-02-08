/*
 juxtapo.thumbs
 -----------------------------------------------------------*/
(function(){

	var self;
    var _dropDown = null;
    var _$toolbar = $('<div id="juxtapo-ui-toolbar" class="juxtapo-cc" />');
    var _$toolbarLeft = $('<div id="juxtapo-ui-toolbarL" />');
    var _$toolbarRight = $('<div id="juxtapo-ui-toolbarR" />');
    var _$searchBox = $('<input id="juxtapo-searchDesigns" type="text" />');
    var _$thumbsContainer = $('<ul id="juxtapo-thumbs-container" />');
 
    juxtapo.thumbs = {
        rendered: false,
        
		dropDown : function(){
			return _dropDown;
		},
        init: function(){
			self = juxtapo.thumbs;
			_dropDown = new juxtapo.ui.dropDown();
            _dropDown.text("+");
            var thumbs = this;
            _dropDown.beforeOpen = function(){
                if (!thumbs.rendered) {
                    thumbs.renderThumbs();
                }
            };
            _dropDown.afterOpen = function(){
                $("#juxtapo-searchDesigns").focus();
            };
        },
		appendToToolbarLeft : function(el){
			_$toolbarLeft.append(el);
			return self;
		},
		appendToToolbarRight : function(el){
			_$toolbarRight.append(el);
			return self;
		},
        renderThumbs: function(){
            juxtapo.eh.logInfo("thumbs rendering");
            var designList;
            designList = "";
			var windowHeight = parseInt($(window).height());
			var contentsHeight = windowHeight - 50; 
            $(_dropDown.contents)
            	.append(_$toolbar)
            	.append(_$thumbsContainer)
				.css("height", contentsHeight+'px');
            _$toolbar.append(_$toolbarLeft).append(_$toolbarRight);
            _$toolbarLeft.append(_$searchBox);
			_$thumbsContainer.css("height",(contentsHeight - 37)+'px');
            for (var i = 0; i < juxtapo.designTemplates.length; i++) {
				var thumb = new juxtapo.ui.thumbnail(juxtapo.designTemplates[i]);
				_$thumbsContainer.append(thumb.container);
            }
            $("#juxtapo-searchDesigns").keyup(this.searchKeyup);
            this.rendered = true;
        },
        searchKeyup: function(e){
            juxtapo.designs.filterBySearch($("#juxtapo-searchDesigns").val());
        },
		thumbsContainer : function(){
			return _$thumbsContainer.get(0);
		}
    };
    
})();


