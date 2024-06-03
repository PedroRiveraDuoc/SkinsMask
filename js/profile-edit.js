document.addEventListener("DOMContentLoaded", function() {
    // Mensaje en la consola para indicar que el script de edición de perfil se ha cargado
    console.log("Profile edit script loaded!");

    // Obtiene el formulario de edición de perfil por su ID
    const profileEditForm = document.getElementById('profileEditForm');
    if (profileEditForm) {
        // Agrega un evento de submit al formulario de edición de perfil
        profileEditForm.addEventListener("submit", function(event) {
            // Limpia cualquier mensaje de error previo
            clearErrors(profileEditForm);

            // Obtiene los valores de los campos del formulario
            const firstName = profileEditForm.querySelector("#firstName").value;
            const lastName = profileEditForm.querySelector("#lastName").value;
            const email = profileEditForm.querySelector("#email").value;
            const password = profileEditForm.querySelector("#password").value;
            const address = profileEditForm.querySelector("#address").value;

            let hasError = false; // Variable para rastrear si hay errores

            // Validaciones de los campos del formulario
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

            // Verifica si el usuario existe en la lista de usuarios
            if (currentUserIndex === -1) {
                showError(profileEditForm.querySelector("#email"), "Usuario no encontrado.");
                hasError = true;
            } else {
                // Verifica si el correo electrónico ya está en uso por otro usuario
                const otherUserIndex = users.findIndex((user, index) => user.email === email && index !== currentUserIndex);
                if (otherUserIndex !== -1) {
                    showError(profileEditForm.querySelector("#email"), "El correo electrónico ya está en uso.");
                    hasError = true;
                }
            }

            // Verifica la validez de la contraseña si se ha proporcionado una nueva
            if (password !== "" && getPasswordError(password)) {
                showError(profileEditForm.querySelector("#password"), getPasswordError(password));
                hasError = true;
            }

            if (isEmpty(address)) {
                showError(profileEditForm.querySelector("#address"), "La dirección no puede estar vacía.");
                hasError = true;
            }

            // Si hay algún error, previene el envío del formulario
            if (hasError) {
                event.preventDefault();
            } else {
                // Actualiza la información del usuario actual con los nuevos valores
                const currentUser = users[currentUserIndex];
                currentUser.firstName = firstName;
                currentUser.lastName = lastName;
                currentUser.email = email;
                if (password !== "") {
                    currentUser.password = password;
                }
                currentUser.address = address;

                // Guarda la lista de usuarios actualizada en el almacenamiento local
                localStorage.setItem('users', JSON.stringify(users));
                // Muestra una alerta de éxito
                alert('Perfil actualizado con éxito');
                // Resetea el formulario
                profileEditForm.reset();
            }
        });
    }
});
