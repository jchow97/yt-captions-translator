chrome.webRequest.onCompleted.addListener(
    function(details) {
        if (details) {
            console.log("Loading: ", details.url);
        }
    },
    {
        urls: ["*://*.youtube.com/api/timedtext*"],
    }
)