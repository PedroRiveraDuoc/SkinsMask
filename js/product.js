document.addEventListener("DOMContentLoaded", function () {
    const buyButtons = document.querySelectorAll('.comprar-btn');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            const productImage = this.getAttribute('data-image');
            
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existingProductIndex = cartItems.findIndex(item => item.id === productId);
            
            if (existingProductIndex > -1) {
                cartItems[existingProductIndex].quantity += 1;
            } else {
                cartItems.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }
            
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            console.log("Producto añadido al carrito:", {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
            
            console.log("Estado actual del carrito:", JSON.parse(localStorage.getItem('cartItems')));
        });
    });
});
