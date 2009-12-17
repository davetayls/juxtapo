/**
 * @author david
 */

/*
    juxtapo.utils
-----------------------------------------------------------*/
juxtapo.utils = {};

juxtapo.utils.date = {};
juxtapo.utils.date.toShortTimeString = function(d){
	return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();  
};

juxtapo.utils.getQuery = function(ji) {
    hu = window.location.search.substring(1);
    gy = hu.split("&");
    for (i = 0; i < gy.length; i++) {
        ft = gy[i].split("=");
        if (ft[0] == ji) {
            return ft[1];
        }
    }
    return null;
};
juxtapo.utils.is = {
	ie: navigator.appName == "Microsoft Internet Explorer",
	version: parseFloat(navigator.appVersion.substr(21)) || parseFloat(navigator.appVersion),
	win: navigator.platform == "Win32"
};
juxtapo.utils.getJsLocation = function(jsFileName){
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
};