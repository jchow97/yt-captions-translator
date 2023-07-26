import DeepLTranslator from "./translationEngines/deepLTranslator.js";

let cache = {}
let requestCounter = 0;

chrome.webRequest.onCompleted.addListener(
    async function (details) {
        // Listen for HTTP requests for timedtext.
        if (details && requestCounter % 2 === 0) {
            // Update request counter right away.
            requestCounter++;

            // get the video id
            const videoId = getYoutubeVideoId(details.url);

            // check cache, if not in, make a fetch, else do nothing
            if (!cache.hasOwnProperty(videoId)) {
                let translatedTimedText = [];

                console.log("Loading: ", videoId);
                const response = await fetch(details.url);
                let json = await response.json();

                // Merge captions to one string with newline separator.
                let fullCaptions = "";
                json.events.forEach((caption) => {
                    fullCaptions += caption.segs[0].utf8 + '\n';
                });

                const translator = new DeepLTranslator();
                // Translate
                let translatedCaptions = await translator.translateStub(fullCaptions, "EN");

                // Revert to list structure.
                let translatedCaptionsList = translatedCaptions.text.split('\n');

                for (let i = 0; i < json.events.length; i++) {
                    const caption = translatedCaptionsList[i];
                    const timeStart = json.events[i].tStartMs;
                    const duration = json.events[i].dDurationMs;

                    // Append to translatedTimedText list.
                    translatedTimedText.push(
                        {
                            translatedCaption: "[Translated] " + caption,
                            timeStart: timeStart,
                            duration: duration
                        });
                }

                // Add translated text to cache
                cache[videoId] = translatedTimedText;
                console.log(translatedTimedText);
            }
        }
    },
    {
        urls: ["*://*.youtube.com/api/timedtext*"],
    }
);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // Check if we have the videoId's translation
        if (cache.hasOwnProperty(request.videoId) && request.time) {
            const requestMs = request.time * 1000;
            for (let i = 0; i < cache[request.videoId].length; i++) {
                const startTime = cache[request.videoId][i].timeStart;
                const endTime = cache[request.videoId][i].timeStart + cache[request.videoId][i].duration;
                if (requestMs >= startTime && requestMs < endTime) {
                    sendResponse({caption: cache[request.videoId][i].translatedCaption})
                    break;
                }
            }
        } else {
            console.log("Something went wrong!")
        }
    }
);

function getYoutubeVideoId(url) {
    // Create URL object
    let urlObj = new URL(url);

    // Get query parameters
    let params = new URLSearchParams(urlObj.search);

    // Get video id from parameters
    return params.get('v');
}