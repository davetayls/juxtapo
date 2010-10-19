(function($){
juxtapo.initComplete(function(){
    module("Error handling");
    test("init", function(){
        ok(juxtapo.eh.initCompleted, "Error handling init has completed");
        ok(juxtapo.eh.dropDown().controller, "controller has been created");
        ok(juxtapo.eh.dropDown().contents, "Errors box has been created");
    });
    test("logInfo/logError", function(){
        var log = juxtapo.eh.logInfo("here's some information");
        //ok(!juxtapo.eh.hasError, "Should not think there has been an error after log info");
        equals(log, juxtapo.eh.errors, "logInfo should return the current list of errors");
        juxtapo.eh.logError("an error has occured");
        ok(juxtapo.eh.hasError, "Should now have set the hasError flag");
        ok($(juxtapo.eh.dropDown().controller).hasClass("juxtapo-eh-error"), "Error handler's controller button should have a red color")
        juxtapo.eh.logError({
            message: "an error has occured",
            context: "test"
        });
		ok(juxtapo.eh.logError(1),'Send a date through as an error log');
    });
});          

})(jQuery);