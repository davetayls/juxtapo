/*
 * juxtapo.control
 */
(function(){
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
		
		// methods
		init : function(){
			$(this.controller)
				.attr({"class":"juxtapo-btn",'id':'juxtapo-controller'})
				.click(this.toggle)
				.appendTo(juxtapo.container);
		
			/*
		    $(window).mousemove(function(){
		        clearTimeout(juxtapo.timerId);
		        if (juxtapo.currentStatus == juxtapo.statuses.play) {
		            juxtapo.timerId = setTimeout('juxtapo.control.reload()', juxtapo.secondsBeforeRefresh * 1000);
		        }
		    });*/
			
		    if (juxtapo.currentStatus == juxtapo.statuses.pause) {
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
		    juxtapo.timerId = setTimeout('juxtapo.control.reload()', juxtapo.secondsBeforeRefresh * 1000);
			return juxtapo.currentStatus;
		},
		pause : function() {
		    juxtapo.currentStatus = juxtapo.statuses.pause;
		    this.controller.innerHTML = ">";
		    clearTimeout(juxtapo.timerId);
		    //reloadUrl = "http://" + location.host + location.pathname + "?status=" + juxtapo.currentStatus + "&design=" + juxtapo.designvisible + "&v=" + $(document).scrollTop() + "&dv=" + juxtapo.currentDesignView;
		    //location.href = reloadUrl;
			return juxtapo.currentStatus;
		},
		reload : function() {
		    if (juxtapo.currentStatus == juxtapo.statuses.play) {
				var originalUrl = juxtapo.utils.getQuery('jxurl');
				originalUrl= originalUrl? unescape(originalUrl): location.href;
				var joiner = originalUrl.indexOf('?') > -1 ? '&' : '?';
		        reloadUrl = originalUrl + 
							joiner +
							"jxurl=" + escape(originalUrl) + 
							"&r=" + new Date().toString() + 
							"&status=" + juxtapo.currentStatus + 
							"&design=" + juxtapo.designvisible + 
							"&v=" + $(document).scrollTop() + 
							"&dv=" + juxtapo.currentDesignView + 
							"&di=" + juxtapo.designCurrentImageIndex;
		        location.href = reloadUrl;
		    }
		},
		toggle : function() {
		    if (juxtapo.currentStatus == juxtapo.statuses.pause) {
		        return juxtapo.control.play();
		    } else {
		        return juxtapo.control.pause();
		    }
		}
	};
	
})();
