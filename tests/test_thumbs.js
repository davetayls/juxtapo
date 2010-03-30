juxtapo.initComplete(function(){
    module("Thumbs");
    test("dropDown", function(){
        ok(juxtapo.thumbs.dropDown(), "The dropDown should have been created");
        equals(juxtapo.thumbs.dropDown().text(), "+", "drop down text should be a plus sign");
        equals(juxtapo.thumbs.dropDown().show(), true, "drop down expanded flag should be true");
        equals(juxtapo.thumbs.dropDown().show(false), false, "drop down expanded flag should be false");
        equals(juxtapo.thumbs.dropDown().toggleShow(), true, "drop down expanded flag should be true");
    });
    test("thumbnails", function(){
        equals(juxtapo.thumbs.rendered, true, "thumbnails should be rendered because the dropdown has been shown");
        var filter = juxtapo.designs.filterBySearch("2");
        ok(filter, "filter has returned an object");
        equals(filter.designs.indexes.length, 1, "filter should have returned 1 result");
        var filter = juxtapo.designs.filterBySearch("T");
        ok(filter, "filter has returned an object");
        equals(filter.designs.indexes.length, 6, "searching is not case sensitive. filter should have returned 6 results");
        juxtapo.thumbs.dropDown().show(false);
    });
});          

