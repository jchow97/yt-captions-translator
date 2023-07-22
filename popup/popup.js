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

        // Do something with language code
        var value = this.getAttribute('data-value');
        console.log('You clicked: ' + value);

        // Update the dropdown button's text
        var dropdownLabel = this.parentElement.parentElement.previousElementSibling.querySelector('.dropdown-label');
        dropdownLabel.innerText = this.innerText;
    });
});

