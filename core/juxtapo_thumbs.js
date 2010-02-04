/*
 juxtapo.thumbs
 -----------------------------------------------------------*/
(function(){

    var _dropDown = null;
    var _$toolbar = $('<div id="juxtapo-ui-toolbar" class="juxtapo-cc" />');
    var _$toolbarLeft = $('<div id="juxtapo-ui-toolbarL" />');
    var _$toolbarRight = $('<div id="juxtapo-ui-toolbarR" />');
    var _$searchBox = $('<input id="juxtapo-searchDesigns" type="text" />');
    var _$thumbsContainer = $('<ul id="juxtapo-designsDD" />');
 
    juxtapo.thumbs = {
        rendered: false,
        
		dropDown : function(){
			return _dropDown;
		},
        init: function(){
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
        renderThumbs: function(){
            juxtapo.eh.logInfo("thumbs rendering");
            var designList;
            designList = "";
            for (var i = 0; i < juxtapo.designTemplates.length; i++) {
                designList += '<li id="juxtapo-design-' + i + '" class="juxtapo-thumb">';
                designList += '<a class="juxtapo-thumb-lnk" style="display:block;" href="' + juxtapo.designTemplates[i].paths[0] + '">';
                designList += '<span class="juxtapo-thumb-img"><img height="220" src="' + juxtapo.designTemplates[i].imageUrl + '" alt="design image" /></span>';
                designList += '<span class="juxtapo-thumb-caption">' + juxtapo.designTemplates[i].paths[0] + '</span>';
                designList += '</a>';
                designList += '</li>';
            }
            $(_dropDown.contents)
            	.append(_$toolbar)
            	.append(_$thumbsContainer);
            _$toolbar.append(_$toolbarLeft).append(_$toolbarRight);
            _$toolbarLeft.append(_$searchBox);
            _$thumbsContainer.html(designList);
            //('<div id="juxtapo-designsToolbar"><input id="juxtapo-searchDesigns" type="text" /></div><ul id="juxtapo-designsDD">' + designList + '</ul>');
            $("#juxtapo-searchDesigns").keyup(this.searchKeyup);
            this.rendered = true;
        },
        searchKeyup: function(e){
            juxtapo.designs.filterBySearch($("#juxtapo-searchDesigns").val());
        }
    };
    
})();


