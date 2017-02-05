
var storageApi = chrome.storage;
var areaOfInterest = '';
var preferredWidth = 0;
var preferredHeight = 0;

$(document).ready(function () {
    var documentBody = $("body");

    // when compose message/reply actions is shown
    $(document).arrive("tr.n1tfz", function() {
        areaOfInterest = $(this).children('td:first');
        updateView();
    });

    // when message body is shown
    $(document).arrive("div[role='textbox']", function() {
        addTracker($(this));
    });

    // listen for updated change in extension settings.
    storageApi.onChanged.addListener(function () {
        updateView();
    });

    documentBody.on('click', '#extension_schedule_btn', function(e) {
        e.preventDefault();
        scheduleButtonClickAction();
    });

    documentBody.on('click', '#close_scheduler_view', function(e) {
        e.preventDefault();
        $("#scheduler_view").hide();
    });

    documentBody.on('click', '#schedule_mail_btn', function(e) {
        e.preventDefault();

        var scheduleSuccessMessage = $("<div><h3>Mail Scheduled Successfully.</h3></div>");
        scheduleSuccessMessage.css('width', preferredWidth);
        scheduleSuccessMessage.css('min-height', preferredHeight);

        $("#scheduler_view").find(".modal-content").html(scheduleSuccessMessage);
        //@todo: close compose view
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
};

var scheduleButtonClickAction = function () {
    $('#schedule_date_time_picker').flatpickr({
        inline:true,
        minDate: new Date(),
        enableTime: true
    });

    var schedulerView = $("#scheduler_view");
    schedulerView.css('width', preferredWidth);
    schedulerView.css('min-height', preferredHeight);
    schedulerView.show();
};

var setupScheduler = function () {
    var scheduleButton = $("<button id='extension_schedule_btn'></button>")
        .text('Schedule')
        .addClass('extension-schedule-btn');

    if (areaOfInterest.has('#extension_schedule_btn').length) {
        $("#extension_schedule_btn").remove();
    }

    areaOfInterest.append(scheduleButton);
    loadMailScheduler();
};

var loadMailScheduler = function () {
    $.get(chrome.extension.getURL('/Html/scheduler.html'), function(data) {
        var parent = areaOfInterest.closest('table.iN');
        parent.append(data);
        preferredWidth = parent.width();
        preferredHeight = parent.height();
    });
};

var addTracker = function (areaOfInterest)
{
    storageApi.sync.get({trackMessage: false}, function(item) {
        if (item.trackMessage) {
            if (! areaOfInterest.has('#extension_tracter').length) {
                areaOfInterest.append($("<div id='extension_tracker'>some tracking image injected here.</div>"));
            }
        }
    });
};