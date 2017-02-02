
var activateSchedule = false;
var trackMessage = false;

// Action when tabs is switched. To determine if to activate extension or not.
chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                // That fires when a page's URL contains a 'g' ...
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { urlMatches: 'https://mail.google.com/mail/*' },
                    })
                ],
                // And shows the extension's page action.
                actions: [ new chrome.declarativeContent.ShowPageAction() ]
            }
        ]);
    });
});

var settings = {
    "save" : function (schedule, track) {
        activateSchedule = schedule == "on";
        trackMessage = track == "on";
    },
    "get" : function () {
        return {
            "schedule" : activateSchedule,
            "track" : trackMessage
        };
    }
};