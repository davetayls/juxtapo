/*
 * juxtapo.control
 */
(function($){
	/**
	 * The control name
	 * @namespace
	 * @property {bool} initCompleted Set to true at the end of the init function
	 * @property {HtmlElement} controller The div element used for the play button 
	 */
	juxtapo.control = {
		
		// properties
		controller : document.createElement("div"),
		initCompleted:false,
        secondsBeforeRefresh: 2.5,
        timerId: -1,
		
		// methods
		init : function(){
			$(this.controller)
				.attr({"class":"juxtapo-btn",'id':'juxtapo-controller','title':'Automatically refresh the page'})
				.click(this.toggle)
				.appendTo(juxtapo.container);
		
			/*
		    $(window).mousemove(function(){
		        clearTimeout(this.timerId);
		        if (juxtapo.currentStatus == juxtapo.statuses.play) {
		            this.timerId = setTimeout('juxtapo.control.reload()', this.secondsBeforeRefresh * 1000);
		        }
		    });*/
			
		    if (juxtapo.currentStatus === juxtapo.statuses.pause) {
		        juxtapo.control.pause();
		    } else {
		        juxtapo.control.play();
		    }
			this.initCompleted = true;
		},
		/**
		 * Sets the currentStatus to play and begins
		 * automatically refreshing the page
		 * @return {int} returns the int value of juxtapo.statuses.play
		 */
		play : function() {
		    juxtapo.currentStatus = juxtapo.statuses.play;
		    this.controller.innerHTML = "|&nbsp;|";
		    this.timerId = setTimeout('juxtapo.control.reload()', this.secondsBeforeRefresh * 1000);
			return juxtapo.currentStatus;
		},
		pause : function() {
		    juxtapo.currentStatus = juxtapo.statuses.pause;
		    this.controller.innerHTML = ">";
		    clearTimeout(this.timerId);
		    //reloadUrl = "http://" + location.host + location.pathname + "?status=" + juxtapo.currentStatus + "&design=" + juxtapo.designVisible + "&v=" + $(document).scrollTop() + "&dv=" + juxtapo.currentDesignView;
		    //location.href = reloadUrl;
			return juxtapo.currentStatus;
		},
		reload : function() {
		    if (juxtapo.currentStatus ===  juxtapo.statuses.play) {
				var originalUrl = juxtapo.utils.getQuery('jxurl');
				originalUrl= originalUrl? unescape(originalUrl): location.href;
				var joiner = originalUrl.indexOf('?') > -1 ? '&' : '?';
		        var reloadUrl = originalUrl + 
							joiner +
							"jxurl=" + escape(originalUrl) + 
							"&r=" + new Date().toString() + 
							"&status=" + juxtapo.currentStatus + 
							"&design=" + juxtapo.designVisible + 
							"&v=" + $(document).scrollTop() + 
							"&dv=" + juxtapo.currentDesignView + 
							"&di=" + juxtapo.templates.selectedTemplateIndex;
		        location.href = reloadUrl;
		    }
		},
		toggle : function() {
		    if (juxtapo.currentStatus === juxtapo.statuses.pause) {
		        return juxtapo.control.play();
		    } else {
		        return juxtapo.control.pause();
		    }
		}
	};
	
})(jQuery);
