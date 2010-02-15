juxtapo.initComplete(function(){
    module("Designs");
    
    test("getDesignFromUrl", function(){
        ok(juxtapo.designs.getDesignFromUrl("test.htm"), "We should get image settings back");
        ok(juxtapo.designs.getDesignFromUrl("TeSt.htm"), "url should be case insensitive");
        same(juxtapo.designs.getDesignFromUrl("nofile.htm"), juxtapo.designTemplates[0], "When there is no match we should get the first template back");
        
    });
    
    test("Setting transparency", function(){
        juxtapo.designs.show();
        equals(juxtapo.currentDesignView, juxtapo.designViews.opaque, "juxtapo.designs.show() - Design view should be opaque(2)")
        juxtapo.designs.semiTransparent();
        equals(juxtapo.currentDesignView, juxtapo.designViews.semiTransparent, "juxtapo.designs.semiTransparent() - Design view should be semiTransparent(1)")
        juxtapo.designs.hide();
        equals(juxtapo.currentDesignView, juxtapo.designViews.hidden, "juxtapo.designs.hide() - Design view should be hidden(0)")
        
    });
    test("Switching transparency", function(){
        juxtapo.designs.forward();
        equals(juxtapo.currentDesignView, juxtapo.designViews.semiTransparent, "juxtapo.designs.forward() - Design view should be semiTransparent(1)")
        juxtapo.designs.forward();
        equals(juxtapo.currentDesignView, juxtapo.designViews.opaque, "juxtapo.designs.forward() - Design view should be opaque(2)")
        juxtapo.designs.forward();
        equals(juxtapo.currentDesignView, juxtapo.designViews.hidden, "juxtapo.designs.forward() - Design view should be hidden(0)")
        juxtapo.designs.back();
        equals(juxtapo.currentDesignView, juxtapo.designViews.opaque, "juxtapo.designs.back() - Design view should be opaque(2)")
        juxtapo.designs.back();
        equals(juxtapo.currentDesignView, juxtapo.designViews.semiTransparent, "juxtapo.designs.back() - Design view should be semiTransparent(1)")
        juxtapo.designs.back();
        equals(juxtapo.currentDesignView, juxtapo.designViews.hidden, "juxtapo.designs.back() - Design view should be hidden(0)")
    });
    
    test("Changing Template", function(){
        equals(juxtapo.designCurrentImageIndex, 0, "Current Template should be 0");
        juxtapo.designs.change()
        equals(juxtapo.designCurrentImageIndex, 1, "Next Template (should be 1)");
        juxtapo.designs.change()
        equals(juxtapo.designCurrentImageIndex, 2, "Next Template (should be 2)");
        juxtapo.designs.change(true)
        equals(juxtapo.designCurrentImageIndex, 1, "Previous Template (should be 1)");
    });
    
    test("search", function(){
        same(juxtapo.designs.search(""), {
            designs: [],
            indexes: []
        }, "Blank search should return an object with designs and indexes properties.");
        var results = juxtapo.designs.search("test");
        ok(results, "Search for test should not be null");
        equals(results.designs.length, 3, "Search for test should give 3 design results");
        equals(results.indexes.length, 3, "Search for test should give 3 indexes results");
    });
});          

