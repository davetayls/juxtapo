/**
 * @namespace juxtapo.utils
 */
(function(){

	/**
	 * Utils namespace which contains useful functions
	 * @namespace
	 */
	juxtapo.utils = {
		/**
		 * Set of date functions
		 * @namespace
		 */
		date : {
			/**
			 * Returns a string with hours:minutes:seconds:milliseconds
			 * @param {Date} d
			 */
			toShortTimeString : function(d){
				return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();  
			}		
		},
		/**
		 * Returns the value of a query string variable
		 * @param {String} ji The query string variable name
		 */
		getQuery : function(ji) {
		    hu = window.location.search.substring(1);
		    gy = hu.split("&");
		    for (i = 0; i < gy.length; i++) {
		        ft = gy[i].split("=");
		        if (ft[0] == ji) {
		            return ft[1];
		        }
		    }
		    return null;
		},
		is : {
			ie: navigator.appName == "Microsoft Internet Explorer",
			version: parseFloat(navigator.appVersion.substr(21)) || parseFloat(navigator.appVersion),
			win: navigator.platform == "Win32"
		},		
		getJsLocation : function(jsFileName){
			jsFileName = jsFileName.toLowerCase();
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
		},
		getKeyCombination : function(combination){
			var items = combination.split("+");
			var ret = {
				ctrl: false,
				keyCode: -1,
				shift: false
			};
			for (var i=0;i<items.length;i++){
				var itm = items[i].toLowerCase();
				if (isNaN(parseInt(itm))){
					ret.shift = (ret.shift || itm == "shift");
					ret.ctrl = (ret.ctrl || itm == "ctrl");
				}else{
					ret.keyCode = parseInt(itm);	
				}
			}
			return ret;
		},
		isAbsoluteUrl : function(url) {
		    Url = url.toLowerCase();
		    if (Url.substr(0, 7) == "http://") { return true; }
		    if (Url.substr(0, 6) == "ftp://") { return true; }
		    return false;
		},
		isRelativeUrl : function(url) {
		    Url = url.toLowerCase();
		    if (Url.substr(0, 2) == "~/") { return true; }
		    if (Url.substr(0, 3) == "../") { return true; }
		    return false;
		},
		objectToStructureString : function(obj,tab,level){
			if (obj == window) return "window";
		    if (typeof(tab)=='undefined'){tab='';}
			if (typeof(level)=='undefined'){level=0;}
			var newLine = "<br />";
			var tabString = "&nbsp;&nbsp;&nbsp;&nbsp;"
		    // Loop through the properties/functions
		    var properties = '';
		    for (var propertyName in obj) {
		        // Check if it�s NOT a function
		        if (!(obj[propertyName] instanceof Function)) {
		            if (typeof(obj[propertyName]) == 'object'){
						if (level < 3){							
		                	properties +='<li>'+propertyName+':'+newLine+juxtapo.utils.objectToStructureString(obj[propertyName],tab+tabString,level+1) + '</li>';
						}
		            }else{
		                properties +='<li>'+propertyName+':'+obj[propertyName] + '</li>';
		            }
		        }
		    }
		    // Loop through the properties/functions
		    var functions = '';
		    for (var functionName in obj) {
		        // Check if it�s a function
		        if (obj[functionName] instanceof Function) {
		            functions +='<li>'+functionName + '</li>';
		        }
		    }
		    var sReturn = '';
		    if (properties !=''){sReturn+='<li>Properties : <ul>' + properties + '</ul></li>';}
		    if (functions !=''){sReturn+=newLine+tab+'<li>Functions : <ul>'+functions + '</ul></li>';}
		    return '<ul>' + sReturn + '</ul>';
		},
		preventDefaultEventAction : function(event){
			event.preventDefault();
			event.keyCode = 0;
			event.which = 0;
			if (event.originalEvent){
				event.originalEvent.keyCode = 0;
			}
		},
		requireResource : function(url){
			if (url.substr(url.lastIndexOf(".")) == ".css"){
				$("head").append('<link href="' + url + '" rel="stylesheet" type="text/css" />');
			}else if (url.substr(url.lastIndexOf(".")) == ".js"){
				$("head").append('<script src="' + url + '" type="text/javascript" ></script>');
			}
		},
		resolveAbsoluteUrl : function(baseUrl,relativeUrl) {
		    if (relativeUrl.substr(0, 1) == '/') {
		        return baseUrl + relativeUrl; 
		    }else if (self.isAbsoluteUrl(relativeUrl)) {
		        return relativeUrl;
		    } else {
		        var Loc = baseUrl;
		        Loc = Loc.substring(0, Loc.lastIndexOf('/'));
		        while (/^\.\./.test(relativeUrl)) {
		            Loc = Loc.substring(0, Loc.lastIndexOf('/'));
		            relativeUrl = relativeUrl.substring(3);
		        }
		        relativeUrl = self.String.ltrim(relativeUrl, "/");
		        return Loc + '/' + relativeUrl;
		    }
		},
		/**
		 * A namespace of string functions
		 * @namespace 
		 */
		String : {
			contains : function(s,containing){
				return s.indexOf(containing) > -1;
			},
			ltrim : function(str, chars) {
			    chars = chars || "\\s";
			    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
			},
			replace : function(str, oldChar, newChar) {
			    var RegEx = new RegExp('['+oldChar+']','g');
			    return str.replace(RegEx, newChar);
			},
			right : function(str, n){
			        if (n <= 0)     // Invalid bound, return blank string
			           return "";
			        else if (n > String(str).length)   // Invalid bound, return
			           return str;                     // entire string
			        else { // Valid bound, return appropriate substring
			           var iLen = String(str).length;
			           return String(str).substring(iLen, iLen - n);
			        }
			},
			rtrim : function(str, chars) {
			    chars = chars || "\\s";
			    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
			},
			trim : function(str, chars) {
			    return self.String.ltrim(self.String.rtrim(str, chars), chars);
			}
		}
	};

	var self = juxtapo.utils;
	String.prototype.juxtapoContains = function(containing){
		return juxtapo.utils.String.contains(this,containing);
	};
	
})();
