/*
    brc.eh
-----------------------------------------------------------*/
brc.eh = {};
brc.eh.Exception = function(message, innerException) {
    this.message = message;
    this.innerException = innerException;
};
brc.eh.Exception.prototype = { message:"", innerException:null };

brc.eh.logError = function(err) {
    if (typeof (console) != "undefined") {
        console.error(err);
    }
};
brc.eh.log = function(log) {
    if (typeof (console) != "undefined") {
        console.log(log);
    }
};
