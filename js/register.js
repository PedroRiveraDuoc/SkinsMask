document.addEventListener("DOMContentLoaded", function() {
    // Mensaje en la consola para indicar que el script de registro se ha cargado
    console.log("Register script loaded!");

    // Obtiene el formulario de registro por su ID
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        // Agrega un evento de submit al formulario de registro
        registerForm.addEventListener("submit", function(event) {
            // Limpia cualquier mensaje de error previo
            clearErrors(registerForm);

            // Obtiene los valores de los campos del formulario
            const firstName = registerForm.querySelector("#firstName").value;
            const lastName = registerForm.querySelector("#lastName").value;
            const email = registerForm.querySelector("#email").value;
            const password = registerForm.querySelector("#password").value;
            const confirmPassword = registerForm.querySelector("#confirmPassword").value;

            let hasError = false; // Variable para rastrear si hay errores

            // Validaciones de los campos del formulario
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

            // Si hay algún error, previene el envío del formulario
            if (hasError) {
                event.preventDefault();
            } else {
                // Crea un objeto usuario con los valores del formulario
                const user = {
                    firstName,
                    lastName,
                    email,
                    password
                };

                // Obtiene la lista de usuarios del almacenamiento local, o crea una lista vacía si no existe
                const users = JSON.parse(localStorage.getItem('users')) || [];
                // Añade el nuevo usuario a la lista
                users.push(user);
                // Guarda la lista de usuarios actualizada en el almacenamiento local
                localStorage.setItem('users', JSON.stringify(users));
                // Muestra una alerta de éxito
                alert('Usuario registrado con éxito');
                // Resetea el formulario
                registerForm.reset();
                // Redirige a la página de inicio de sesión
                window.location.href = "../user_view/login.html";
            }
        });
    }
});
