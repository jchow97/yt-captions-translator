// window.onload = function () {
//     window.setTimeout(function () {
        // let menu = document.getElementById("center");
        //
        // let translateButton = document.createElement('button');
        // translateButton.textContent = 'Translate';
        // translateButton.className = 'bg-blue-500 hover:bg-blue-700 text-lg text-white font-sans font-bold py-4 px-6 rounded-full ml-3';
        //
        // menu.appendChild(translateButton);
        const captionWindowElement = document.querySelector('.ytp-caption-window-container');

        if (captionWindowElement) {
            const observer = new MutationObserver(async (mutationsList, observer) => {
                for (const mutation of mutationsList) {
                    const targetElement = document.querySelector('span.ytp-caption-segment');
                    if (mutation.type === 'childList' && mutation.target === targetElement) {
                        observer.disconnect();
                        // Retrieve Text
                        const currentTime = document.querySelector("video").currentTime;
                        const response = await chrome.runtime.sendMessage({time: currentTime});
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
        } else {
            captionChangeCounter++;
        }
//     }, 1000)
// }