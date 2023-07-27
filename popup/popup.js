// Get page elements
const translateCheckbox = document.querySelector('input[type="checkbox"]');
const languageDropdown = document.getElementById('language-label');
const engineDropdown = document.getElementById('engine-label');

// Saves options to chrome.storage
const saveOptions = () => {
    chrome.storage.local.set(
        {
            translate: translateCheckbox.checked,
            languageName: languageDropdown.innerText,
            languageCode: languageDropdown.getAttribute('data-value'),
            engineName: engineDropdown.innerText,
            engineCode: engineDropdown.getAttribute('data-value')
        }
    );
}

// Restores toggle and dropdown state using the settings stored in chrome.storage.
const restoreOptions = () => {
    debugger;
    chrome.storage.local.get(
        {
            translate: 'false',
            languageName: 'Select a Language',
            languageCode: '',
            engineName: 'Select an Engine',
            engineCode: ''
        },
        (items) => {
            translateCheckbox.checked = items.translate;
            languageDropdown.innerText = items.languageName;
            languageDropdown.setAttribute('data-value', items.languageCode);
            engineDropdown.innerText = items.engineName;
            engineDropdown.setAttribute('data-value', items.engineCode);
        }
    );
}

document.addEventListener('DOMContentLoaded', restoreOptions);

translateCheckbox.addEventListener('change', saveOptions);

// On click, display or hide the dropdown.
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
        // Hide dropdown on menu item click.
        event.preventDefault();  // Prevent navigation
        var dropdownContent = this.parentElement.parentElement;
        dropdownContent.classList.add('hidden');

        // Update the dropdown button's text and data value.
        var dropdownLabel = this.parentElement.parentElement.previousElementSibling.querySelector('.dropdown-label');
        dropdownLabel.innerText = this.innerText;
        dropdownLabel.setAttribute('data-value', this.getAttribute('data-value'));

        // Save new settings.
        saveOptions();
    });
});

