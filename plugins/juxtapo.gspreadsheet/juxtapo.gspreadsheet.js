/*
 *	Adds on qunit functionality to any page 
 */
(function() {

	juxtapo.initComplete(function() {
	});

	juxtapo.gspreadsheet = {
		addTemplates : function(spreadSheetRef) {

			var jsFile = juxtapo.utils.getJsLocation("juxtapo.gspreadsheet.js") + "gspreadsheet.js";
			juxtapo.utils.requireResource(jsFile);

			GSpreadsheet.load(spreadSheetRef, {
				index : 'designRef'
			}, function(gs) {
				gs.each(function(row) {
					var settings = {};
					settings.data = {};
					for ( var x = 0; x < gs.headers.length; x++) {
						settings.data[gs.headers[x]] = row[gs.headers[x]];
					}
					var styleJSON = '{' + row.style + '}';
					eval('settings.style = '+ styleJSON);

					juxtapo.addTemplate(row.path, row.imageurl, settings);
				});
			});

		}
	};
})();