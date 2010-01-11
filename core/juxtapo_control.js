/*
 * juxtapo.control
 */
juxtapo.control = {};
juxtapo.control.init = function(){
    // controller
    juxtapo.controller = document.createElement("div");
    //$(juxtapo.controller).attr("style", "border: solid 1px #ccc; position: fixed; top:0; left:0; width: 5px; height: 6px; font-weight: bold; text-align: center; padding: 3px; cursor: pointer; background-color: white; font-size: 5px; z-index: 2000;");
	$(juxtapo.controller).attr("class","juxtapo-btn");
    juxtapo.controller.onclick = juxtapo.control.toggle;
    juxtapo.container.appendChild(juxtapo.controller);	

    window.onmousemove = juxtapo.onMouseMove;
    if (juxtapo.currentStatus == juxtapo.statuses.pause) {
        juxtapo.control.pause();
    } else {
        juxtapo.control.play();
    }

};
juxtapo.control.play = function() {
    juxtapo.currentStatus = juxtapo.statuses.play;
    juxtapo.controller.innerHTML = "|&nbsp;|";
    juxtapo.timerId = setTimeout('juxtapo.control.reload()', juxtapo.secondsBeforeRefresh * 1000);
};
juxtapo.control.pause = function() {
    juxtapo.currentStatus = juxtapo.statuses.pause;
    juxtapo.controller.innerHTML = ">";
    clearTimeout(juxtapo.timerId);
    //reloadUrl = "http://" + location.host + location.pathname + "?status=" + juxtapo.currentStatus + "&design=" + juxtapo.designvisible + "&v=" + $(document).scrollTop() + "&dv=" + juxtapo.currentDesignView;
    //location.href = reloadUrl;
    
};
juxtapo.control.reload = function() {
    if (juxtapo.currentStatus == juxtapo.statuses.play) {
        reloadUrl = "http://" + location.host + location.pathname + "?r=" + new Date().toString() + "&status=" + juxtapo.currentStatus + "&design=" + juxtapo.designvisible + "&v=" + $(document).scrollTop() + "&dv=" + juxtapo.currentDesignView + "&di=" + juxtapo.designCurrentImageIndex;
        location.href = reloadUrl;
    }
};

juxtapo.control.toggle = function() {
    if (juxtapo.currentStatus == juxtapo.statuses.pause) {
        juxtapo.control.play();
    } else {
        juxtapo.control.pause();
    }
};
