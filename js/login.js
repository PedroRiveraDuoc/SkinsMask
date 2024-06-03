document.addEventListener("DOMContentLoaded", function() {
    console.log("Login script loaded!");

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            console.log("Formulario enviado!");

            const loginEmail = loginForm.querySelector("#loginEmail").value;
            const loginPassword = loginForm.querySelector("#loginPassword").value;

            console.log("Email:", loginEmail);
            console.log("Password:", loginPassword);

            let hasError = false;

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

            if (!hasError) {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const user = users.find(user => user.email === loginEmail && user.password === loginPassword);

                if (user) {
                    alert('Inicio de sesión exitoso');
                    console.log("Redireccionando al index...");
                    window.location.href = "../index.html";  // Redirección a la página de inicio (index.html) en el directorio principal
                } else {
                    showError(loginForm.querySelector("#loginPassword"), "Correo electrónico o contraseña incorrectos.");
                    console.log("errorrr!");
                }
            }
        });
    }
});
