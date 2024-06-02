document.addEventListener("DOMContentLoaded", function() {
    console.log("Document ready!");

    // Función para validar campos vacíos
    function isEmpty(value) {
        return value.trim() === "";
    }

    // Función para validar formato de correo electrónico
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Función para validar contraseñas
    function getPasswordError(password) {
        const minLength = 8;
        const maxLength = 20;
        const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
        const numberPattern = /[0-9]/;
        const letterPattern = /[A-Za-z]/;

        if (password.length < minLength) {
            return "La contraseña debe tener al menos 8 caracteres.";
        }
        if (password.length > maxLength) {
            return "La contraseña no debe exceder los 20 caracteres.";
        }
        if (!specialCharPattern.test(password)) {
            return "La contraseña debe contener al menos un carácter especial.";
        }
        if (!numberPattern.test(password)) {
            return "La contraseña debe contener al menos un número.";
        }
        if (!letterPattern.test(password)) {
            return "La contraseña debe contener al menos una letra.";
        }
        return "";
    }

    // Función para mostrar mensajes de error
    function showError(element, message) {
        const errorElement = document.createElement("div");
        errorElement.className = "error-message";
        errorElement.style.color = "red";
        errorElement.innerText = message;
        element.parentNode.appendChild(errorElement);
    }

    // Función para limpiar mensajes de error
    function clearErrors(form) {
        const errorMessages = form.querySelectorAll(".error-message");
        errorMessages.forEach(message => message.remove());
    }

    // Validación del formulario de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
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

            if (hasError) {
                event.preventDefault();
            } else {
                // Aquí puedes procesar el formulario, como guardar en localStorage
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
            }
        });
    }

    // Validación del formulario de recuperación de contraseña
    const forgotPasswordForm = document.querySelector("#forgotPasswordForm");
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener("submit", function(event) {
            clearErrors(forgotPasswordForm);
            const email = forgotPasswordForm.querySelector("#forgotPasswordEmail").value;

            if (isEmpty(email)) {
                event.preventDefault();
                showError(forgotPasswordForm.querySelector("#forgotPasswordEmail"), "El correo electrónico no puede estar vacío.");
            } else if (!isValidEmail(email)) {
                event.preventDefault();
                showError(forgotPasswordForm.querySelector("#forgotPasswordEmail"), "El formato del correo electrónico no es válido.");
            }
        });
    }

    // Validación del formulario de edición de perfil
    const profileEditForm = document.querySelector("#profileEditForm");
    if (profileEditForm) {
        profileEditForm.addEventListener("submit", function(event) {
            clearErrors(profileEditForm);
            const firstName = profileEditForm.querySelector("#firstName").value;
            const lastName = profileEditForm.querySelector("#lastName").value;
            const email = profileEditForm.querySelector("#email").value;
            const password = profileEditForm.querySelector("#password").value;
            const address = profileEditForm.querySelector("#address").value;

            let hasError = false;

            if (isEmpty(firstName)) {
                showError(profileEditForm.querySelector("#firstName"), "El nombre no puede estar vacío.");
                hasError = true;
            }

            if (isEmpty(lastName)) {
                showError(profileEditForm.querySelector("#lastName"), "El apellido no puede estar vacío.");
                hasError = true;
            }

            if (isEmpty(email)) {
                showError(profileEditForm.querySelector("#email"), "El correo electrónico no puede estar vacío.");
                hasError = true;
            } else if (!isValidEmail(email)) {
                showError(profileEditForm.querySelector("#email"), "El formato del correo electrónico no es válido.");
                hasError = true;
            }

            const passwordError = getPasswordError(password);
            if (passwordError) {
                showError(profileEditForm.querySelector("#password"), passwordError);
                hasError = true;
            }

            if (isEmpty(address)) {
                showError(profileEditForm.querySelector("#address"), "La dirección no puede estar vacía.");
                hasError = true;
            }

            if (hasError) {
                event.preventDefault();
            } else {
                // Aquí puedes procesar el formulario, como guardar en localStorage
                const user = {
                    firstName,
                    lastName,
                    email,
                    password,
                    address
                };

                const users = JSON.parse(localStorage.getItem('users')) || [];
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));
                alert('Perfil actualizado con éxito');
                profileEditForm.reset();
            }
        });
    }

    // Validación del formulario de inicio de sesión
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            clearErrors(loginForm);
            const loginEmail = loginForm.querySelector("#loginEmail").value;
            const loginPassword = loginForm.querySelector("#loginPassword").value;

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

            if (hasError) {
                event.preventDefault();
            } else {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const user = users.find(user => user.email === loginEmail && user.password === loginPassword);

                if (user) {
                    alert('Inicio de sesión exitoso');
                    // Redirigir a la página principal u otra página si es necesario
                    // window.location.href = "index.html";
                } else {
                    showError(loginForm.querySelector("#loginPassword"), "Correo electrónico o contraseña incorrectos.");
                    event.preventDefault();
                }
            }
        });
    }
});
