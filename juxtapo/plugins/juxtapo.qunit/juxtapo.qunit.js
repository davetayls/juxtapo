/*
 *	Adds on qunit functionality to any page 
 */
window.QUnitDone = false;

(function($){

var libUrl = juxtapo.utils.getJsLocation('juxtapo.qunit.js');
juxtapo.utils.requireResource(libUrl + "qunit.css");
juxtapo.utils.requireResource(libUrl + "qunit.js");

var _dropDown = null;
var selectedTemplateItem;
var totalResources = 0;
var resourcesLoaded = 0;
var _qunitHtml = document.createElement('div');
_qunitHtml.innerHTML = '<h2 id="qunit-header">test suite</h2><h3 id="qunit-banner"></h3><h3 id="qunit-userAgent"></h3><ol id="qunit-tests"></ol>';

juxtapo.plg.qunit = new juxtapo.Plugin({
	dropDown: function(){
		return _dropDown;
	},
	_init: function(){
		if (typeof(QUnit) != 'undefined') {
			_dropDown = new juxtapo.ui.DropDown({
				style: {
					height: '400px',
					width: '600px'
				}
			});
			// qunit html
			_dropDown.text('qunit');
			if (!document.getElementById('qunit-header')) {
				$(_dropDown.contents).append(_qunitHtml);
			}
			
			QUnit.done = function(failures, total){
				if (failures > 0) {
					$(_dropDown.controller).addClass("juxtapo-eh-error");
					juxtapo.eh.logError("QUnit tests returned " + failures + " failures out of " + total + " tests");
				}
				else {
					$(_dropDown.controller).css("background-color", "#C6E746");
					_dropDown.text("qunit:" + total + " tests");
				}
				window.QUnitDone = true;
			};
			
			if (typeof(juxtapo.globalSettings.qunitTests) != "undefined") {
				for (var i = 0; i < juxtapo.globalSettings.qunitTests.length; i++) {
					var jsTestFile = juxtapo.utils.resolveAbsoluteUrl(juxtapo.coreJsUrl(), juxtapo.globalSettings.qunitTests[i]);
					juxtapo.utils.requireResource(jsTestFile);
				}
			}
			selectedTemplateItem = juxtapo.templates.selectedTemplateItem();
			if (selectedTemplateItem) {
				if (selectedTemplateItem.settings.data.qunitTests) {
					for (var i = 0; i < selectedTemplateItem.settings.data.qunitTests.length; i++) {
						var jsTestFile = juxtapo.utils.resolveAbsoluteUrl(juxtapo.coreJsUrl(), selectedTemplateItem.settings.data.qunitTests[i]);
						juxtapo.utils.requireResource(jsTestFile);
					}
				}
			}
			
		}
		else {
			juxtapo.eh.logError("QUnit plugin requires qunit resources added to the page");
		}
		
	}
});

})(jQuery);