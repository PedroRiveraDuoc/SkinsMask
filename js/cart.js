document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.getElementById('cartContainer');
    const cartCount = document.getElementById('cartCount');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');

    // Recuperar el usuario logueado
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    function renderCart() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = users.find(user => user.email === loggedInUser.email);
        if (!currentUser || !currentUser.cart) return;

        const cartItems = currentUser.cart;
        cartContainer.innerHTML = ''; // Limpiar contenedor del carrito
        let subtotal = 0;

        cartItems.forEach(item => {
            subtotal += item.price * item.quantity;

            const productElement = document.createElement('div');
            productElement.className = 'cart-item';
            productElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h5>${item.name}</h5>
                    <p>Precio: $${item.price}</p>
                    <p>Cantidad: ${item.quantity}</p>
                    <button class="btn btn-danger btn-sm remove-btn" data-id="${item.id}">Eliminar</button>
                </div>
            `;
            cartContainer.appendChild(productElement);
        });

        cartCount.textContent = cartItems.length;
        cartSubtotal.textContent = `$${subtotal}`;
        cartTotal.textContent = `$${subtotal + 4990}`; // Asumiendo un costo fijo de envío de $4990

        // Agregar funcionalidad para eliminar productos
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function () {
                const productId = this.getAttribute('data-id');
                removeItemFromCart(productId);
            });
        });
    }

    function removeItemFromCart(productId) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = users.find(user => user.email === loggedInUser.email);
        if (!currentUser || !currentUser.cart) return;

        const productIndex = currentUser.cart.findIndex(item => item.id === productId);
        if (productIndex !== -1) {
            if (currentUser.cart[productIndex].quantity > 1) {
                currentUser.cart[productIndex].quantity -= 1;
            } else {
                currentUser.cart.splice(productIndex, 1);
            }
            localStorage.setItem('users', JSON.stringify(users));
            renderCart();
        }
    }

    renderCart();
});
