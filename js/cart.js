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
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h5>${item.name}</h5>
                    <p>Precio: $${item.price}</p>
                    <p>Cantidad: ${item.quantity}</p>
                </div>
            `;
            cartContainer.appendChild(productElement);
        });

        cartCount.textContent = cartItems.length;
        cartSubtotal.textContent = `$${subtotal}`;
        cartTotal.textContent = `$${subtotal + 4990}`; // Incluye el envío
    }

    renderCart();
});
