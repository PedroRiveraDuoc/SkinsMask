document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll('.comprar-btn');

    // Recuperar el usuario logueado
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseInt(this.getAttribute('data-price'));
            const productImage = this.closest('.card').querySelector('img').src;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const currentUser = users.find(user => user.email === loggedInUser.email);
            if (!currentUser) return;

            // Agregar producto al carrito del usuario
            if (!currentUser.cart) {
                currentUser.cart = [];
            }

            const productIndex = currentUser.cart.findIndex(item => item.id === productId);
            if (productIndex !== -1) {
                currentUser.cart[productIndex].quantity += 1;
            } else {
                currentUser.cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }

            localStorage.setItem('users', JSON.stringify(users));
            alert('Producto agregado al carrito');
        });
    });
});
