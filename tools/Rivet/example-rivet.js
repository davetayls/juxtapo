/*
    All of the items this file dynamically adds
    get combined and compressed on deployment.
    
    The following line is used to tag this file as a combiner file
    @juxtapo.combiner[1.0]
    
    1. Change the combinerFileName to be the same as this javascript file
	   (This can be a string or a regular expression)
    2. Add includes.push("javascriptfile.js") line for each file you want to include
    
	After copying to a deployment directory run the Juxtapo.Combiner.Console.exe
	pointing to it.
	eg: Juxtapo.Combiner.Console.exe "c:\path\to\jsdirecory\"
    
    Full documentation can be found at http://juxtapo.net/combiner
---------------------------------------------------*/
(function() {

    var combinerFileName = "juxtapo.js";

    function getJsLocation(jsFileName) {
		if (typeof jsFileName === 'string') {
			jsFileName = new RegExp(jsFileName.toLowerCase());
		}
		var scriptFiles = document.getElementsByTagName("script");
		for (var i=0;i<scriptFiles.length;i+=1){
			var scriptTag = scriptFiles[i];
			var scriptFileName = scriptTag.src.substring(scriptTag.src.lastIndexOf("/")+1).toLowerCase();
			if (jsFileName.test(scriptFileName)){
				return scriptTag.src.substring(0,scriptTag.src.lastIndexOf("/")+1);
			}
		}
		throw 'Juxtapo Combiner could not match ' + jsFileName + ' to any embeded script references';
		return null;
    };
    var combinerJsLocation = getJsLocation(combinerFileName);
    var includes = [];
    includes.push("example1.js");
    includes.push("example2.js");

    function includeJs() {
        for (var i = 0; i < includes.length; i++) {
            document.write("<script type=\"text/javascript\" src=\"" + combinerJsLocation + includes[i] + "\"></script>");
        }
        return null;
    };
    includeJs();
})();
