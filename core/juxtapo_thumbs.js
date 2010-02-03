/*
 juxtapo.thumbs
 -----------------------------------------------------------*/
(function(){

    var _dropDown = null;
 
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
                designList += '<li id="juxtapo-design-' + i + '"><a style="display:block;" href="' + juxtapo.designTemplates[i].paths[0] + '"><img height="220" src="' + juxtapo.designTemplates[i].imageUrl + '" alt="design image" /><span>' + juxtapo.designTemplates[i].paths[0] + '</span></a></li>';
            }
            _dropDown.contentHtml('<div id="juxtapo-designsToolbar"><input id="juxtapo-searchDesigns" type="text" /></div><ul id="juxtapo-designsDD">' + designList + '</ul>');
            $("#juxtapo-searchDesigns").keyup(this.searchKeyup);
            this.rendered = true;
        },
        searchKeyup: function(e){
            juxtapo.designs.filterBySearch($("#juxtapo-searchDesigns").val());
        }
    };
    
})();


