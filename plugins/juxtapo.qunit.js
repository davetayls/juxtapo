/*
 *	Adds on qunit functionality to any page 
 */
(function(){

	var dropDown = null;
	var currentDesign;

	juxtapo.initComplete(function(){

		if (QUnit){
			dropDown = new juxtapo.ui.dropDown();
			dropDown.text('qunit');
			dropDown.contentHtml('<h2 id="qunit-header">test suite</h2><h3 id="qunit-banner"></h3><h3 id="qunit-userAgent"></h3><ol id="qunit-tests"></ol>');
			
			QUnit.done = function(failures, total){
				if (failures > 0){
					$(dropDown.controller).addClass("juxtapo-eh-error");
					juxtapo.eh.logError("QUnit tests returned " + failures + " failures out of " + total + " tests");
				}else{
					$(dropDown.controller).css("background-color","#C6E746");
					dropDown.text("qunit:"+total+" tests");
				}
			};
			
			currentDesign = juxtapo.designs.currentDesign();
			if (currentDesign.settings.data.qunitTests){
				for (var i=0;i<currentDesign.settings.data.qunitTests.length;i++){
					var jsTestFile = juxtapo.utils.resolveAbsoluteUrl(juxtapo.juxtapoJsFileLocation,currentDesign.settings.data.qunitTests[i]);
					juxtapo.utils.requireResource(jsTestFile);
				}
			}
		}else{
			juxtapo.eh.logError("QUnit plugin requires qunit resources added to the page");
		}
		
	});

})();