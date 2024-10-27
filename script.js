class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class ShoppingCartItem {
    constructor(product, quantity = 1) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new ShoppingCartItem(product, quantity));
        }
        this.updateDOM();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.updateDOM();
    }

    adjustQuantity(productId, amount) {
        const item = this.items.find(item => item.product.id === productId);
        if (item) {
            item.quantity += amount;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.updateDOM();
            }
        }
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateDOM() {
        const cartItemsContainer = document.getElementById('cart-items');
        const totalItemsElement = document.getElementById('total-items');
        const totalPriceElement = document.getElementById('total-price');

        // Clear existing items
        cartItemsContainer.innerHTML = '';

        // Populate cart items
        this.items.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <span>${item.product.name}</span>
                <span>Quantity: ${item.quantity}</span>
                <span>Total: DT${item.getTotalPrice().toFixed(2)}</span>
                <button onclick="cart.adjustQuantity(${item.product.id}, 1)">+</button>
                <button onclick="cart.adjustQuantity(${item.product.id}, -1)">-</button>
                <button onclick="cart.removeItem(${item.product.id})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });

        // Update total items and price
        totalItemsElement.innerText = this.getTotalItems();
        totalPriceElement.innerText = this.getTotalPrice().toFixed(2);
    }
}

// Products
const products = [
    new Product(1, 'Apple', 0.500),
    new Product(2, 'Banana', 2.0),
    new Product(3, 'Orange', 1.00)
];

// Initialize  cart
const cart = new ShoppingCart();

// Function to add product to cart by product ID
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}
