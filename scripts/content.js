window.onload = function () {
    window.setTimeout(function () {
        let menu = document.getElementById("center");

        let translateButton = document.createElement('button');
        translateButton.textContent = 'Translate';
        translateButton.className = 'bg-blue-500 hover:bg-blue-700 text-lg text-white font-sans font-bold py-4 px-6 rounded-full ml-3';

        menu.appendChild(translateButton);

        const captionWindowElement = document.querySelector('.ytp-caption-window-container');

        if (captionWindowElement) {
            const observer = new MutationObserver((mutationsList, observer) => {
                for (const mutation of mutationsList) {
                    const targetElement = document.querySelector('span.ytp-caption-segment');
                    if (mutation.type === 'childList' && mutation.target === targetElement) {
                        // Retrieve Text
                        // Replace Text
                        console.log("Captions Changed!");
                        break;
                    }
                }
            })
            const observerConfig = { childList: true, subtree: true };
            observer.observe(captionWindowElement, observerConfig);
        }

    }, 1000)
}