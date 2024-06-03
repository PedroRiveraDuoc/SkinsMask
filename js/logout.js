document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            // Eliminar todos los datos del almacenamiento local
            localStorage.clear();
            // Redirigir a la página de inicio de sesión
            window.location.href = "user_view/login.html";
        });
    }
});
