juxtapo.addPlugins(['../plugins/juxtapo.views/juxtapo.views.js']);

juxtapo.initConfig(function(){
    module("initConfig");
    var t = juxtapo.addTemplate("test.htm", "test.png", {});
    test("addTemplate", function(){
        var expected = new juxtapo.templates.TemplateItem("test.png", ["test.htm"], {});
        equals(t.imageUrl, expected.imageUrl, "We should have a new template");
        juxtapo.addTemplate("../tests/TestSuite-plugins.html", "../tests/test2.png", {});
        juxtapo.addTemplate("test3.htm", "../tests/test3.png", {});
        juxtapo.addTemplate("ThreeResults.htm", "../tests/item.png", {});
        juxtapo.addTemplate("THREERESULTS.htm", "../tests/page5.png", {});
        juxtapo.addTemplate("threeresults.htm", "../tests/juxtapotestsuite-screenshot.png", {});
        equals(juxtapo.designTemplates.length, 6, "There should be 6 templates")
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

