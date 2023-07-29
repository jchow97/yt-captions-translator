import DeepLTranslator from "./translationEngines/deepLTranslator.js";

let cache = {}
let requestCounter = 0;

chrome.webRequest.onCompleted.addListener(
    function (details) {
        // Update request counter right away.
        requestCounter++;
        // Listen for HTTP requests for timedtext.
        if (details && requestCounter % 2 === 1) {
            // get the video id
            const videoId = getYoutubeVideoId(details.url);

            chrome.storage.local.get(
                {
                    translate: false,
                    languageCode: '',
                    engineCode: ''
                },
                async (items) => {
                    const translate = items.translate;
                    const lang = items.languageCode;
                    const engine = items.engineCode;

                    const key = lang + '_' + videoId;
                    const existingTranslation = await chrome.storage.session.get({
                        [key]: undefined
                    },
                    (code) => {
                        return code[key];
                    });

                    // do not continue if requirements are not met or already translated.
                    if (!translate || lang === '' || engine === '' || existingTranslation !== undefined) {
                        requestCounter++;
                        return;
                    }

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
                    let translatedCaptions = await translator.translateStub(fullCaptions, lang);

                    // Revert to list structure.
                    let translatedCaptionsList = translatedCaptions.text.split('\n');

                    for (let i = 0; i < json.events.length; i++) {
                        const caption = translatedCaptionsList[i];
                        const timeStart = json.events[i].tStartMs;
                        const duration = json.events[i].dDurationMs;

                        // Append to translatedTimedText list.
                        translatedTimedText.push(
                            {
                                translatedCaption: caption,
                                timeStart: timeStart,
                                duration: duration
                            });
                    }

                    // Add translated text to cache
                    const captions = {}
                    captions[key] = translatedTimedText;
                    chrome.storage.session.set(captions);
                    console.log(translatedTimedText);
                }
            );
        }
    },
    {
        urls: ["*://*.youtube.com/api/timedtext*"],
    }
);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        const key = request.languageCode + '_' + request.videoId;
        // Check if we have the videoId's translation
        if (cache.hasOwnProperty(key) && request.time) {
            const requestMs = request.time * 1000;
            for (let i = 0; i < cache[key].length; i++) {
                const startTime = cache[key][i].timeStart;
                const endTime = cache[key][i].timeStart + cache[key][i].duration;
                if (requestMs >= startTime && requestMs < endTime) {
                    sendResponse({caption: cache[key][i].translatedCaption})
                    break;
                }
            }
        } else {
            console.log("Something went wrong!")
        }
    }
);

// Update background's local cache when chrome.storage changes. This let's onMessage listener callback function stay
// synchronous. Async functions do not get received by content.js properly.
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'session') {
        chrome.storage.session.get(function(result) {
            cache = result;
        })
    }
});

function getYoutubeVideoId(url) {
    // Create URL object
    let urlObj = new URL(url);

    // Get query parameters
    let params = new URLSearchParams(urlObj.search);

    // Get video id from parameters
    return params.get('v');
}