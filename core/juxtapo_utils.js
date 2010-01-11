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
				keycode: -1,
				shift: false
			};
			for (var i=0;i<items.length;i++){
				var itm = items[i].toLowerCase();
				if (isNaN(parseInt(itm))){
					ret.shift = (ret.shift || itm == "shift");
					ret.ctrl = (ret.ctrl || itm == "ctrl");
				}else{
					keycode = parseInt(itm);	
				}
			}
			return ret;
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
