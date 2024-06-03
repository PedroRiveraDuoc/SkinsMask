// Función para cargar el contenido del archivo especificado
async function loadContent(file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Error loading file: ${file}`);
        return await response.text();
    } catch (error) {
        console.error('Error loading include file:', error);
    }
}

// Función para incluir el contenido HTML
async function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    for (let el of elements) {
        const file = el.getAttribute('data-include');
        const data = await loadContent(file);
        if (data) {
            el.innerHTML = data;
            el.removeAttribute('data-include');
            const scripts = el.querySelectorAll('script');
            scripts.forEach((script) => {
                const newScript = document.createElement('script');
                newScript.textContent = script.textContent;
                document.body.appendChild(newScript).parentNode.removeChild(newScript);
            });
        }
    }
    const newElements = document.querySelectorAll('[data-include]');
    if (newElements.length > 0) {
        await includeHTML();
    }
    checkLoggedInUser();
}

// Ejecuta la función includeHTML una vez que el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    includeHTML();
});

// Nueva función para verificar el usuario logeado
function checkLoggedInUser() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        const navLogin = document.getElementById('navLogin');
        const navRegister = document.getElementById('navRegister');
        const navUser = document.getElementById('navUser');
        const navUsername = document.getElementById('navUsername');

        if (navLogin && navRegister && navUser && navUsername) {
            navLogin.classList.add('d-none');
            navRegister.classList.add('d-none');
            navUser.classList.remove('d-none');
            navUsername.textContent = loggedInUser.firstName;
        } else {
            console.error('Nav elements not found');
        }
    }
}
