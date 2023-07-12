window.onload = function() {
    var menu = document.querySelector('#top-level-buttons-computed')
    if (menu) {
        var btn = document.createElement('button');
        btn.innerText = 'Translate';
        btn.innerText = 'My Button';
        btn.style.marginLeft = '20px'; // Add some space between the search bar and the button
        btn.onclick = function() {
            alert('Button clicked!');
        };
        menu.appendChild(btn);
    }
}