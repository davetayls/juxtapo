juxtapo.addPlugins(['../plugins/juxtapo.views/juxtapo.views.js']);

juxtapo.initConfig(function(){
    module("initConfig");
    test("addTemplate", function(){
        var t = juxtapo.addTemplate("test.htm", "test.png", {});
        var expected = new juxtapo.designs.designTemplate("test.png", ["test.htm"], {});
        equals(t.imageUrl, expected.imageUrl, "We should have a new template");
        juxtapo.addTemplate("test2.htm", "test2.png", {});
        juxtapo.addTemplate("test3.htm", "test3.png", {});
        equals(juxtapo.designTemplates.length, 3, "There should be 3 templates")
    });	
});          
juxtapo.initComplete(function(){
    module("initComplete");
    test("init", function(){
        equals(juxtapo.designs.getAll().length, 3, "There should be 3 templates")
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

