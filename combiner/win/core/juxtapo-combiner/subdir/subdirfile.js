// @JUXTAPO_VERSION
function() {
    alert("hi");
    alert("hi"); //##DEBUG
    alert("hi");
}
//##DEBUGSTART
function() {
    alert("hi");
    alert("hi"); 
    alert("hi");
}
//##DEBUGEND
// @JUXTAPO_VERSION
function() {
    alert("1");
    alert("2"); //##DEBUG
    alert("3");
}
