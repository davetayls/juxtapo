/**
 * @namespace juxtapo.utils
 */
(function(){

	juxtapo.utils = {
		date : {
				toShortTimeString : function(d){
				return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();  
			}		
		},
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
		String : {
			contains : function(s,containing){
				return s.indexOf(containing) > -1;
			}
		}
	};

	String.prototype.juxtapoContains = function(containing){
		return juxtapo.utils.String.contains(this,containing);
	};
	
})();
