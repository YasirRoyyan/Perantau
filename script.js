const notification = document.getElementById('notification');
const cartCount = document.getElementById('cart-count');
const cartStatus = document.getElementById('cart-status');
const cartItemsElement = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartButton = document.getElementById('clear-cart-btn');
const openCartButton = document.getElementById('open-cart-btn');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const scrollButtons = document.querySelectorAll('[data-scroll-target]');

let cart = [];
let notificationTimer;

function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');

    clearTimeout(notificationTimer);
    notificationTimer = setTimeout(function () {
        notification.classList.remove('show');
    }, 2500);
}

function scrollToSection(selector) {
    const targetSection = document.querySelector(selector);

    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function formatRupiah(price) {
    return 'Rp ' + price.toLocaleString('id-ID');
}

function updateCart() {
    let total = 0;

    cartCount.textContent = cart.length;
    cartItemsElement.innerHTML = '';

    if (cart.length === 0) {
        cartStatus.textContent = 'Keranjang masih kosong. Klik tombol produk untuk menambahkan barang.';
    } else {
        cartStatus.textContent = 'Jumlah produk di keranjang: ' + cart.length;
    }

    cart.forEach(function (product, index) {
        const item = document.createElement('li');

        item.textContent = (index + 1) + '. ' + product.name + ' - ' + formatRupiah(product.price);
        cartItemsElement.appendChild(item);
        total += product.price;
    });

    cartTotal.textContent = formatRupiah(total);
    clearCartButton.disabled = cart.length === 0;
}

scrollButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const target = button.dataset.scrollTarget;

        scrollToSection(target);
    });
});

addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const card = button.closest('.product-card');
        const product = {
            name: card.dataset.name,
            price: Number(card.dataset.price)
        };

        cart.push(product);
        updateCart();
        showNotification(product.name + ' berhasil ditambahkan ke keranjang.');
    });
});

openCartButton.addEventListener('click', function () {
    scrollToSection('#keranjang');

    if (cart.length === 0) {
        showNotification('Keranjang masih kosong.');
    } else {
        showNotification('Keranjang berisi ' + cart.length + ' produk.');
    }
});

clearCartButton.addEventListener('click', function () {
    cart = [];
    updateCart();
    showNotification('Keranjang sudah dikosongkan.');
});

updateCart();
