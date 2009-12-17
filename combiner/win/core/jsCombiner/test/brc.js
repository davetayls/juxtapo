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

    var combinerJsLocation = getJsLocation("brc.js");

    var includes = [];
    includes.push("brc.core.js");
    includes.push("brc.eh.js");
    includes.push("brc.ga.js");
    includes.push("brc_quickbooking.js");
    includes.push("brc.ui.js");
    includes.push("brc.ui.nav.js");
    includes.push("brc.ws.js");
    includes.push("brc.xml.js");


    function includeJs() {
        for (var i = 0; i < includes.length; i++) {
            document.write("<script type=\"text/javascript\" src=\"" + combinerJsLocation + includes[i] + "\"></script>");
        }
    }
    includeJs();
})();
