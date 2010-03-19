/*
All of the items this file dynamically adds 
get combined and compressed on deployment.
@juxtapo.combiner
*/

(function() {

    var getJsLocation = function(jsFileName) {
        var scriptFiles = document.getElementsByTagName("script");
        for (var i = 0; i < scriptFiles.length; i++) {
            var scriptTag = scriptFiles[i];
            var scriptFileName = scriptTag.src.substring(scriptTag.src.lastIndexOf("/") + 1).toLowerCase();
            scriptFileName = scriptFileName.split("?")[0];
            if (scriptFileName == jsFileName) {
                return scriptTag.src.substring(0, scriptTag.src.lastIndexOf("/") + 1);
            }
        }
    };

    var combinerJsLocation = getJsLocation("testcombiner.js");

    var includes = [];
    includes.push("test_1.js");
    includes.push("test_2.js");
    includes.push("test_3.js"); //##DEBUG
    //##DEBUGSTART
    includes.push("test_4.js"); 
    includes.push("test_5.js");
    //##DEBUGEND

    function includeJs() {
        for (var i = 0; i < includes.length; i++) {
            document.write("<script type=\"text/javascript\" src=\"" + combinerJsLocation + includes[i] + "\"></script>");
        }
    }
    includeJs();
})();
