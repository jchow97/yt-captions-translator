window.onload = function () {
    window.setTimeout(function () {
        let menu = document.getElementById("top-level-buttons-computed")
        let translateButton =
            `
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Translate
            </button>
            `
        menu.insertAdjacentHTML("beforeend", translateButton)
    }, 1000)
}