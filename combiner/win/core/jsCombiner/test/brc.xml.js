/* brc.xml */
brc.xml = {};
brc.xml.loadXMLDoc = function(fname) {
    var xmlDoc;
    // code for IE
    if (window.ActiveXObject) {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.load(fname);
        return (xmlDoc);
    }
    // code for Mozilla, Firefox, Opera, etc.
    else if (window.XMLHttpRequest) {
        xmlDoc = new window.XMLHttpRequest();
        xmlDoc.open("GET", fname, false);
        xmlDoc.send("");
        return xmlDoc.responseXML;
    } else {
        alert('Your browser cannot handle this script');
    }
}
brc.xml.xslTransform = function(xml, xsl) {
    // code for IE
    if (window.ActiveXObject) {
        ex = xml.transformNode(xsl);
        return ex;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else if (document.implementation && document.implementation.createDocument) {
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        resultDocument = xsltProcessor.transformToFragment(xml, document);
        return resultDocument;
    }
}