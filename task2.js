document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product button');
    const cartItemsContainer = document.querySelector('.cart-items');
    const checkoutButton = document.querySelector('.checkout');
    let cart = [];

    products.forEach((button) => {
        button.addEventListener('click', () => {
            const productElement = button.parentElement;
            const productName = productElement.querySelector('h3').textContent;
            const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('$', ''));

            addToCart(productName, productPrice);
        });
    });

    function addToCart(name, price) {
        const existingProductIndex = cart.findIndex(product => product.name === name);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCartDisplay();
    }

    function removeFromCart(index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        updateCartDisplay();
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <h3>${item.name}</h3>
                <p>Quantity: ${item.quantity}</p>
                <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        updateCheckoutButton();
    }

    function updateCheckoutButton() {
        checkoutButton.style.display = cart.length === 0 ? 'none' : 'block';
    }

    // Expose removeFromCart globally
    window.removeFromCart = removeFromCart;

    updateCheckoutButton();
});
