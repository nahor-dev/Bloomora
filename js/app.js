// const searchBtn = document.querySelector(".search__button")
// const searchForm = document.querySelector(".search-form")

// searchBtn.addEventListener('click', () => {
//   searchForm.classList.toggle("hidden")
// })

const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");

import { products } from "./products.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const flowerGrid = document.querySelector(".flower-grid");
const cartLinks = document.querySelectorAll(".cart-link");
const cardPage = document.getElementById("cart");
const categoryLists = document.querySelector(".category-list");

function showCart() {
  cardPage.classList.toggle("hidden");
  renderCart();
}

cartLinks.forEach((cartLink) => {
  cartLink.addEventListener("click", () => {
    showCart();
  });
});



function renderProducts(productsToRender) {
  flowerGrid.innerHTML = productsToRender
    .map((product) => {
      const badgeClass = product.newArrival ? "" : "not-new";

      return `
      <article class="apple-flower-card">
  
        
        <span class="apple-badge ${badgeClass}">New arrival</span>
        
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
    `;
    })
    .join("");
}

renderProducts(products);

flowerGrid.addEventListener("click", (event) => {
  if (!event.target.classList.contains("btn-secondary")) return;

  const productId = Number(event.target.dataset.id);

  const product = products.find((product) => product.id === productId);

  cart.push(product);

  saveCartToStorage();

  cardPage.classList.remove("hidden");
  cartItemNumberCount();
  renderCart();
});

function renderCart() {
  cartItems.innerHTML = cart
    .map(
      (product, index) => `
    <div class="cart-item" data-id = "${product.id}">
      <img src="${product.image}" alt="${product.name}">
      
      <div>
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
      </div>

      <button type="button" class="remove-btn">
        Remove
      </button>
    </div>
  `,
    )
    .join("");

  const total = cart.reduce((sum, product) => {
    return sum + product.price;
  }, 0);

  cartTotal.textContent = total.toFixed(2);
}

cartItems.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-btn")) {
    const itemCard = event.target.closest(".cart-item");
    const productId = Number(itemCard.dataset.id);

    const itemIndex = cart.findIndex((product) => product.id === productId);

    if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);

      saveCartToStorage();
      cartItemNumberCount();
      renderCart();
    }
  }
});

function saveCartToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

const cartItemNumber = document.querySelector(".cart-item-number");

function cartItemNumberCount() {
  if (cart.length === 0) {
    cartItemNumber.classList.add("not-seen");
    return;
  }
  cartItemNumber.textContent = cart.length;
}
cartItemNumberCount();

const showMoreBtn = document.querySelector(".show-more");

showMoreBtn.addEventListener("click", () => {
  cartItems.classList.toggle("open");

  if (cartItems.classList.contains("open")) {
    showMoreBtn.innerHTML = "show less";
  } else {
    showMoreBtn.innerHTML = "show more";
  }
});

const searchInput = document.getElementById("search_input");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm),
  );

  renderProducts(filteredProducts);
});



const uniqueCategories = [...new Set(products.map(p => p.category))]; 



categoryLists.innerHTML += uniqueCategories.map(category =>`
    <li>
    <button type="button" class="category-btn" data-category="${category}">
      ${category}
    </button>
  </li>
              
`


).join("")




categoryLists.addEventListener("click", (event) =>{
  if (!event.target.classList.contains("category-btn")) return;

  

  const categoryItem = event.target.dataset.category.toLowerCase()

  if (categoryItem === "all") {
    renderProducts(products);
    return;
  }

  const categoryProduct = products.filter(product => 
  product.category.toLowerCase().includes(categoryItem)

  
)

  renderProducts(categoryProduct);
})

