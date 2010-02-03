/*
 *	Adds on qunit functionality to any page 
 */
(function(){

	var dropDown = new juxtapo.ui.dropDown();
	var qunitContainer = dropDown.contents;
	
	juxtapo.initCompleted(function(){
		
		$(qunitContainer)
			.html('<h1 id="qunit-header">test suite</h1><h2 id="qunit-banner"></h2><h2 id="qunit-userAgent"></h2><ol id="qunit-tests"></ol>')
			.appendTo("body");
	});

})();