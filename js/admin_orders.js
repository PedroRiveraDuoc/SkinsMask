document.addEventListener("DOMContentLoaded", function () {
    const ordersTableBody = document.getElementById('ordersTableBody');

    function renderOrders() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        console.log('Órdenes recuperadas:', orders); // Log para verificar las órdenes recuperadas

        ordersTableBody.innerHTML = ''; // Limpiar la tabla

        orders.forEach(order => {
            console.log('Procesando orden:', order); // Log para verificar cada orden
            const row = document.createElement('tr');

            const userIdCell = document.createElement('td');
            userIdCell.textContent = order.userId;
            row.appendChild(userIdCell);

            const userNameCell = document.createElement('td');
            userNameCell.textContent = order.userName;
            row.appendChild(userNameCell);

            const userEmailCell = document.createElement('td');
            userEmailCell.textContent = order.userEmail;
            row.appendChild(userEmailCell);

            const productsCell = document.createElement('td');
            productsCell.innerHTML = order.products.map(product => 
                `<p>${product.name} (Cantidad: ${product.quantity})</p>`).join('');
            row.appendChild(productsCell);

            const totalCell = document.createElement('td');
            totalCell.textContent = `$${order.total}`;
            row.appendChild(totalCell);

            ordersTableBody.appendChild(row);
        });
    }

    renderOrders();
});
