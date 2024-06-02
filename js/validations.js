document.addEventListener("DOMContentLoaded", function() {
    console.log("Validation script loaded!");

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

    // Validación y procesamiento del formulario de edición de perfil
    const profileEditForm = document.getElementById('profileEditForm');
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

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const currentUserIndex = users.findIndex(user => user.email === email);

            if (currentUserIndex === -1) {
                showError(profileEditForm.querySelector("#email"), "Usuario no encontrado.");
                hasError = true;
            } else {
                const otherUserIndex = users.findIndex((user, index) => user.email === email && index !== currentUserIndex);
                if (otherUserIndex !== -1) {
                    showError(profileEditForm.querySelector("#email"), "El correo electrónico ya está en uso.");
                    hasError = true;
                }
            }

            if (password !== "" && getPasswordError(password)) {
                showError(profileEditForm.querySelector("#password"), getPasswordError(password));
                hasError = true;
            }

            if (isEmpty(address)) {
                showError(profileEditForm.querySelector("#address"), "La dirección no puede estar vacía.");
                hasError = true;
            }

            if (hasError) {
                event.preventDefault();
            } else {
                const currentUser = users[currentUserIndex];
                currentUser.firstName = firstName;
                currentUser.lastName = lastName;
                currentUser.email = email;
                if (password !== "") {
                    currentUser.password = password;
                }
                currentUser.address = address;

                localStorage.setItem('users', JSON.stringify(users));
                alert('Perfil actualizado con éxito');
                profileEditForm.reset();
            }
        });
    }
});
