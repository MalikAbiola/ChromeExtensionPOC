$(document).ready(function () {
    $(document).arrive("tr.n1tfz", function() {
        var areaOfInterest = $(this).children('td:first');

        var scheduleButton = $("<button id='scheduleBtn'></button>").text('Schedule');
        var trackCheck = $("<input type='checkbox' id='trackCheck'>");

        areaOfInterest.append(scheduleButton, trackCheck);

    });
});