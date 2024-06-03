// Funciones comunes de validación

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
