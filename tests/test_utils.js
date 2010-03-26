juxtapo.initComplete(function(){
	module("utils");
	test("date", function(){
	    var testDate = new Date("23 Dec 2010, 10:20:30");
	    equals(juxtapo.utils.date.toShortTimeString(testDate), "10:20:30:0", "to short time string");
	});
	test("getJsLocation", function(){
	    ok(juxtapo.utils.getJsLocation("juxtapo.js"), "should find the juxtapo js file");
	    equals(juxtapo.utils.getJsLocation("notincluded.js"), null, "return null for a file which isn't included");
	    
	});
	test("isAbsoluteUrl",function(){
		equals(
			juxtapo.utils.isAbsoluteUrl("http://www.juxtapo.net"),
			true,
			"isAbsoluteUrl Detects http://www.juxtapo.net is an absolute url"
		);
		equals(
			juxtapo.utils.isAbsoluteUrl("/juxtapo.js"),
			false,
			"isAbsoluteUrl Detects /juxtapo.js is not an absolute url"
		);
		equals(
			juxtapo.utils.isAbsoluteUrl("../juxtapo.js"),
			false,
			"isAbsoluteUrl Detects ../juxtapo.js is not an absolute url"
		);
	});
	test("isRelativeUrl",function(){
		equals(
			juxtapo.utils.isRelativeUrl("http://www.juxtapo.net"),
			false,
			"relativeUrl http://www.juxtapo.net is not a relative url"
		);
		equals(
			juxtapo.utils.isRelativeUrl("/juxtapo.js"),
			false,
			"relativeUrl /juxtapo.js is not a relative url"
		);
		equals(
			juxtapo.utils.isRelativeUrl("../juxtapo.js"),
			true,
			"relativeUrl ../juxtapo.js is a relative url"
		);
	});
	test("isStaticUrl",function(){
		equals(
			juxtapo.utils.isStaticUrl('file:///D:/static.html'),
			true,
			'file:///D:/static.html is a static url'
		);
		equals(
			juxtapo.utils.isStaticUrl('ftp://foo.com/static.html'),
			true,
			'ftp://foo.com/static.html is a static url'
		);
		equals(
			juxtapo.utils.isStaticUrl('d:\\static.html'),
			true,
			'd:\\static.html is a static url'
		);
		equals(
			juxtapo.utils.isStaticUrl('http://foo.com/web.html'),
			false,
			'http://foo.com/web.html is not a static url'
		);
	});
	test("requireResource",function(){		
		var absUrl = juxtapo.utils.resolveAbsoluteUrl(juxtapo.coreJsUrl(),'../tests/externalfile.js');
		equals(typeof(absUrl),'string','resolveAbsoluteUrl returns a string');
		ok(absUrl,'absUrl equals: '+absUrl);
		var res = juxtapo.utils.requireResource(absUrl);
		equals(res.tagName.toLowerCase(),'script','requireResource has returned a script tag');
		//equals($(res).parent().get(0).tagName.toLowerCase(),'head','requireResource returned tag with parent head');
		stop();
		setTimeout(function(){
			equals(
				juxtapo.globalSettings.test,
				'externalfile',
				'requireResource: the external file has set a global setting'
			);
			start();
		},100);
	});
	test("getKeyCombination ", function(){
	    same(juxtapo.utils.getKeyCombination("23+shift"), {
	        ctrl: false,
	        keyCode: 23,
	        shift: true
	    }, "should return an object with shift true and the key code");
	    same(juxtapo.utils.getKeyCombination("23+ctrl"), {
	        ctrl: true,
	        keyCode: 23,
	        shift: false
	    }, "should return an object with ctrl true and the key code");
	    same(juxtapo.utils.getKeyCombination("23+shift+ctrl"), {
	        ctrl: true,
	        keyCode: 23,
	        shift: true
	    }, "should return an object with shift and ctrl true and the key code");
	});
	test('Cookies',function(){
		ok(juxtapo.utils.eraseCookie('juxtapoTestSuiteTest'),'eraseCookie clear cookies previously created by this test');
		ok(juxtapo.utils.createCookie('juxtapoTestSuiteTest','CookieSet',3),'createCookie');
		if (!juxtapo.utils.isStaticUrl(window.location.href)){
			equals(
				juxtapo.utils.readCookie('juxtapoTestSuiteTest'),
				'CookieSet',
				'readCookie should return CookieSet'
			);			
		}
	});
	test("Strings", function(){
	    equals(juxtapo.utils.String.contains("stringabcstring", "abc"), true, "The string should contain abc");
	    equals(juxtapo.utils.String.contains("stringABCstring", "abc"), false, "The string should not contain abs as this is case sensitive");
	    equals(juxtapo.utils.String.contains("stringstring", "abc"), false, "The string should not contain abc at all");
	    equals("stringabcstring".juxtapoContains("abc"), true, "Contains function should also be available through String.juxtapoContains()");
	});
});          

