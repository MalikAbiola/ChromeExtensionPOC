
var storageApi = chrome.storage;
var areaOfInterest = '';
var preferredWidth = 0;

$(document).ready(function () {
    $(document).arrive("tr.n1tfz", function() {
        areaOfInterest = $(this).children('td:first');
        updateView();
    });

    storageApi.onChanged.addListener(function () {
        updateView();
    });

    $('body').on('click', '#extension_schedule_btn', function() {
        scheduleButtonClickAction();
    });

    $('body').on('click', '#close_scheduler_view', function() {
        $("#scheduler_view").hide();
    });
});

var updateView = function () {
    storageApi.sync.get({activateSchedule: false}, function(item) {
        if (item.activateSchedule) {
            if (areaOfInterest !== '') {
                setupScheduler();
            }
        } else {
            $("#extension_schedule_btn").remove();
        }
    });
}

var scheduleButtonClickAction = function () {
    $('#schedule_date_time_picker').flatpickr({
        inline:true,
        minDate: new Date(),
        enableTime: true,
    });

    var schedulerView = $("#scheduler_view");
    schedulerView.css('width', preferredWidth);
    schedulerView.show();
}

var setupScheduler = function () {
    var scheduleButton = $("<button id='extension_schedule_btn'></button>")
        .text('Schedule')
        .addClass('extensionScheduleBtn');
    $("#extension_schedule_btn").remove();

    areaOfInterest.append(scheduleButton);
    loadMailScheduler();
}

var loadMailScheduler = function () {
    $.get(chrome.extension.getURL('/Html/scheduler.html'), function(data) {
        var parent = areaOfInterest.closest('table.iN');
        parent.append(data);
        preferredWidth = parent.width();
    });
}