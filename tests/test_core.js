juxtapo.addPlugins(['../plugins/juxtapo.views/juxtapo.views.js']);

juxtapo.initConfig(function(){
    module("initConfig");
    var t = juxtapo.addTemplate("test.htm", "test.png", {});
    test("addTemplate", function(){
        var expected = new juxtapo.templates.TemplateItem("test.png", ["test.htm"], {});
        equals(t.imageUrl, expected.imageUrl, "We should have a new template");
        juxtapo.addTemplate("../tests/TestSuite-plugins.html", "../tests/test2.png", {});
        juxtapo.addTemplate("test3.htm", "../tests/test3.png", {});
        ok(
			juxtapo.addTemplate(['ThreeResults.htm','path2.htm'], "../tests/item.png", {}) instanceof juxtapo.templates.TemplateItem,
			"Can add an array of paths to add a template"
		);
        juxtapo.addTemplate("THREERESULTS.htm", "../tests/page5.png", {});
        ok(
        	juxtapo.addTemplate(new juxtapo.templates.TemplateItem("../tests/juxtapotestsuite-screenshot.png", ["threeresults.htm"], {})),
			"Passing a TemplateItem in to addTemplate"
		);
        equals(juxtapo.templates.collection.length, 6, "There should be 6 templates")
    });	
});          
juxtapo.initComplete(function(){
    module("initComplete");
    test("init", function(){
        equals(juxtapo.templates.getAll().length, 6, "There should be 6 templates")
        ok(true, "initComplete");
    });
    module("Plugins");
	test("addPlugins",function(){
		stop();
		juxtapo.thumbs.dropDown().show();
		equals(
			$('.juxtapo-toolbtn-contents:contains(List)').length,
			1,
			"thumbs toolbar includes the List button added by the views plugin"
		);
		start();
		juxtapo.thumbs.dropDown().show(false);			
	});
});          

