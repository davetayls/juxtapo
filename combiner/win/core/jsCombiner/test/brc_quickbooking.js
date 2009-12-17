/*
    brc.quickbooking
--------------------------------------------*/
(function() {

    var _coursesId = "";
    var _fromDateId = "";
    var _hoverTimeout = -1;
    var _quickBookingId = "mod-quickBooking";
    var _regionName = "";
    var _selectCourseElement$ = null;
    var _selectCourseExpanded = false;
    var _selectCourseExpandedWidth = "300px";
    var _selectCourseFocused = false;
    var _selectCourseNotFocusedTimeout = -1;
    var _timeToHover = 200;
    var _toDateId = "";
    var _typeName = "";
    var optionsMasterList;

    //private
    function txtFromDateChange(dateText, inst) {
        var selectedToDate = $("#" + _toDateId).datepicker("getDate");
        var selectedFromDate = $("#" + _fromDateId).datepicker("getDate");
        if (selectedFromDate > selectedToDate) {
            var newDate = new Date(selectedFromDate);
            newDate.setDate(newDate.getDate() + 10);
            $("#" + _toDateId)
                .datepicker("setDate", newDate)
                .datepicker("option", "minDate", selectedFromDate);
        } else {
            $("#" + _toDateId).datepicker("option", "minDate", selectedFromDate);
        }
    };
    function selectCourseHoverOver() {
        brc.eh.log("brc.quickBooking.selectCourseHoverOver");
        if (!_selectCourseExpanded) {
            _hoverTimeout = setTimeout(function() {
                _selectCourseElement$.css({ width: _selectCourseExpandedWidth });
                _selectCourseExpanded = true;
            }, _timeToHover);
        }
    };
    function selectCourseHoverOut() {
        brc.eh.log("brc.quickBooking.selectCourseHoverOut");
        if (_hoverTimeout > -1) clearTimeout(_hoverTimeout);
        if (_selectCourseExpanded && !_selectCourseFocused) selectCourseClose();
    };
    var selectCourseBlur = function() {
        brc.eh.log("brc.quickBooking.selectCourseBlur");
        _selectCourseFocused = false;
        if (_selectCourseExpanded && !_selectCourseFocused) selectCourseClose();
    }
    var selectCourseFocus = function() {
        brc.eh.log("brc.quickBooking.selectCourseFocus");
        _selectCourseFocused = true;
    }
    var selectCourseClose = function() {
        brc.eh.log("brc.quickBooking.selectCourseClose");
        if (_hoverTimeout > -1) clearTimeout(_hoverTimeout);
        if (_selectCourseExpanded) {
            _selectCourseExpanded = false;
            _selectCourseElement$.animate({ width: "188" });
        }
    };

    // public
    brc.quickBooking = {
        fromDateId_set: function(fromDateId) { _fromDateId = fromDateId; },
        toDateId_set: function(toDateId) { _toDateId = toDateId; },
        coursesId_set: function(coursesId) { _coursesId = coursesId; },
        typeName_set: function(typeName) { _typeName = typeName; },
        regionName_set: function(regionName) { _regionName = regionName; },

        init: function() {
            // prevent to date from being before from date
            if (_fromDateId != "" && _toDateId != "") {
                // attach to close of date from
                $("#" + _fromDateId).datepicker("option", "onClose", txtFromDateChange);
            }
            _selectCourseElement$ = $("#mod-quickBooking .mod-quickBooking-selectCourse select");
            _selectCourseElement$
                .hover(selectCourseHoverOver, selectCourseHoverOut)
                .change(selectCourseClose)
                .focus(selectCourseFocus)
                .blur(selectCourseBlur);
        },

        refineCoursesBySelection: function() {
            if (!optionsMasterList) {
                optionsMasterList = $("#" + _coursesId + " option");
            }
            var typeSelector = $("input[name='" + _typeName + "']:checked");
            var regionSelector = $("input[name='" + _regionName + "']:checked");

            var ddl = document.getElementById(_coursesId);
            ddl.options.length = 0;

            ddl.options[ddl.options.length] = optionsMasterList[0];

            $.each(optionsMasterList, function(option) {
                var thisOption = optionsMasterList[option];
                if (thisOption.value.indexOf("|" + typeSelector.val()) != -1 && thisOption.value.indexOf("|" + regionSelector.val()) != -1) {
                    ddl.options[ddl.options.length] = thisOption;
                }
            });
        }
    };


})();