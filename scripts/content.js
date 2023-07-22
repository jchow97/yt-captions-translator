const captionWindowElement = document.querySelector('.ytp-caption-window-container');
if (captionWindowElement) {
    const observer = new MutationObserver(async (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            const targetElement = document.querySelector('span.ytp-caption-segment');
            if (mutation.type === 'childList' && mutation.target === targetElement) {
                observer.disconnect();
                // Retrieve Text
                const currentTime = document.querySelector("video").currentTime;
                const videoId = document.querySelector("video").id;
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
