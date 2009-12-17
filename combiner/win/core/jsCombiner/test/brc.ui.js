/*
	brc.ui
---------------------------------------------------------*/
brc.ui = {};
brc.ui.init = function() {
    brc.eh.log('brc.ui.init');
    $("input.date").datepicker({
        showOn: "both",
        buttonText: "show calendar",
        buttonImage: "/images/btn-calendar.gif",
        buttonImageOnly: true,
        dateFormat: 'dd/mm/y'
    });
    brc.ui.createButtons();
    brc.ui.nav.init();
    brc.ui.tabs.init();
    brc.quickBooking.init();
    $(".form-autoSubmit").formSubmitter();
    $("input.showHint").hint();
    if (document.getElementById("mod-siteMap")) {
        $("#mod-siteMap>ul>li>ul>li:odd").css({ clear: "both" });
    }
    $(".target-blank").attr("target", "_blank");
    $("a[href^=http]").attr("target", "_blank");
};
brc.ui.btnClick = function(btnId,arg){
	try {
		if (typeof(btnId) == "undefined" || btnId == "") {
			throw new brc.eh.Exception("brc.ui.btnClick requires a btnId");
		}
		$("#"+btnId).click();
		return true;
	}catch(e){
		brc.eh.logError(e);
	}
};
brc.ui.createButtons = function() {
    $("input[type=submit],input[type=button]").each(function(){
	    if (!$(this).hasClass("button-th")){
		    $(this)
			    .after('<a href="#" onclick="return !brc.ui.btnClick(\'' + $(this).attr("id") + '\');" class="button-big ' + $(this).attr("class") + '"><span>' + $(this).val() + '</span></a>')
			    .hide();
	    }
		
    });
};

/*
    brc.ui.flash
-------------------------------------------------------------*/
brc.ui.flash = {};
brc.ui.flash.init = function() {
    brc.eh.log('brc.flash.init');
    $feature = $("#feature-flash");
    if ($feature.length > 0) {
        $feature.flash(
        {
            src: '/swf/rct-promo-flash.swf',
            width: 679,
            height: 256,
            wmode: "transparent"
        },
        { update: false },
        brc.ui.flash.flashReplaced);
    }
};
brc.ui.flash.flashReplaced = function(htmlOptions) {
    $(this).find("img").fadeOut(3000);
    $.fn.flash.replace.call(this, htmlOptions);
};

/*
form auto submitter
------------------------------------------------------------*/
(function($) {
	$.fn.formSubmitter = function(settings) {
        var config = { 'formBtnSelector': '.form-btnAutoSubmit' };
        if (settings) $.extend(config, settings);
        this.each(function() {			   
			$(this).keydown(function(e){
				try {
					var keycode;
					if (window.event) keycode = window.event.keyCode;
					else if (e) keycode = e.which;
					else return true;
					if (keycode == 13) {
						$(config.formBtnSelector,this).click();
						return false;
					}
					else {
						return true;
					}
				}catch(e){
					brc.eh.logError(e);
				}
			});
        });
    };
})(jQuery);


/*
	EnterButtonSubmiter 
------------------------------------------------------------*/
brc.ui.EnterButtonSubmiter = function(settings){
	if (settings) $.extend(this,settings);
	if (this.elem){
		var ebs = this;
		$(this.elem).keydown(function(e){
			ebs.KeyPress(e); 
		});
	}
}
brc.ui.EnterButtonSubmiter.prototype = {
	btn:null,
	elem:null
}
brc.ui.EnterButtonSubmiter.prototype.KeyPress = function(e) {
	try {
		var keycode;
		if (window.event) keycode = window.event.keyCode;
		else if (e) keycode = e.which;
		else return true;
		if (keycode == 13) {
			$(this.btn).click();
			return false;
		}
		else {
			return true;
		}
	}catch(e){
		brc.eh.logError(e);
	}
}


/*
Google Map Creator
------------------------------------------------------------*/

brc.ui.GoogleMap = function(divid, centerlatitude, centerlongitude, zoom, width, height) {
    var mapHolder = document.getElementById(divid);
    mapHolder.innerHTML = "<div id=\"googleMap\" style=\"width:" + width + "px;height:" + height + "px;\"></div>";
    this.map = new GMap2(document.getElementById("googleMap"));
    var latlng = new GLatLng(lat, lon);
    this.map.setCenter(latlng, parseInt(zoom));
}


brc.ui.GoogleMap.prototype.addPoint = function(lat, lon, name) {
    var latlng = new GLatLng(lat, lon);
    var newGmarker = new GMarker(latlng, { title: name });
    this.map.addOverlay(newGmarker);
}

brc.ui.GoogleMap.prototype.addPoints = function(valuelist) {
    var venueSplit = valuelist.split("|");
    for (var i = 0; i < venueSplit.length; i++) { //details split = lat;long;id;name
        if (venueSplit[i].length > 0) {
            var detailsSplit = venueSplit[i].split(";");
            var lat = detailsSplit[0];
            var lon = detailsSplit[1];
            var id = detailsSplit[2];
            var name = detailsSplit[3];
            googleMap.addPoint(lat, lon, name);
        }
    }
}