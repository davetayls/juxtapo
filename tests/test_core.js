if (juxtapo.coreJsUrl().indexOf('coverage') > -1){
	juxtapo.addPlugins(['../../plugins/juxtapo.views/juxtapo.views.js']);
}else{
	juxtapo.addPlugins(['../plugins/juxtapo.views/juxtapo.views.js']);	
}

juxtapo.setDefaultStyles({
	position : 'absolute',
	'z-index' : '2000',
	top : '0px',
	left : '50%',
	'margin-left' : '-375px'
});

juxtapo.initConfig(function(){
    module("core initConfig");
    var t = juxtapo.addTemplate("test.htm", "test.png", {});
    test("addTemplate", function(){
        var expected = new juxtapo.templates.TemplateItem("test.png", ["test.htm"], {});
        equals(t.imageUrl, expected.imageUrl, "We should have a new template");
        juxtapo.addTemplate("../../tests/TestSuite-plugins.html", "../../tests/test2.png", {});
        juxtapo.addTemplate("test3.htm", "../../tests/test3.png", {});
        ok(
			juxtapo.addTemplate(['ThreeResults.htm','path2.htm'], "../../tests/item.png", {}) instanceof juxtapo.templates.TemplateItem,
			"Can add an array of paths to add a template"
		);
        juxtapo.addTemplate("THREERESULTS.htm", "../../tests/page5.png", {});
        ok(
        	juxtapo.addTemplate(new juxtapo.templates.TemplateItem("../../tests/juxtapotestsuite-screenshot.png", ["threeresults.htm"], {})),
			"Passing a TemplateItem in to addTemplate"
		);
        equals(juxtapo.templates.collection.length, 6, "There should be 6 templates")
    });	
});          
juxtapo.initComplete(function(){
    module("core initComplete");
    test("init", function(){
        equals(juxtapo.templates.getAll().length, 6, "There should be 6 templates")
        ok(true, "initComplete");
    });
    module("core Plugins");
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

module('core');
test("core properties",function(){
	ok(juxtapo.coreJsUrl(),'finds url with coreJsUrl()');
	if (juxtapo.utils.getQuery('status')){
		same(juxtapo.currentDesignView,juxtapo.designViews.hidden,'juxtapo.currentDesignView matches juxtapo.designViews.hidden');		
		same(juxtapo.currentStatus,juxtapo.statuses.play,'juxtapo.currentStatus matches juxtapo.statuses.off');
		//juxtapo.control.pause();
	}else{
		ok(juxtapo.currentDesignView === juxtapo.designViews.hidden,'juxtapo.currentDesignView matches juxtapo.designViews.hidden');
		ok(juxtapo.currentStatus === juxtapo.statuses.pause,'juxtapo.currentStatus matches juxtapo.statuses.off');
	}
});
