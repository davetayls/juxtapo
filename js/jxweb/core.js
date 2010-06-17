var jxweb = {};
jxweb.ready = function(){
	$('.cp-promo').promo();
	$('a.lightBox-link').lightBox({
			imageLoading:			'/lib/jquery-lightbox-0.5/images/lightbox-ico-loading.gif',		// (string) Path and the name of the loading icon
			imageBtnPrev:			'/lib/jquery-lightbox-0.5/images/lightbox-btn-prev.gif',			// (string) Path and the name of the prev button image
			imageBtnNext:			'/lib/jquery-lightbox-0.5/images/lightbox-btn-next.gif',			// (string) Path and the name of the next button image
			imageBtnClose:			'/lib/jquery-lightbox-0.5/images/lightbox-btn-close.gif',		// (string) Path and the name of the close btn
			imageBlank:				'/lib/jquery-lightbox-0.5/images/lightbox-blank.gif',			// (string) Path and the name of a blank image (one pixel)		
	});	
};
$().ready(jxweb.ready);
