// Պատրաստի ապրանքների ցուցակ (ըստ կատեգորիաների)
const products = [
    { 
      id: 1,
      name: "Պելմենի դասական",
      price: 2500,
      image: "./images/tesakani/pelmeni1.webp",
      category: "pelmeni",
      weight: "500 գրամ",
      description: "Ավանդական պելմենի տավարի և խոզի մսով",
      ingredients: "Տավարի միս, խոզի միս, ալյուր, ձու, սոխ, աղ, պղպեղ",
      cookingTime: "15-20 րոպե",
      phone: "+374 00 123456",
      rating: 4.5,
      reviews: 28
    },
  { 
    id: 2, 
    name: "Խինկալի հատուկ", 
    price: 3000, 
    image: "./images/tesakani/xinkali1.webp",
    category: "khinkali",
    weight: "600 գրամ",
    description: "Խինկալի հատուկ բաղադրատոմսով տավարի մսով",
    ingredients: "Տավարի միս, խոզի միս, ալյուր, ձու, սոխ, աղ, պղպեղ",
    cookingTime: "15-20 րոպե",
    phone: "+374 00 123456",
    rating: 4.5,
    reviews: 28
  },
  { 
    id: 3, 
    name: "Ձոնդոկլի սպիտակ", 
    price: 2800, 
    image: "./images/tesakani/xinkali2.webp",
    category: "dzondokli",
    weight: "500 գրամ",
    description: "Սպիտակ ձոնդոկլի թարմ բաղադրիչներով",
    ingredients: "Տավարի միս, խոզի միս, ալյուր, ձու, սոխ, աղ, պղպեղ",
    cookingTime: "15-20 րոպե",
    phone: "+374 00 123456",
    rating: 4.5,
    reviews: 28
  },
  { 
    id: 4, 
    name: "Պելմենի հավի", 
    price: 2300, 
    image: "./images/tesakani/pelmeni2.webp",
    category: "pelmeni",
    weight: "500 գրամ",
    description: "Պելմենի հավի մսով և կանաչիով",
    ingredients: "Տավարի միս, խոզի միս, ալյուր, ձու, սոխ, աղ, պղպեղ",
    cookingTime: "15-20 րոպե",
    phone: "+374 00 123456",
    rating: 4.5,
    reviews: 28
  },
  { 
    id: 5, 
    name: "Խինկալի սունկով", 
    price: 3200, 
    image: "./images/tesakani/xinkali3.webp",
    category: "khinkali",
    weight: "600 գրամ",
    description: "Խինկալի սունկի և մսի համադրությամբ",
    ingredients: "Տավարի միս, խոզի միս, ալյուր, ձու, սոխ, աղ, պղպեղ",
    cookingTime: "15-20 րոպե",
    phone: "+374 00 123456",
    rating: 4.5,
    reviews: 28
  },
  { 
    id: 6, 
    name: "Պելմենի դասական", 
    price: 2500, 
    image: "./images/tesakani/pelmeni3.webp",
    category: "pelmeni",
    weight: "500 գրամ",
    description: "Ավանդական պելմենի տավարի և խոզի մսով",
    ingredients: "Տավարի միս, խոզի միս, ալյուր, ձու, սոխ, աղ, պղպեղ",
    cookingTime: "15-20 րոպե",
    phone: "+374 00 123456",
    rating: 4.5,
    reviews: 28
  },
];
// DOM Elements
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const loadMoreBtn = document.getElementById("loadMoreBtn");

// Գլոբալ փոփոխականներ
let currentCategory = 'all';
let currentSearch = '';
let visibleCount = 6;

// Ցուցադրել ապրանքները էջավորմամբ
function renderProducts(productsToRender) {
  // Ֆիլտրել ըստ ընթացիկ կատեգորիայի և որոնման
  let filteredProducts = productsToRender;
  
  if (currentCategory !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === currentCategory);
  }
  
  if (currentSearch) {
    const searchTerm = currentSearch.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm) || 
      p.description.toLowerCase().includes(searchTerm)
    );
  }
  
  // Ստուգել եթե ապրանքներ չկան
  if (filteredProducts.length === 0) {
    productGrid.innerHTML = `
      <div class="no-products">
        <i class="fas fa-box-open"></i>
        <p>Ապրանքներ չեն գտնվել</p>
      </div>
    `;
    loadMoreBtn.style.display = 'none';
    return;
  }
  
  // Ցուցադրել տեսանելի ապրանքները
  productGrid.innerHTML = '';
  const productsToShow = filteredProducts.slice(0, visibleCount);
  
  productsToShow.forEach(product => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="price">${product.price.toLocaleString()} ֏</p>
        <p class="weight">${product.weight}</p>
        <div class="product-rating">
          ${renderStars(product.rating)}
          <span>(${product.reviews})</span>
        </div>
      </div>
    `;
    
    productCard.addEventListener("click", () => showProductDetails(product.id));
    productGrid.appendChild(productCard);
  });
  
  // Ցույց տալ/թաքցնել "Բեռնել ավելին" կոճակը
  loadMoreBtn.style.display = visibleCount < filteredProducts.length ? 'block' : 'none';
}


// Ապրանքի մանրամասն տեղեկատվության պատուհան
function showProductDetails(productId) {
  const product = products.find(p => p.id === productId);
  
  const modal = document.createElement("div");
  modal.className = "product-modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <div class="modal-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="modal-info">
        <h2>${product.name}</h2>
        
        <div class="modal-meta">
          <p><strong>Արժեք:</strong> ${product.price.toLocaleString()} ֏</p>
          <p><strong>Քաշ:</strong> ${product.weight}</p>
          <p><strong>Պատրաստման ժամանակ:</strong> ${product.cookingTime}</p>
          <p><strong>Հեռախոս:</strong> <a href="tel:${product.phone}">${product.phone}</a></p>
        </div>
        
        <div class="modal-description">
          <h3>Նկարագրություն</h3>
          <p>${product.description}</p>
          
          <h3>Բաղադրիչներ</h3>
          <p>${product.ingredients}</p>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Փակելու ֆունկցիոնալ
  modal.querySelector(".close-modal").addEventListener("click", () => {
    modal.remove();
  });
  
  // Փակել պատուհանը ESC ստեղնով
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modal.remove();
    }
  });
}

// Ֆիլտրել ըստ կատեգորիայի
function filterProducts(category) {
  currentCategory = category;
  visibleCount = 6; // Վերականգնել տեսանելի քանակը
  renderProducts(products);
}

// Որոնել ապրանքներ
function searchProducts() {
  currentSearch = searchInput.value;
  visibleCount = 6; // Վերականգնել տեսանելի քանակը
  renderProducts(products);
}
// Event Listeners
searchInput.addEventListener("input", searchProducts);

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    filterProducts(button.dataset.filter);
  });
});

// Սկզբնական բեռնում
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
  
  // Թաքցնել loader-ը
  setTimeout(() => {
    document.querySelector(".loader").classList.add("fade-out");
  }, 100);
});
// Event Listeners
searchInput.addEventListener("input", searchProducts);

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    filterProducts(button.dataset.filter);
  });
});

// Սկզբնական բեռնում
document.addEventListener("DOMContentLoaded", () => {
  // Ցուցադրել բոլոր ապրանքները
  renderProducts(products);
  
  // Թաքցնել loader-ը
  setTimeout(() => {
    document.querySelector(".loader").classList.add("fade-out");
  }, 100);
});

function initDeliveryCalculator() {
  const calculator = document.createElement("div");
  calculator.className = "delivery-calculator";
  calculator.innerHTML = `
    <h3>Առաքման Արժեք</h3>
    <div class="calculator-form">
      <select id="delivery-district">
        <option value="">Ընտրել շրջան</option>
        <option value="center">Կենտրոն</option>
        <option value="arabkir">Արաբկիր</option>
        <option value="avan">Ավան</option>
        <option value="nor-nork">Նոր Նորք</option>
      </select>
      <button id="calculate-delivery">Հաշվել</button>
    </div>
    <div class="calculator-result"></div>
  `;
  
  document.querySelector(".contact-info").appendChild(calculator);
  
  document.getElementById("calculate-delivery").addEventListener("click", () => {
    const district = document.getElementById("delivery-district").value;
    if (!district) return;
    
    let price = 0;
    switch(district) {
      case "center": price = 500; break;
      case "arabkir": price = 700; break;
      case "avan": price = 800; break;
      case "nor-nork": price = 750; break;
    }
    
    document.querySelector(".calculator-result").innerHTML = `
      <p>Առաքում ${getDistrictName(district)}: <strong>${price} ֏</strong></p>
    `;
  });
}

function getDistrictName(district) {
  const names = {
    "center": "Կենտրոն",
    "arabkir": "Արաբկիր",
    "avan": "Ավան",
    "nor-nork": "Նոր Նորք"
  };
  return names[district];
}
// Ավելացնել products.js-ում
function addRatingSystem() {
  products.forEach(product => {
    product.rating = Math.floor(Math.random() * 5) + 1; // 1-5 պատահական վարկանիշ
    product.reviews = Math.floor(Math.random() * 50); // 0-50 պատահական կարծիքներ
  });
}

function renderProducts(productsToRender) {
  const fragment = document.createDocumentFragment();
  const visibleCount = Math.min(productsToRender.length, 12); // Սկզբում միայն 12 տարր
  
  productsToRender.slice(0, visibleCount).forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-badge">ՆՈՐ</div>
      <img src="${product.image}" alt="${product.name}" loading="lazy" width="300" height="200">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="price">${product.price.toLocaleString()} ֏</p>
        <p class="weight">${product.weight}</p>
        <div class="product-rating">
          ${'<i class="fas fa-star"></i>'.repeat(product.rating)}
          <span>(${product.reviews})</span>
        </div>
      </div>
      <div class="product-actions">
        <button class="add-to-cart" data-id="${product.id}">
          <i class="fas fa-cart-plus"></i> Ավելացնել
        </button>
      </div>
    `;
    fragment.appendChild(card);
  });
  
  productGrid.innerHTML = "";
  productGrid.appendChild(fragment);
  
  // Virtual Scrolling
  if (productsToRender.length > visibleCount) {
    window.addEventListener("scroll", handleScroll);
  }
}

let isLoading = false;
function handleScroll() {
  if (isLoading || window.innerHeight + window.scrollY < document.body.offsetHeight - 500) return;
  
  isLoading = true;
  setTimeout(() => {
    // Բեռնել հաջորդ տարրերը
    isLoading = false;
  }, 300);
}
function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += `<i class="fas fa-star${i > rating ? '-half-alt' : ''}"></i>`;
  }
  return stars;
}


function renderProducts(productsToRender) {
  productGrid.innerHTML = "";
  
  productsToRender.forEach(product => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" loading="lazy" width="300" height="200">
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="price">Արժեքը ${product.price.toLocaleString()} ֏</p>
        <p class="weight">Քաշը ${product.weight}</p>
      </div>
    `;
    
    // Ավելացնել click event listener ուղղակիորեն div-ին
    productCard.addEventListener("click", () => {
      // Այստեղ կարող եք ավելացնել Ձեր ցանկացած լոգիկա
      console.log("Ապրանքը սեղմված է:", product.name);
      // Կամ ցույց տալ մոդալ պատուհան
      showProductDetails(product.id);
    });
    
    productGrid.appendChild(productCard);
  });
}

// Աստղանիշների գեներացիա
function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += `<i class="fas fa-star${i > rating ? '' : ' filled'}"></i>`;
  }
  return stars;
}
// Բեռնել ավելին կոճակի լոգիկա
function loadMoreProducts() {
  visibleCount += 6;
  renderProducts(products);
  
  // Թարմացնել էջի վերևի դիրքը հարթ անցման ազդեցությամբ
  window.scrollTo({
    top: document.body.scrollHeight - 800,
    behavior: 'smooth'
  });
}



// Ցուցադրել ապրանքները
function renderProducts() {
// Ֆիլտրել ապրանքները
let filteredProducts = products.filter(product => {
  const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
  const matchesSearch = !currentSearch || 
    product.name.toLowerCase().includes(currentSearch.toLowerCase()) || 
    product.description.toLowerCase().includes(currentSearch.toLowerCase());
  return matchesCategory && matchesSearch;
});

// Ցուցադրել արդյունքները
productGrid.innerHTML = filteredProducts.slice(0, visibleCount).map(product => `
  <div class="product-card" data-id="${product.id}">
    <div class="product-image-container">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
    </div>
    <div class="product-info">
      <h3>${product.name}</h3>
      <p class="price">${product.price.toLocaleString()} ֏</p>
      <p class="weight">${product.weight}</p>
      <div class="product-rating">
        ${renderStars(product.rating)} (${product.reviews})
      </div>
    </div>
  </div>
`).join('');

// Ավելացնել event listener-ներ ապրանքների քարտերին
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', function() {
    const productId = parseInt(this.getAttribute('data-id'));
    showProductDetails(productId);
  });
});

// // Ցույց տալ/թաքցնել "Բեռնել ավելին" կոճակը
// loadMoreBtn.style.display = visibleCount < filteredProducts.length ? 'block' : 'none';

// Ցույց տալ հաղորդագրություն, եթե ապրանքներ չկան
if (filteredProducts.length === 0) {
  productGrid.innerHTML = `
    <div class="no-products">
      <i class="fas fa-box-open"></i>
      <p>Ապրանքներ չեն գտնվել</p>
    </div>
  `;
}
}

// Ապրանքի մանրամասն տեղեկատվության պատուհան
function showProductDetails(productId) {
const product = products.find(p => p.id === productId);
if (!product) return;

const modal = document.createElement("div");
modal.className = "product-modal active";
modal.innerHTML = `
  <div class="modal-content">
    <span class="close-modal">&times;</span>
    <div class="modal-image">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="modal-info">
      <h2>${product.name}</h2>
      <div class="modal-meta">
        <p><strong>Արժեք:</strong> ${product.price.toLocaleString()} ֏</p>
        <p><strong>Քաշ:</strong> ${product.weight}</p>
        <p><strong>Պատրաստման ժամանակ:</strong> ${product.cookingTime}</p>
        <p><strong>Հեռախոս:</strong> <a href="tel:${product.phone}">${product.phone}</a></p>
      </div>
      <div class="modal-description">
        <h3>Նկարագրություն</h3>
        <p>${product.description}</p>
        <h3>Բաղադրիչներ</h3>
        <p>${product.ingredients}</p>
      </div>
      <div class="modal-actions">
      </div>
    </div>
  </div>
`;

document.body.appendChild(modal);
document.body.style.overflow = 'hidden'; // Կանխել էջի սքրոլը

// Փակելու ֆունկցիոնալ
modal.querySelector(".close-modal").addEventListener("click", closeModal);

// Փակել պատուհանը ESC ստեղնով
document.addEventListener('keydown', handleEscape);

// Ավելացնել զամբյուղում
modal.querySelector(".add-to-cart").addEventListener("click", function(e) {
  e.stopPropagation();
  addToCart(product.id);
});

// Արագ գնում
modal.querySelector(".buy-now").addEventListener("click", function(e) {
  e.stopPropagation();
  buyNow(product.id);
});

// Փակել մոդալը արտաքին տարածքում սեղմելու դեպքում
modal.addEventListener('click', function(e) {
  if (e.target === modal) {
    closeModal();
  }
});

function closeModal() {
  modal.classList.remove('active');
  setTimeout(() => {
    modal.remove();
    document.body.style.overflow = '';
  }, 300);
  document.removeEventListener('keydown', handleEscape);
}

function handleEscape(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}
}

// Աստղանիշների գեներացիա
function renderStars(rating) {
return Array(5).fill(0).map((_, i) => 
  `<i class="fas fa-star${i < Math.floor(rating) ? '' : '-o'}"></i>`
).join('');
}

// Բեռնել ավելին
function loadMoreProducts() {
visibleCount += 6;
renderProducts();
scrollToProducts();
}

// Որոնել ապրանքներ
function searchProducts() {
currentSearch = searchInput.value;
visibleCount = 6;
renderProducts();
scrollToProducts();
}

// Իջնել ապրանքների բաժին
function scrollToProducts() {
const productsSection = document.getElementById("products");
if (productsSection) {
  productsSection.scrollIntoView({ behavior: 'smooth' });
}
}

// Ֆիլտրել ըստ կատեգորիայի
function filterProducts(category) {
currentCategory = category;
visibleCount = 6;
renderProducts();
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
renderProducts();

searchInput.addEventListener("input", () => {
  currentSearch = searchInput.value;
  renderProducts();
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === 'Enter') searchProducts();
});

if (searchButton) {
  searchButton.addEventListener("click", searchProducts);
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    filterProducts(button.dataset.filter);
  });
});

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", loadMoreProducts);
}

// Թաքցնել loader-ը
setTimeout(() => {
  document.querySelector(".loader").classList.add("fade-out");
}, 50);
});