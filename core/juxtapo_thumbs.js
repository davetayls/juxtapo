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


