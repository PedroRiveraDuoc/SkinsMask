document.addEventListener("DOMContentLoaded", function () {
    const userTableBody = document.getElementById('userTableBody');

    function renderUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        userTableBody.innerHTML = ''; // Limpiar contenido de la tabla

        users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.firstName} ${user.lastName}</td>
                <td>${user.email}</td>
                <td>
                    <button class="btn btn-primary btn-sm edit-btn" data-index="${index}">Editar</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Eliminar</button>
                </td>
            `;
            userTableBody.appendChild(row);
        });
    }

    function deleteUser(index) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.splice(index, 1); // Eliminar el usuario del array
        localStorage.setItem('users', JSON.stringify(users));
        renderUsers(); // Volver a renderizar la tabla de usuarios
    }

    userTableBody.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            const userIndex = parseInt(event.target.getAttribute('data-index'));
            deleteUser(userIndex);
        } else if (event.target.classList.contains('edit-btn')) {
            const userIndex = parseInt(event.target.getAttribute('data-index'));
            localStorage.setItem('editUserIndex', userIndex);
            window.location.href = 'admin_user_edit.html';
        }
    });

    renderUsers(); // Renderizar los usuarios al cargar la página
});
