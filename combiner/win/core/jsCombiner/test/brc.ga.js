/*
	brc.ga - Google Analytics Interactions
---------------------------------------------------------*/
brc.ga = {};

//Framework for adding custom variables. setCustomGAVariables is called after the page tracker is setup.
//Any custom analytics variables you want to set for the page are added to the brc.ga.customGAVariables array.
//After the pageTracker is created we call the setCustomGAVariables function to iterate through this array and define
//all the via the analytics api.
brc.ga.customGAVariables = new Array();

brc.ga.ecommerceTransaction;
brc.ga.ecommerceTransactionItems = new Array();

//Class to hold the custom variable properties, these are added to the custom variables array.
brc.ga.CustomGAVar = function(slot, name, trackingValue, scope, category, action) {
    this.slot = slot;
    this.name = name;
    this.trackingValue = trackingValue;
    this.scope = scope;
    this.category = category;
    this.action = action;
}

//Per transaction you can have many products associated. All the items you add
//via the addTransactionItem function will be associated with the one transaction
//object you create with the addTransaction function.
brc.ga.TransactionItem = function(orderId, sku, name, category, price, quantity) {
    this.orderId = orderId;
    this.sku = sku;
    this.name = name;
    this.category = category;
    this.price = price;
    this.quantity = quantity;
}

//Holds an Ecommerce transaction object details for Ecommerce reporting
brc.ga.Transaction = function(orderId, affiliation, total, tax) {
    this.orderId = orderId;
    this.affiliation = affiliation;
    this.total = total;
    this.tax = tax;
}

//For each custom variable you want to declare on the page.
//Category and action are required by analytics event monitoring. Pass in what category of activity it is
//and what action is being performed.
brc.ga.addCustomGAVar = function(slot, name, trackingValue, scope, category, action) {
    brc.ga.customGAVariables[brc.ga.customGAVariables.length] = new brc.ga.CustomGAVar(slot, name, trackingValue, scope, category, action);
}
//Add a single product to the ecommerce transaction
brc.ga.addTransactionItem = function(orderId, sku, name, category, price, quantity) {
    brc.ga.ecommerceTransactionItems[brc.ga.ecommerceTransactionItems.length] = new brc.ga.TransactionItem(orderId, sku, name, category, price, quantity);
}
//Populates the transaction item.
brc.ga.addTransaction = function(orderId, affiliation, total, tax) {
    brc.ga.ecommerceTransaction = new brc.ga.Transaction(orderId, affiliation, total, tax);
}

//Calls the analytics code to add the e-commerce transaction and items. Called from the pageTracker create etc code on main.aspx.
brc.ga.setTransaction = function(orderId, affiliation, total, tax) {
    if (brc.ga.ecommerceTransaction != null) {
        var trans = brc.ga.ecommerceTransaction;
        pageTracker._addTrans(trans.orderId, trans.affiliation, trans.total, trans.tax);
        for (var i = 0; i < brc.ga.ecommerceTransactionItems.length; i++) {
            var currentItem = brc.ga.ecommerceTransactionItems[i];
            pageTracker._addItem(currentItem.orderId, currentItem.sku, currentItem.name, currentItem.category, currentItem.price, currentItem.quantity);
        }
        pageTracker._trackTrans();
    }
}

//Called after the pagetracker created at the end of the page. This will add all the custom variables from the
//customGAVariables array. Also calls a function to define some query string keys.
brc.ga.setCustomGAVariables = function() {
    brc.ga.setCustomQueryStringHandlers();
    var action;
    var category;
    if (brc.ga.customGAVariables) {
        if (brc.ga.customGAVariables.length > 0) {
            var currentVar = brc.ga.customGAVariables[0];
            category = currentVar.category;
            action = currentVar.action;
            for (var i = 0; i < brc.ga.customGAVariables.length; i++) {
                currentVar = brc.ga.customGAVariables[i];
                //if the category / action have changed then fire the event. This can be used for alternative
                //tracking reports in analytics. Not required to track the custom vars.
                if (category != currentVar.category || action != currentVar.action) {
                    pageTracker._trackEvent(category, action);
                    category = currentVar.category;
                    action = currentVar.action;
                } 
                pageTracker._setCustomVar(currentVar.slot, currentVar.name, currentVar.trackingValue, currentVar.scope);
            }
            pageTracker._trackEvent(category, action);
        }
    }
}

//For BRC only - these are keys for query string values used for campaign tracking.
brc.ga.setCustomQueryStringHandlers = function() {
    //default keys for campaign urls.
    pageTracker._setCampNameKey("campaign"); //campaign name
    pageTracker._setCampMediumKey("medium"); //e.g. e-mailshot / web advert
    pageTracker._setCampSourceKey("source"); //e.g. website the ad was on
    pageTracker._setCampTermKey("term"); //e.g. workplace special offers (can set up multiple links in same mail)
}