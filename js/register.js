document.addEventListener("DOMContentLoaded", function() {
    console.log("Register script loaded!");

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            event.preventDefault();  // Evita el envío del formulario por defecto

            clearErrors(registerForm);
            const firstName = registerForm.querySelector("#firstName").value;
            const lastName = registerForm.querySelector("#lastName").value;
            const email = registerForm.querySelector("#email").value;
            const password = registerForm.querySelector("#password").value;
            const confirmPassword = registerForm.querySelector("#confirmPassword").value;

            let hasError = false;

            if (isEmpty(firstName)) {
                showError(registerForm.querySelector("#firstName"), "El nombre no puede estar vacío.");
                hasError = true;
            }

            if (isEmpty(lastName)) {
                showError(registerForm.querySelector("#lastName"), "El apellido no puede estar vacío.");
                hasError = true;
            }

            if (isEmpty(email)) {
                showError(registerForm.querySelector("#email"), "El correo electrónico no puede estar vacío.");
                hasError = true;
            } else if (!isValidEmail(email)) {
                showError(registerForm.querySelector("#email"), "El formato del correo electrónico no es válido.");
                hasError = true;
            }

            const passwordError = getPasswordError(password);
            if (passwordError) {
                showError(registerForm.querySelector("#password"), passwordError);
                hasError = true;
            }

            if (isEmpty(confirmPassword)) {
                showError(registerForm.querySelector("#confirmPassword"), "La confirmación de la contraseña no puede estar vacía.");
                hasError = true;
            } else if (password !== confirmPassword) {
                showError(registerForm.querySelector("#confirmPassword"), "Las contraseñas no coinciden.");
                hasError = true;
            }

            if (!hasError) {
                const user = {
                    firstName,
                    lastName,
                    email,
                    password
                };

                const users = JSON.parse(localStorage.getItem('users')) || [];
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));
                alert('Usuario registrado con éxito');
                registerForm.reset();
                console.log("Redireccionando al login...");
                window.location.href = "../user_view/login.html";  // Redirección a la página de inicio de sesión
            }
        });
    }
});
