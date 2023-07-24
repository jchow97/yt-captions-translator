let settings = {
    translate: false,
    language: "",
    engine: ""
}
chrome.storage.local.set(settings);

var translateCheckbox = document.querySelector('input[type="checkbox"]');

translateCheckbox.addEventListener('change', function() {
    settings.translate = this.checked;
    chrome.storage.local.set(settings);
});

var dropdownToggles = document.querySelectorAll('.dropdown-toggle');
dropdownToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
        var dropdownContent = this.parentElement.nextElementSibling;
        dropdownContent.classList.toggle('hidden');
    });
});

// Optionally, close the dropdown menu when a menu item is clicked
var menuItems = document.querySelectorAll('[role="menuitem"]');
menuItems.forEach(function (menuItem) {
    menuItem.addEventListener('click', function () {
        event.preventDefault();  // Prevent navigation
        var dropdownContent = this.parentElement.parentElement;
        dropdownContent.classList.add('hidden');

        // Do something
        var value = this.getAttribute('data-value');
        if (this.parentElement.parentElement.id === "language-dropdown-content") {
            settings.language = value;
            chrome.storage.local.set(settings);
            console.log("You clicked language: " + value)
        } else if (this.parentElement.parentElement.id === "engine-dropdown-content") {
            settings.engine = value;
            chrome.storage.local.set(settings);
            console.log("You clicked engine: " + value)
        }

        // Update the dropdown button's text
        var dropdownLabel = this.parentElement.parentElement.previousElementSibling.querySelector('.dropdown-label');
        dropdownLabel.innerText = this.innerText;
    });
});

