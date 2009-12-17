var brc = {};

brc.init = function() {
    brc.eh.log('brc.init'); //##DEBUG
    brc.ui.init();
    brc.ui.flash.init();
}
$().ready(brc.init);


// ie6 fixes
if ((navigator.appName == "Microsoft Internet Explorer") && (parseFloat(navigator.appVersion.substr(21)) || parseFloat(navigator.appVersion)) < 7) {
    // allow abbr tags to be styled
    document.createElement("abbr");
};