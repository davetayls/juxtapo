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

    juxtapo.ui.dropDown = function(options){
        this._init(options);
    };
    juxtapo.ui.dropDown.prototype = {
        // properties
        afterOpen: null,
        beforeOpen: null,
        controller: null,
        contents: null,
        expanded: null,
        settings: {
            cssClass: '',
            style: {
                height: '548px',
                width: '905px'
            }
        },
        
        // methods
        _init: function(options){
            this.settings = $.extend({}, this.settings, options);
            this.render();
            
            var self = this;
            $(document).bind("keydown", function(e){
                if (self.expanded && e.which == 27) {
                    self.show(false);
                    return false;
                }
            });
        },
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
            $(this.contents).attr("class", ("juxtapo-lightBox")).css(this.settings.style);
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

juxtapo.ui.thumbnail = function(designTemplate, options){
    this._init(designTemplate, options);
};
juxtapo.ui.thumbnail.prototype = {
    caption: null,
    container: null,
    designTemplate: null,
    link: null,
    imageContainer: null,
    image: null,
    
    settings: {},
    
    // methods
    _init: function(designTemplate, options){
        var self = this;
        
        self.settings = $.extend({}, this.settings, options);
        self.designTemplate = designTemplate;
        
        self.image = $('<img height="220" src="' + designTemplate.imageUrl + '" alt="design image" />').get(0);
        self.caption = $('<span class="juxtapo-thumb-caption" />').html(self.designTemplate.paths[0]).get(0);
        self.imageContainer = $('<span class="juxtapo-thumb-img" />').append(self.image).append(self.caption).get(0);
        self.link = $('<a class="juxtapo-thumb-lnk" style="display:block;" href="' + self.designTemplate.paths[0] + '" />').append(self.imageContainer).get(0);
        self.container = $('<li class="juxtapo-thumb" />').append(self.link).get(0);
        
        designTemplate.setUiThumbnail(self);
        
        self.show = function(b){
            if (typeof(b) == 'undefined') 
                b = true;
            if (b) {
                $(self.container).show();
            }
            else {
                $(self.container).show();
            }
        };
        
    }
};

juxtapo.ui.toolbtn = function(options){
    this._init(options);
};
juxtapo.ui.toolbtn.prototype = {
    container: null,
    contents: null,
    
    settings: {},
    
    // methods
    _init: function(designTemplate, options){
        var self = this;
        
        self.settings = $.extend({}, this.settings, options);
        
        self.contents = $('<span class="juxtapo-toolbtn-contents" />').get(0);
        self.container = $('<a class="juxtapo-toolbtn" />').append(self.contents).get(0);
		
		self.click = function(fn){
			$(self.container).click(fn);
			return self;
		};     
        self.show = function(b){
            if (typeof(b) == 'undefined') 
                b = true;
            if (b) {
                $(self.container).show();
            }
            else {
                $(self.container).show();
            }
            return self;
        };
        self.text = function(text){
            $(self.contents).html(text);
            return self;
        };
    }
};

