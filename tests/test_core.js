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
});          

