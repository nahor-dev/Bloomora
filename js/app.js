// const searchBtn = document.querySelector(".search__button")
// const searchForm = document.querySelector(".search-form")

// searchBtn.addEventListener('click', () => {
//   searchForm.classList.toggle("hidden")
// })

const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");

import { products } from "./products.js";

import { cart } from "./cart.js";

const flowerGrid = document.querySelector(".flower-grid");
const cartLink = document.querySelector(".cart-link")
const cardPage = document.getElementById("cart")

// let cart = JSON.parse(localStorage.getItem("bloomora-cart")) || [];
cartLink.addEventListener("click", ()=>{
    cardPage.classList.toggle("hidden")
})

function renderProducts() {
  flowerGrid.innerHTML = products
    .map(
      (product) => `
        <article class="apple-flower-card">
    
    <span class="apple-badge">New arrival</span>
    
    <button type="button" class="apple-fav-icon" aria-label="Add to favorites">
        <svg xmlns="http://w3.org" height="22px" viewBox="0 -960 960 960" width="22px">
            <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>
        </svg>
    </button>
    
    <!-- Hero Image Area -->
    <img class="apple-card-img" src="${product.image}" alt="${product.name}">
    
    <!-- Editorial Information Group -->
    <div class="apple-card-info">
        <h3 class="apple-card-name">${product.name}</h3>
        <p class="apple-card-description">${product.descriptions}</p>
        <p class="apple-card-price">$${product.price}</p>
    </div>
    
    <!-- Unified Call To Actions -->
    <div class="apple-card-actions">
        <button type="button" class="btn-secondary" data-id="${product.id}">Add to Cart</button>
        <button type="button" class="btn-primary" data-id="${product.id}">Buy Now</button>
    </div>
</article>
        
        `,
    )
    .join("");
}

renderProducts();

flowerGrid.addEventListener("click", (event) => {
  if (!event.target.classList.contains("btn-secondary")) return;

  const productId = Number(event.target.dataset.id);

  const product = products.find((product) => product.id === productId);

  cart.push(product);
    renderCart();
//   console.log(cart);
});

function renderCart() {
  cartItems.innerHTML = cart.map((product, index) => `
    <div class="cart-item">
      <img src="${product.image}" alt="${product.name}">
      
      <div>
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
      </div>

      <button type="button" class="remove-btn" id="remove-btn" data-index="${index}">
        Remove
      </button>
    </div>
  `).join("");

  const total = cart.reduce((sum, product) => sum + product.price, 0);

  cartTotal.textContent = total.toFixed(2);

  const removeBtn = document.getElementById("remove-btn")


removeBtn.addEventListener("click", ()=>{

    const removeId = Number(dataset.index);
    const removeProduct = products.find((product) => index === removeId);

    cart.pop(removeProduct);
    cartItems.innerHTML = cart.map((product, index) => ``)

  
  console.log("remove")
})



}

