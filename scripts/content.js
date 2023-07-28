const captionWindowElement = document.querySelector('.ytp-caption-window-container');

if (captionWindowElement) {
    const observer = new MutationObserver(async (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            const targetElement = document.querySelector('span.ytp-caption-segment');
            // Check that it is the correct element.
            if (mutation.type === 'childList' && mutation.target === targetElement) {
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

                        // do not continue if requirements are not met.
                        if (translate === false || lang === '' || engine === '') {
                            return;
                        }
                        observer.disconnect();
                        // Retrieve Text
                        const currentTime = document.querySelector("video").currentTime;
                        const videoId = getYoutubeVideoId(window.location.href);
                        const response = await chrome.runtime.sendMessage(
                            {
                                videoId: videoId,
                                languageCode: lang,
                                time: currentTime
                            });
                        // Replace Text
                        if (response) {
                            targetElement.textContent = response.caption;
                        }
                        console.log("Captions Changed! ", currentTime);
                        observer.observe(captionWindowElement, observerConfig);
                    }
                );
                break;
            }
        }
    })
    const observerConfig = { childList: true, subtree: true };
    observer.observe(captionWindowElement, observerConfig);
}

function getYoutubeVideoId(url) {
    // Create URL object
    let urlObj = new URL(url);

    // Get query parameters
    let params = new URLSearchParams(urlObj.search);

    // Get video id from parameters
    return params.get('v');
}
