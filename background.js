let requestCounter = 0
let translatedTimedText = []
chrome.webRequest.onCompleted.addListener(
    async function (details) {
        if (details && requestCounter % 2 === 0) {
            console.log("Loading: ", details.url);
            const response = await fetch(details.url);
            let json = await response.json();
            for (let i = 0; i < json.events.length; i++) {
                const caption = json.events[i].segs[0];
                const timeStart = json.events[i].tStartMs;
                translatedTimedText.push(
                    {
                        // TODO: TRANSLATE AND RETURN AN ARRAY OF TRANSLATED STRINGS
                        translatedCaption: "[Translated] " + caption,
                        timeStart: timeStart
                    });
            }
            console.log(json.events);
        }
        requestCounter++;
    },
    {
        urls: ["*://*.youtube.com/api/timedtext*"],
    }
)