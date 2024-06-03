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
    // Selecciona todos los elementos con el atributo data-include
    const elements = document.querySelectorAll('[data-include]');
    for (let el of elements) {
        const file = el.getAttribute('data-include');
        const data = await loadContent(file);
        if (data) {
            el.innerHTML = data;
            el.removeAttribute('data-include');
        }
    }
    // Verifica si hay más elementos a incluir después de la carga inicial
    const newElements = document.querySelectorAll('[data-include]');
    if (newElements.length > 0) {
        await includeHTML();  // Asegura que las inclusiones anidadas se procesen
    }
}

// Ejecuta la función includeHTML una vez que el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    includeHTML();
});
