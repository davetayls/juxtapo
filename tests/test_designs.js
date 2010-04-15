juxtapo.initComplete(function(){
    module("Designs");
    
    test("getDesignFromUrl", function(){
        ok(juxtapo.templates.getDesignFromUrl("test.htm"), "We should get image settings back");
        ok(juxtapo.templates.getDesignFromUrl("TeSt.htm"), "url should be case insensitive");
        same(juxtapo.templates.getDesignFromUrl("nofile.htm"), juxtapo.designTemplates[0], "When there is no match we should get the first template back");
        
    });
    
    test("Setting transparency", function(){
        juxtapo.templates.show();
        equals(juxtapo.currentDesignView, juxtapo.designViews.opaque, "juxtapo.templates.show() - Design view should be opaque(2)")
        juxtapo.templates.semiTransparent();
        equals(juxtapo.currentDesignView, juxtapo.designViews.semiTransparent, "juxtapo.templates.semiTransparent() - Design view should be semiTransparent(1)")
        juxtapo.templates.hide();
        equals(juxtapo.currentDesignView, juxtapo.designViews.hidden, "juxtapo.templates.hide() - Design view should be hidden(0)")
        
    });
    test("Switching transparency", function(){
        juxtapo.templates.forward();
        equals(juxtapo.currentDesignView, juxtapo.designViews.semiTransparent, "juxtapo.templates.forward() - Design view should be semiTransparent(1)")
        juxtapo.templates.forward();
        equals(juxtapo.currentDesignView, juxtapo.designViews.opaque, "juxtapo.templates.forward() - Design view should be opaque(2)")
        juxtapo.templates.forward();
        equals(juxtapo.currentDesignView, juxtapo.designViews.hidden, "juxtapo.templates.forward() - Design view should be hidden(0)")
        juxtapo.templates.back();
        equals(juxtapo.currentDesignView, juxtapo.designViews.opaque, "juxtapo.templates.back() - Design view should be opaque(2)")
        juxtapo.templates.back();
        equals(juxtapo.currentDesignView, juxtapo.designViews.semiTransparent, "juxtapo.templates.back() - Design view should be semiTransparent(1)")
        juxtapo.templates.back();
        equals(juxtapo.currentDesignView, juxtapo.designViews.hidden, "juxtapo.templates.back() - Design view should be hidden(0)")
    });
    
    test("Changing Template", function(){
        equals(juxtapo.designCurrentImageIndex, 0, "Current Template should be 0");
        juxtapo.templates.change()
        equals(juxtapo.designCurrentImageIndex, 1, "Next Template (should be 1)");
        juxtapo.templates.change()
        equals(juxtapo.designCurrentImageIndex, 2, "Next Template (should be 2)");
        juxtapo.templates.change(true)
        equals(juxtapo.designCurrentImageIndex, 1, "Previous Template (should be 1)");
    });
    
    test("search", function(){
        same(juxtapo.templates.search(""), {
            designs: [],
            indexes: []
        }, "Blank search should return an object with designs and indexes properties.");
        var results = juxtapo.templates.search("test");
        ok(results, "Search for test should not be null");
        equals(results.designs.length, 3, "Search for test should give 3 design results");
        equals(results.indexes.length, 3, "Search for test should give 3 indexes results");
    });
	
	test("nudge",function(){
		
	});
});          

