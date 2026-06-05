const cartTrigger = document.getElementById('cart-trigger');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCounter = document.getElementById('cart-counter');
const cartTotalAmount = document.getElementById('cart-total-amount');
const emptyCartMessage = document.getElementById('empty-cart-message');

let cart = [];

cartTrigger.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
});

const hideCart = () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
};

closeCartBtn.addEventListener('click', hideCart);
cartOverlay.addEventListener('click', hideCart);

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    updateCartUI();
    
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
}

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.appendChild(emptyCartMessage);
        cartCounter.innerText = '0';
        cartTotalAmount.innerText = 'BDT 0';
        return;
    }

    let totalItemsCount = 0;
    let totalPriceSum = 0;

    cart.forEach(item => {
        totalItemsCount += item.quantity;
        totalPriceSum += (item.price * item.quantity);

        const itemRow = document.createElement('div');
        itemRow.classList.add('cart-item');
        itemRow.innerHTML = `
            <div class="cart-item-details">
                <h4>${item.name} (x${item.quantity})</h4>
                <p>BDT ${item.price * item.quantity}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartItemsContainer.appendChild(itemRow);
    });

    cartCounter.innerText = totalItemsCount;
    cartTotalAmount.innerText = 'BDT ' + totalPriceSum;
}

function checkoutAlert() {
    if(cart.length === 0) {
        alert('Your shopping bag is empty!');
    } else {
        alert('Thank you for ordering with La Magnolia!');
        cart = [];
        updateCartUI();
        hideCart();
    }
}