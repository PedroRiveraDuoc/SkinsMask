document.addEventListener("DOMContentLoaded", function() {
    // Mensaje en la consola para indicar que el script de inicio de sesión se ha cargado
    console.log("Login script loaded!");

    // Obtiene el formulario de inicio de sesión por su ID
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        // Agrega un evento de submit al formulario de inicio de sesión
        loginForm.addEventListener("submit", function(event) {
            // Limpia cualquier mensaje de error previo
            clearErrors(loginForm);

            // Obtiene los valores de los campos del formulario
            const loginEmail = loginForm.querySelector("#loginEmail").value;
            const loginPassword = loginForm.querySelector("#loginPassword").value;

            let hasError = false; // Variable para rastrear si hay errores

            // Validaciones de los campos del formulario
            if (isEmpty(loginEmail)) {
                showError(loginForm.querySelector("#loginEmail"), "El correo electrónico no puede estar vacío.");
                hasError = true;
            } else if (!isValidEmail(loginEmail)) {
                showError(loginForm.querySelector("#loginEmail"), "El formato del correo electrónico no es válido.");
                hasError = true;
            }

            if (isEmpty(loginPassword)) {
                showError(loginForm.querySelector("#loginPassword"), "La contraseña no puede estar vacía.");
                hasError = true;
            }

            // Si hay algún error, previene el envío del formulario
            if (hasError) {
                event.preventDefault();
            } else {
                // Obtiene la lista de usuarios del almacenamiento local, o crea una lista vacía si no existe
                const users = JSON.parse(localStorage.getItem('users')) || [];
                // Busca un usuario que coincida con el correo electrónico y la contraseña proporcionados
                const user = users.find(user => user.email === loginEmail && user.password === loginPassword);

                if (user) {
                    // Si se encuentra el usuario, muestra una alerta de éxito y redirige a la página principal
                    alert('Inicio de sesión exitoso');
                    window.location.href = "../index.html";  // Redirección a index.html
                } else {
                    // Si no se encuentra el usuario, muestra un mensaje de error y previene el envío del formulario
                    showError(loginForm.querySelector("#loginPassword"), "Correo electrónico o contraseña incorrectos.");
                    event.preventDefault();
                }
            }
        });
    }
});
