document.addEventListener("DOMContentLoaded", function () {
    const editUserForm = document.getElementById('editUserForm');
    const editFirstName = document.getElementById('editFirstName');
    const editLastName = document.getElementById('editLastName');
    const editEmail = document.getElementById('editEmail');
    
    const userIndex = localStorage.getItem('editUserIndex');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users[userIndex];

    if (user) {
        editFirstName.value = user.firstName;
        editLastName.value = user.lastName;
        editEmail.value = user.email;
    }

    editUserForm.addEventListener('submit', function (event) {
        event.preventDefault();

        users[userIndex].firstName = editFirstName.value;
        users[userIndex].lastName = editLastName.value;
        users[userIndex].email = editEmail.value;

        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = 'admin_users.html';
    });
});
