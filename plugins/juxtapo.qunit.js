/*
 *	Adds on qunit functionality to any page 
 */
(function(){

	var dropDown = null;
	var currentDesign;

	function isAbsoluteUrl(url) {
	    Url = url.toLowerCase();
	    if (left(Url, 7) == "http://") { return true; }
	    if (left(Url, 6) == "ftp://") { return true; }
	    return false;
	}
	function isRelativeUrl(url) {
	    Url = url.toLowerCase();
	    if (left(Url, 2) == "~/") { return true; }
	    if (left(Url, 3) == "../") { return true; }
	    return false;
	}
	
	function resolveAbsoluteUrl(baseUrl,relativeUrl) {
	    if (left(relativeUrl, 1) == '/') {
	        return baseUrl + relativeUrl; 
	    }else if (isAbsoluteUrl(relativeUrl)) {
	        return relativeUrl;
	    } else {
	        var Loc = baseUrl;
	        Loc = Loc.substring(0, Loc.lastIndexOf('/'));
	        while (/^\.\./.test(relativeUrl)) {
	            Loc = Loc.substring(0, Loc.lastIndexOf('/'));
	            relativeUrl = relativeUrl.substring(3);
	        }
	        relativeUrl = ltrim(relativeUrl, "/");
	        return Loc + '/' + relativeUrl;
	    }
	}
	function trim(str, chars) {
	    return ltrim(rtrim(str, chars), chars);
	}

	function ltrim(str, chars) {
	    chars = chars || "\\s";
	    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
	}

	function rtrim(str, chars) {
	    chars = chars || "\\s";
	    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
	}
	function left(str, n)
	{
	        if (n <= 0)     // Invalid bound, return blank string
	                return "";
	        else if (n > String(str).length)   // Invalid bound, return
	                return str;                // entire string
	        else // Valid bound, return appropriate substring
	                return String(str).substring(0,n);
	}
	function replace(str, oldChar, newChar) {
	    var RegEx = new RegExp('['+oldChar+']','g');
	    return str.replace(RegEx, newChar);
	}
	function right(str, n)
	{
	        if (n <= 0)     // Invalid bound, return blank string
	           return "";
	        else if (n > String(str).length)   // Invalid bound, return
	           return str;                     // entire string
	        else { // Valid bound, return appropriate substring
	           var iLen = String(str).length;
	           return String(str).substring(iLen, iLen - n);
	        }
	}

	
	
	juxtapo.initComplete(function(){

		
		dropDown = new juxtapo.ui.dropDown();
		
		dropDown.text('qunit');
		dropDown.contentHtml('<h1 id="qunit-header">test suite</h1><h2 id="qunit-banner"></h2><h2 id="qunit-userAgent"></h2><ol id="qunit-tests"></ol>');
		
		currentDesign = juxtapo.designs.currentDesign();
		if (currentDesign.settings.data.qunitTests){
			for (var i=0;i<currentDesign.settings.data.qunitTests.length;i++){
				var jsTestFile = resolveAbsoluteUrl(juxtapo.juxtapoJsFileLocation,currentDesign.settings.data.qunitTests[i]);
				juxtapo.utils.requireResource(jsTestFile);
			}
		}
		
	});

})();