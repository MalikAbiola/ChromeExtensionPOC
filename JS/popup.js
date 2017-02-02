/**
 * Popup Page Form Action.
 */

var bg = chrome.extension.getBackgroundPage();

$(document).ready(function () {
    var settings = bg.settings.get();

    $("#activate_schedule").prop("checked", settings.schedule);
    $("#activate_tracking").prop("checked", settings.track);

    $("#settings_form").submit(function(e) {
        e.preventDefault();

        bg.settings.save($("#activate_schedule").val(), $("#activate_tracking").val());

        $(this).addClass("hidden");
        $("#save_settings_message").html("Saved.");

        $("#save_settings_message").removeClass("hidden");
    });
});
