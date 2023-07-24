const captionWindowElement = document.querySelector('.ytp-caption-window-container');
let settings = {
    translate: false,
    language: '',
    engine: ''
}

if (captionWindowElement) {
    const observer = new MutationObserver(async (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            const targetElement = document.querySelector('span.ytp-caption-segment');
            if (mutation.type === 'childList' && mutation.target === targetElement && settings.translate) {
                observer.disconnect();
                // Retrieve Text
                const currentTime = document.querySelector("video").currentTime;
                const videoId = getYoutubeVideoId(window.location.href);
                const response = await chrome.runtime.sendMessage(
                    {
                        videoId: videoId,
                        time: currentTime
                    });
                // Replace Text
                if (response) {
                    targetElement.textContent = response.caption;
                }
                console.log("Captions Changed! ", currentTime);
                observer.observe(captionWindowElement, observerConfig);
                break;
            }
        }
    })
    const observerConfig = { childList: true, subtree: true };
    observer.observe(captionWindowElement, observerConfig);
}

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (settings[key] !== undefined) {
            settings[key] = newValue;
            console.log(
                `Storage key "${key}" in namespace "${namespace}" changed.`,
                `Old value was "${oldValue}", new value is "${newValue}".`
            );
        }
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
