//http://adfaddressfinder.aquepreview.com/addressfinder.asmx

/* brc.soap */
brc.soap = {};
brc.soap.getEnvelope = function(body) {
    var soapEnv =
    "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'> \
        <soapenv:Body> \
           " + body + " \
        </soapenv:Body> \
     </soapenv:Envelope>";
    return soapEnv;
}


/*
	brc.Ws
	@constructor
*/
brc.Ws = function(wsUrl) {
    this.wsUrl = wsUrl;
}
brc.Ws.prototype = {
    wsUrl: null,
    getData: function(soapEnvelope, fnComplete, fnSuccess, fnError) {
        $.ajax({
            url: this.wsUrl,
            type: "POST",
            dataType: "xml",
            data: soapEnvelope,
            contentType: "text/xml; charset=\"utf-8\"",
            complete: fnComplete,
			password: "preview",
            success: fnSuccess,
            error: fnError,
			username: "preview"
        });
    }
}

/*
	Web Service definitions
---------------------------------------------------------*/
brc.wsAddressFinder = new brc.Ws("addressfinder.asmx");
brc.wsAddressFinder.GetAddressByPostCode = function(postCode,fnComplete, fnSuccess, fnError) {
    var soapEnv = brc.soap.getEnvelope("<GetAddressByPostCode xmlns=\"http://addressfinder.aquepreview.com/\"><postCode>" + postCode + "</postCode></GetAddressByPostCode>");
    this.getData(soapEnv, fnComplete, fnSuccess, fnError);
}

function testWs(){
	brc.wsAddressFinder.GetAddressByPostCode("cr7 7dj",function(xData, textStatus) {
        alert(xData.responseXML);
	});
}

