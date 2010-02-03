/*
 *	Adds on qunit functionality to any page 
 */
(function(){

	var qunitContainer = document.createElement("div");
	
	juxtapo.initCompleted(function(){
		//juxtapo.utils.requireResource("");
		$(qunitContainer)
			.html('<h1 id="qunit-header">test suite</h1><h2 id="qunit-banner"></h2><h2 id="qunit-userAgent"></h2><ol id="qunit-tests"></ol>')
			.appendTo("body");	
	});

})();