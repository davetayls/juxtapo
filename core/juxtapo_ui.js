/**
 * @author david
 */
/*
 juxtapo.ui
 ------------------------------------------------------------------------*/
juxtapo.ui = {};

juxtapo.ui.blackOut = {};
juxtapo.ui.blackOut.element = document.createElement("div");
juxtapo.ui.blackOut.show = function(){

};


// juxtapo.ui.dropDown
// Control which puts a button in the tool strip and gives a popup
(function(){

    juxtapo.ui.dropDown = function(){
        this.render();
    };
    juxtapo.ui.dropDown.prototype = {
        // properties
        afterOpen: null,
        beforeOpen: null,
        controller: null,
        contents: null,
        expanded: null,
        
        // methods
        contentHtml: function(s){
            if (typeof s == "undefined") {
                return $(this.contents).html();
            }
            else {
                $(this.contents).html(s);
            }
        },
        render: function(){
            var dd = this;
            
            // controller
            this.controller = document.createElement("div");
            $(this.controller).attr("class", "juxtapo-dropDown");
            this.controller.onclick = function(){
                dd.toggleShow();
            };
            juxtapo.container.appendChild(this.controller);
            
            // pop up
            this.contents = document.createElement("div");
            $(this.contents).attr("class", "juxtapo-lightBox");
            document.getElementsByTagName("body")[0].appendChild(this.contents);
            
        },
        show: function(b){
            if (typeof(b) == "undefined") 
                b = true;
            this.expanded = b;
            if (b) {
                if (this.beforeOpen) {
                    this.beforeOpen();
                }
                $(this.contents).show(100);
                if (this.afterOpen) {
                    this.afterOpen();
                }
            }
            else {
                $(this.contents).hide(100);
            }
            return this.expanded;
        },
        text: function(s){
            if (typeof s == "undefined") {
                return $(this.controller).html();
            }
            else {
                $(this.controller).html(s);
            }
        },
        toggleShow: function(){
            return this.show(!this.expanded);
        }
        
    };
    
})();
