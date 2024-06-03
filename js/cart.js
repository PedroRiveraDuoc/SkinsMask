document.addEventListener('DOMContentLoaded', function() {
    // Manejar eliminación de productos del carrito
    document.querySelectorAll('.fa-trash-alt').forEach(function(trashIcon) {
        trashIcon.addEventListener('click', function() {
            const productCard = this.closest('.card');
            productCard.remove();
            updateCartSummary();
        });
    });

    // Actualizar resumen del carrito
    function updateCartSummary() {
        let subtotal = 0;
        document.querySelectorAll('.card-body').forEach(function(cardBody) {
            const price = parseFloat(cardBody.querySelector('.mb-0').textContent.replace('$', '').replace(',', ''));
            subtotal += price;
        });
        const shipping = 4990;
        const total = subtotal + shipping;
        document.querySelector('.subtotal-amount').textContent = `$${subtotal.toLocaleString()}`;
        document.querySelector('.total-amount').textContent = `$${total.toLocaleString()}`;
    }

    updateCartSummary();
});
