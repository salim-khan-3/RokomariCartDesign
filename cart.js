document.addEventListener('DOMContentLoaded', function () {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log(cartItems);
    const cartWrapper = document.querySelector('.cart_wrapper');
    const subtotalSpan = document.querySelector('.span_container:nth-child(2) span');
    const totalSpan = document.querySelector('.span_container:nth-child(4) span');
    const payableTotalSpan = document.querySelector('.span_container:nth-child(5) span');

    // কার্টের আইটেম গণনা আপডেট করুন
    updateCartIconCount();

    // কার্ট খালি থাকলে দেখানোর জন্য
    if (cartItems.length === 0) {
        cartWrapper.innerHTML = '<p class="empty-cart">Your cart is empty!</p>';
        return;
    }

    // কার্টের আইটেম রেন্ডার করুন
    function renderCartItems() {
        let subtotal = 0;

        cartItems.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <div class="card_img">
                    <a href="./index.html">
                        <img src="${item.image}" alt="${item.name}">
                    </a>
                </div>
                <div class="card_content">
                    <div class="f_start">
                        <p>${item.name}</p>
                        <p>${item.author}</p>
                        <h5 class="stock">${item.stock} in stock</h5>
                        <i class="fa-solid fa-trash" data-id="${item.id}"></i>
                    </div>
                    <div class="inc_dec">                      
                        <i class="fa-solid fa-minus" data-id="${item.id}"></i>
                        <span class="item_inc_dec">${item.quantity}</span>
                        <i class="fa-solid fa-plus" data-id="${item.id}"></i>
                    </div>
                    <div class="price">
                        <h4>$${item.price}</h4>
                        <del>$${item.originalPrice}</del>
                    </div>
                </div>
            `;

            // কার্টের আইটেমের দাম গণনা করুন
            subtotal += item.price * item.quantity;

            // কার্টে যোগ করুন
            cartWrapper.appendChild(card);

            // ইভেন্ট লিস্টেনার যোগ করুন
            const minusBtn = card.querySelector('.fa-minus');
            const plusBtn = card.querySelector('.fa-plus');
            const deleteBtn = card.querySelector('.fa-trash');
            const quantitySpan = card.querySelector('.item_inc_dec');

            // মাইনাস বাটনের ইভেন্ট
            minusBtn.addEventListener('click', () => {
                let currentQty = parseInt(quantitySpan.textContent);
                if (currentQty > 1) {
                    currentQty--;
                    quantitySpan.textContent = currentQty;
                    updateCartItem(item.id, currentQty);
                } else {
                    deleteCartItem(item.id);
                }
                updateCartIconCount(); // কার্ট আইকনের গণনা আপডেট করুন
            });

            // প্লাস বাটনের ইভেন্ট
            plusBtn.addEventListener('click', () => {
                let currentQty = parseInt(quantitySpan.textContent);
                currentQty++;
                quantitySpan.textContent = currentQty;
                updateCartItem(item.id, currentQty);
                updateCartIconCount(); // কার্ট আইকনের গণনা আপডেট করুন
            });

            // ডিলিট বাটনের ইভেন্ট
            deleteBtn.addEventListener('click', () => {
                deleteCartItem(item.id);
                updateCartIconCount(); // কার্ট আইকনের গণনা আপডেট করুন
            });
        });

        // সাবটোটাল এবং টোটাল আপডেট করুন
        updateTotals(subtotal);
    }

    // কার্ট আইটেম আপডেট করুন
    function updateCartItem(productId, quantity) {
        const item = cartItems.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateTotals();
        }
    }

    // কার্ট আইটেম ডিলিট করুন
    function deleteCartItem(productId) {
        const index = cartItems.findIndex(item => item.id === productId);
        if (index !== -1) {
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            location.reload(); // পেজ রিলোড করুন
        }
    }

    // সাবটোটাল এবং টোটাল আপডেট করুন
    function updateTotals(subtotal = null) {
        if (subtotal === null) {
            subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        }
        subtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
        totalSpan.textContent = `$${subtotal.toFixed(2)}`;
        payableTotalSpan.textContent = `$${subtotal.toFixed(2)}`;
    }

    // কার্ট আইটেম রেন্ডার করুন
    renderCartItems();

    // কার্ট আইকনের গণনা আপডেট করুন
    function updateCartIconCount() {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('item').textContent = totalItems;
    }
});






