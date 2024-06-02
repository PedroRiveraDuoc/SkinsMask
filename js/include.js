function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    elements.forEach(el => {
        const file = el.getAttribute('data-include');
        fetch(file)
            .then(response => response.text())
            .then(data => {
                el.innerHTML = data;
                el.removeAttribute('data-include');
                includeHTML();  // Ensure nested includes are processed
            })
            .catch(error => console.error('Error loading include file:', error));
    });
}

document.addEventListener('DOMContentLoaded', includeHTML);
