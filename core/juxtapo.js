/*
    All of the items this file dynamically adds
    get combined and compressed on deployment.
    
    The following line is used to tag this file as a combiner file
    @juxtapo.combiner
    
    1. Change the combinerFileName to be the same as this javascript file
    2. Add includes.push("javascriptfile.js") lines
    
    Use this with the juxtapo-combiner.exe file on deployment.
    eg: juxtapo-combiner.exe "c:\full\path\to\jsdirecory\"
    
    Full documentation can be found at juxtapo.net    
---------------------------------------------------*/
(function() {

    var combinerFileName = "juxtapo.js";

    function getJsLocation(jsFileName) {
        var scriptFiles = document.getElementsByTagName("script");
        for (var i = 0; i < scriptFiles.length; i++) {
            var scriptTag = scriptFiles[i];
            var scriptFileName = scriptTag.src.substring(scriptTag.src.lastIndexOf("/") + 1).toLowerCase();
            scriptFileName = scriptFileName.split("?")[0];
            if (scriptFileName == jsFileName) {
                return scriptTag.src.substring(0, scriptTag.src.lastIndexOf("/") + 1);
            }
        }
        return "";
    };
    var combinerJsLocation = getJsLocation(combinerFileName);
    var includes = [];
    includes.push("juxtapo_headcomment.js");
    includes.push("juxtapo_core.js");
    includes.push("juxtapo_eh.js");
    includes.push("juxtapo_control.js");
    includes.push("juxtapo_designs.js");
    includes.push("juxtapo_utils.js");
    includes.push("juxtapo_ui.js");
    includes.push("juxtapo_ui_toolbar.js");
    includes.push("juxtapo_thumbs.js");
    includes.push("juxtapo_help.js");

    function includeJs() {
        for (var i = 0; i < includes.length; i++) {
            document.write("<script type=\"text/javascript\" src=\"" + combinerJsLocation + includes[i] + "\"></script>");
        }
        return null;
    };
    includeJs();
})();