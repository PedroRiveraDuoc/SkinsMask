document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.getElementById('cartContainer');
    const cartCount = document.getElementById('cartCount');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');

    console.log("Cart container:", cartContainer);
    console.log("Cart count element:", cartCount);
    console.log("Cart subtotal element:", cartSubtotal);
    console.log("Cart total element:", cartTotal);

    if (!cartContainer || !cartCount || !cartSubtotal || !cartTotal) {
        console.error("One or more cart elements not found.");
        return;
    }

    function renderCart() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        console.log("Carrito inicial:", cartItems);

        cartContainer.innerHTML = ''; // Limpiar contenedor del carrito
        let subtotal = 0;

        cartItems.forEach(item => {
            subtotal += item.price * item.quantity;

            // Verificar la información de cada producto
            console.log("Producto en el carrito:", item);

            const productElement = document.createElement('div');
            productElement.className = 'cart-item';
            productElement.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                        <div>
                            <h5>${item.name}</h5>
                            <p>Precio: $${item.price}</p>
                            <p>Cantidad: ${item.quantity}</p>
                        </div>
                    </div>
                    <button class="btn btn-danger remove-btn" data-id="${item.id}">Eliminar</button>
                </div>
            `;
            cartContainer.appendChild(productElement);
        });

        cartCount.textContent = cartItems.length;
        cartSubtotal.textContent = `$${subtotal}`;
        cartTotal.textContent = `$${subtotal + 4990}`; // Sumando el costo de envío
    }

    function removeFromCart(productId) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const productIndex = cartItems.findIndex(item => item.id === productId);

        if (productIndex > -1) {
            if (cartItems[productIndex].quantity > 1) {
                cartItems[productIndex].quantity -= 1;
            } else {
                cartItems.splice(productIndex, 1);
            }
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log(`Producto con id ${productId} actualizado. Carrito actualizado:`, cartItems);
        renderCart(); // Volver a renderizar el carrito
    }

    cartContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-btn')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            removeFromCart(productId);
        }
    });

    renderCart(); // Renderizar el carrito al cargar la página
});
