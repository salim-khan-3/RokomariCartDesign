document.addEventListener('DOMContentLoaded', async function() {
    try {
        // ১. data.json থেকে ডাটা লোড
        const response = await fetch('./data.json');
        console.log(response);
        if (!response.ok) throw new Error('Failed to load data');
        
        const data = await response.json();
        const products = data.products;
        const sectionContainer = document.querySelector('.section_container');
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        console.log(cartItems);
        // ২. ইমেজ পাথ ঠিক করার ফাংশন
        function getImagePath(imgName) {
            // যদি already full path থাকে
            if(imgName.includes('/')) return imgName;
            // অন্যথা Assets ফোল্ডার থেকে নেবে
            return `./Assets/${imgName}`;
        }




        // ৩. কার্ড তৈরি ফাংশন
        function createProductCard(product) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.id = product.id;
            
            // ইমেজ পাথ ঠিক করুন
            const imagePath = getImagePath(product.image);
            
            card.innerHTML = `
                <div class="card_img">
                    <img src="${imagePath}" alt="${product.name}" 
                         onerror="this.src='./Assets/default-product.jpg'">
                </div>
                <div class="card_content">
                    <p>${product.name}</p>
                    <p>${product.author}</p>
                    <h5 class="stock">${product.stock} in stock</h5>
                    <div class="price_container">
                        <div class="price">
                            <h4>$${product.price}</h4>
                            <del>$${product.originalPrice}</del>
                        </div>
                        <div class="inc_dec">                      
                            <i class="fa-solid fa-minus"></i>
                            <span class="item_inc_dec">0</span>
                            <i class="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </div>
            `;
            
            // কার্টে থাকলে কাউন্ট সেট করুন
            const cartItem = cartItems.find(item => item.id === product.id);
            if (cartItem) {
                card.querySelector('.item_inc_dec').textContent = cartItem.quantity;
            }
            
            return card;
        }

        // ৪. কার্ট কাউন্ট আপডেট
        function updateCartCount() {
            const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('item').textContent = totalItems;
        }

        // ৫. কার্ট আপডেট ফাংশন
        function updateCart(productId, quantity) {
            const product = products.find(p => p.id === productId);
            if (!product) return;
        
            const existingIndex = cartItems.findIndex(item => item.id === productId);
        
            if (quantity === 0) {
                if (existingIndex !== -1) cartItems.splice(existingIndex, 1);
            } else {
                if (existingIndex !== -1) {
                    cartItems[existingIndex].quantity = quantity;
                } else {
                    cartItems.push({
                        id: productId,
                        name: product.name,
                        author: product.author, // Ensure author is included
                        price: product.price,
                        originalPrice: product.originalPrice, // Ensure originalPrice is included
                        image: product.image, // Ensure image path is included
                        stock: product.stock, // Ensure stock is included
                        quantity: quantity
                    });
                }
            }
        
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            console.log(updateCartCount());;
        }

        // ৬. সব প্রোডাক্ট রেন্ডার
        products.forEach(product => {
            const card = createProductCard(product);
            sectionContainer.appendChild(card);
            
            // ইভেন্ট লিসেনার যোগ
            const minusBtn = card.querySelector('.fa-minus');
            const plusBtn = card.querySelector('.fa-plus');
            const quantitySpan = card.querySelector('.item_inc_dec');
            const stock = parseInt(card.querySelector('.stock').textContent);
            
            plusBtn.addEventListener('click', () => {
                let currentQty = parseInt(quantitySpan.textContent);
                if (currentQty < stock) {
                    quantitySpan.textContent = currentQty + 1;
                    updateCart(product.id, currentQty + 1);
                }
            });
            
            minusBtn.addEventListener('click', () => {
                let currentQty = parseInt(quantitySpan.textContent);
                if (currentQty > 0) {
                    quantitySpan.textContent = currentQty - 1;
                    updateCart(product.id, currentQty - 1);
                }
            });
        });

        // ৭. প্রথমবার কার্ট কাউন্ট আপডেট
        updateCartCount();

    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load products. Please check console for details.');
    }
});