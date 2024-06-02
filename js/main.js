document.addEventListener("DOMContentLoaded", function() {
    console.log("Document ready!");

    function isEmpty(value) {
        return value.trim() === "";
    }

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

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

    function showError(element, message) {
        const errorElement = document.createElement("div");
        errorElement.className = "error-message";
        errorElement.style.color = "red";
        errorElement.innerText = message;
        element.parentNode.appendChild(errorElement);
    }

    function clearErrors(form) {
        const errorMessages = form.querySelectorAll(".error-message");
        errorMessages.forEach(message => message.remove());
    }

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
                window.location.href = "../user_view/login.html";  // Redirección a la página de inicio de sesión
            }
        });
    }

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
                    window.location.href = "../index.html";  // Redirección a index.html
                } else {
                    showError(loginForm.querySelector("#loginPassword"), "Correo electrónico o contraseña incorrectos.");
                    event.preventDefault();
                }
            }
        });
    }
});
