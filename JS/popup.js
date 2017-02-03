/**
 * Popup Page Form Action.
 */
var storageApi = chrome.storage.sync;

$(document).ready(function () {
    storageApi.get(
        {
            activateSchedule: false,
            trackMessage: false
        },
        function (savedSettings) {
            $("#activate_schedule").prop("checked", savedSettings.activateSchedule);
            $("#activate_tracking").prop("checked", savedSettings.trackMessage);
        }
    );

    $("#settings_form").submit(function(e) {
        e.preventDefault();
        var form = $(this);
        storageApi.set(
            {
                activateSchedule: $("#activate_schedule").prop("checked"),
                trackMessage: $("#activate_tracking").prop("checked")
            },
            function () {
                form.addClass("hidden");
                $("#save_settings_message").html("Saved.").removeClass("hidden");
            }
        );
    });
});
