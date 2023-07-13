window.onload = function () {
    window.setTimeout(function () {
        let menu = document.getElementById("center");

        let translateButton = document.createElement('button');
        translateButton.textContent = 'Translate';
        translateButton.className = 'bg-blue-500 hover:bg-blue-700 text-lg text-white font-sans font-bold py-4 px-6 rounded-full ml-3';

        menu.appendChild(translateButton);
    }, 1000)
}