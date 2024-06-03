document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll('.comprar-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();

            const productId = parseInt(this.getAttribute('data-id'));
            const productName = this.getAttribute('data-name');
            const productPrice = parseInt(this.getAttribute('data-price'));
            const productImage = this.getAttribute('data-image');

            const cartItem = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };

            addToCart(cartItem);
        });
    });

    function addToCart(cartItem) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Verificar si el producto ya está en el carrito
        const existingItem = cartItems.find(item => item.id === cartItem.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push(cartItem);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log("Producto agregado al carrito:", cartItem);
    }
});
