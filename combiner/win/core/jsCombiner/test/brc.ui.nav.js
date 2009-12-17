/*
	brc.ui.tabs
-------------------------------------------*/
brc.ui.tabs = {};
brc.ui.tabs.init = function(){
	$(".nav-tabs").tabs();
};

/*
	brc.ui.nav
-------------------------------------------*/
brc.ui.nav = {};
brc.ui.nav.primaryHoverTimeout = -1;
brc.ui.nav.$primarySubOpen = null;
brc.ui.nav.primarySubOver = false;

brc.ui.nav.tierThreeOpen = null;
brc.ui.nav.tierThreeTimeToClose = 600;
brc.ui.nav.tierThreeOver = false;

brc.ui.nav.primarySubHoverOver = function(){
	brc.ui.nav.$primarySubOpen = $(this);
	brc.ui.nav.primarySubOver = true;
	brc.ui.nav.$primarySubOpen.addClass("nav-primary-sub-hover");

	brc.ui.nav.$tierThreeOpen = $(this).children(".nav-primary-sub");
	brc.ui.nav.$tierThreeOpen.show().hover(brc.ui.nav.tierThreeHoverOver,brc.ui.nav.tierThreeHoverOut);
}
brc.ui.nav.primarySubHoverOut = function(){
	brc.ui.nav.primarySubOver = false;
	if (!brc.ui.nav.primarySubOver && !brc.ui.nav.tierThreeOver){
		brc.ui.nav.tierThreeClose();
	}
}
brc.ui.nav.tierThreeClose = function(){
	brc.ui.nav.$primarySubOpen.removeClass("nav-primary-sub-hover");
	brc.ui.nav.$primarySubOpen = null;
	brc.ui.nav.$tierThreeOpen.hide()
	brc.ui.nav.$tierThreeOpen = null;
}
brc.ui.nav.tierThreeHoverOver = function(){
	brc.ui.nav.tierThreeOver = true;
}
brc.ui.nav.tierThreeHoverOut = function(){
	//alert("out");
	brc.ui.nav.tierThreeOver = false;
	if (!brc.ui.nav.primarySubOver && !brc.ui.nav.tierThreeOver){
		brc.ui.nav.tierThreeClose();
	}
}

brc.ui.nav.init = function(){
	$("#nav-primary > ul > li").hover(brc.ui.nav.primarySubHoverOver,brc.ui.nav.primarySubHoverOut);
}
