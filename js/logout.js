document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            console.log("Logging out...");
            localStorage.removeItem('loggedInUser');
            updateNavForLoggedOutUser();
            window.location.href = '../index.html';  // Redirigir a la página de inicio después de cerrar sesión
        });
    }

    function updateNavForLoggedOutUser() {
        console.log("Updating nav for logged out user...");
        const navLogin = document.getElementById('navLogin');
        const navRegister = document.getElementById('navRegister');
        const navUser = document.getElementById('navUser');

        if (navLogin && navRegister && navUser) {
            navLogin.classList.remove('d-none');
            navRegister.classList.remove('d-none');
            navUser.classList.add('d-none');
            console.log("Nav updated to logged out state.");
        } else {
            console.error('Nav elements not found for updating.');
        }
    }
});
