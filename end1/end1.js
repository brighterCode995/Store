const productsDiv = document.getElementById('products');
const cartList = document.getElementById('cart');
const checkoutBtn = document.getElementById('checkout');

let cart = [];

async function fetchProducts() {
  const res = await fetch('http://localhost:3000/products');
  const products = await res.json();

  products.forEach(product => {
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${product.name}</strong> - $${product.price}
      <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
    `;
    productsDiv.appendChild(div);
  });
}

function addToCart(id, name, price) {
  cart.push({ id, name, price, quantity: 1 });
  renderCart();
}

function renderCart() {
  cartList.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

checkoutBtn.addEventListener('click', async () => {
  const res = await fetch('http://localhost:3000/orders/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: cart })
  });

  const data = await res.json();
  window.location.href = data.url; // Redirect to Stripe checkout
});

fetchProducts();
