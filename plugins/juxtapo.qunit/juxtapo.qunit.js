/*
 *	Adds on qunit functionality to any page 
 */
window.QUnitDone = false;
(function(){

	var dropDown = null;
	var currentDesign;
	var totalResources = 0;
	var resourcesLoaded = 0;

	juxtapo.initComplete(function(){

		var libUrl = juxtapo.utils.resolveAbsoluteUrl(juxtapo.coreJsUrl(),'../lib/');
        juxtapo.utils.requireResource(libUrl + "qunit.css");
        //juxtapo.utils.requireResource(libUrl + "qunit.js");

        if (typeof(QUnit) != 'undefined'){
			dropDown = new juxtapo.ui.DropDown({style:{height:'400px',width:'600px'}});
			dropDown.text('qunit');
			if (!document.getElementById('qunit-header')){
				dropDown.contentHtml('<h2 id="qunit-header">test suite</h2><h3 id="qunit-banner"></h3><h3 id="qunit-userAgent"></h3><ol id="qunit-tests"></ol>');				
			}
			
			QUnit.done = function(failures, total){
				if (failures > 0){
					$(dropDown.controller).addClass("juxtapo-eh-error");
					juxtapo.eh.logError("QUnit tests returned " + failures + " failures out of " + total + " tests");
				}else{
					$(dropDown.controller).css("background-color","#C6E746");
					dropDown.text("qunit:"+total+" tests");
				}
				window.QUnitDone = true;
			};
			
			if (typeof(juxtapo.globalSettings.qunitTests) != "undefined"){
				for (var i=0;i<juxtapo.globalSettings.qunitTests.length;i++){
					var jsTestFile = juxtapo.utils.resolveAbsoluteUrl(juxtapo.coreJsUrl(),juxtapo.globalSettings.qunitTests[i]);
					juxtapo.utils.requireResource(jsTestFile);
				}
			}
			currentDesign = juxtapo.designs.currentDesign();
			if (currentDesign){
				if (currentDesign.settings.data.qunitTests){
					for (var i=0;i<currentDesign.settings.data.qunitTests.length;i++){
						var jsTestFile = juxtapo.utils.resolveAbsoluteUrl(juxtapo.coreJsUrl(),currentDesign.settings.data.qunitTests[i]);
						juxtapo.utils.requireResource(jsTestFile);
					}
				}
			}
			
		}else{
			juxtapo.eh.logError("QUnit plugin requires qunit resources added to the page");
		}
		
	});

})();