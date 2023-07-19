let requestCounter = 0;
let translatedTimedText = [];
chrome.webRequest.onCompleted.addListener(
    async function (details) {
        if (details && requestCounter % 2 === 0) {
            // Clear existing array
            translatedTimedText = []
            console.log("Loading: ", details.url);

            const response = await fetch(details.url);
            let json = await response.json();

            for (let i = 0; i < json.events.length; i++) {
                const caption = json.events[i].segs[0].utf8;
                const timeStart = json.events[i].tStartMs;
                const duration = json.events[i].dDurationMs;
                translatedTimedText.push(
                    {
                        // TODO: TRANSLATE AND RETURN AN ARRAY OF TRANSLATED STRINGS
                        translatedCaption: "[Translated] " + caption,
                        timeStart: timeStart,
                        duration: duration
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

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.time) {
            const requestMs = request.time * 1000;
            for (let i = 0; i < translatedTimedText.length; i++) {
                const startTime = translatedTimedText[i].timeStart;
                const endTime = translatedTimedText[i].timeStart + translatedTimedText[i].duration;
                if (requestMs >= startTime && requestMs < endTime) {
                    sendResponse({caption: translatedTimedText[i].translatedCaption})
                    break;
                }
            }
        }
    }
)