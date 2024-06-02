
document.addEventListener("DOMContentLoaded", function() {
    console.log("Document ready!");
});

// Initialization for ES Users
import { Collapse, Ripple, initMDB } from "mdb-ui-kit";

initMDB({ Collapse, Ripple });


// Path: js/main.js
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector('form[action="/login"]');
    const registerForm = document.querySelector('form[action="/register"]');

    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            const username = loginForm.querySelector("#username").value;
            const password = loginForm.querySelector("#password").value;
            if (username === "" || password === "") {
                event.preventDefault();
                alert("Please fill in all fields.");
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            const name = registerForm.querySelector("#name").value;
            const email = registerForm.querySelector("#email").value;
            const password = registerForm.querySelector("#password").value;
            const confirmPassword = registerForm.querySelector("#confirmPassword").value;
            if (name === "" || email === "" || password === "" || confirmPassword === "") {
                event.preventDefault();
                alert("Please fill in all fields.");
            } else if (password !== confirmPassword) {
                event.preventDefault();
                alert("Passwords do not match.");
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    $('[data-include]').each(function () {
        var file = $(this).data('include');
        $(this).load(file);
    });
});
