const searchBar = document.getElementById("searchBar");
const productContainer = document.getElementById("productContainer");
const cartCount= document.getElementById("cart-count");
const contactForm = document.getElementById("contactForm");

//sample Products
const products = [
    {
        id: 1,
        name: "Hydrating Face Mist",
        category: "Hydration",
        Image:"assets/images/product1.jpg",
        description: "A refreshing mist that hydrates your skin throughout the day",
    },
    {
        id: 2,
        name: "Anti-Aging Serum",
        category: "Anti-Aging",
        Image: "assets/images/product2.jpg",
        description: "A hydrating anti-aging serum that boosts your natural glow and evens the skin tone",

    },
    {
        id: 3,
        name: "SPF 50 Sunscreen",
        category: "Protection",
        Image: "assets/images/product3.jpg",
        description: "Protects skin from UV rays with lightweight and non-sticky formula",
    },
];

//Add to cart
let cart= [];
function addToCart(id) {
    cart.push(id);
    cartCount.textContent=cart.length;

    const toast= new bootstrap.Toast(document.getElementById("toastAdd"));
    toast.show();
}

//Render Products
function renderProducts(data){
    productContainer.innerHTML= "";
    data.forEach(product => {
        const card = document.createElement("div");
        card.className="col-md-4 mb-4";
        card.innerHTML= `
           <div class="card h-100">
              <img src="${product.Image}" class="card-img-top" alt="${product.name}">
              <div class="card-body d-flex flex-column">
                 <h5 class="card-title">${product.name}</h5>
                 <p class="card-text">${product.description}</p>
                    <div class="star-rating mb-2">
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                    </div>
                <div class="mt-auto d-flex justify-content-between">
                   <button class="btn btn-outline-primary product-btn" onclick="addToCart(${product.id})"> Add to Cart</button>
                   <button class="btn btn-outline-secondary product-btn" data-bs-toggle="modal" data-bs-target="#productModal" onclick="showModal(${product.id})"> Learn More </button>
                </div>
            </div>
        </div>
        `;
        productContainer.appendChild(card);
     });

     //star Rating Hover
     document.querySelectorAll(".star-rating").forEach(container => {
        const stars= container.querySelectorAll("i");
        stars.forEach((star, i)=> {
            star.addEventListener("mouseenter", ()=>{
                stars.forEach((s, j) => s.classList.toggle("active", j<= i));
            });
            container.addEventListener("mouseleave", () => {
                stars.forEach(s => s.classList.remove("active"));
            });
        });
     });
}

//Modal Details
function showModal(id) {
    const product= products.find(p => p.id=== id);
    document.getElementById("modalTitle").textContent = product.name;
    document.getElementById("modalImage").src= product.Image;
    document.getElementById("modalDescription").textContent= product.description;
}

//search filter
searchBar.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value) ||
        p.category.toLowerCase().includes(value)
    );
    renderProducts(filtered);
});

//contact form validation
contactForm.addEventListener("submit", e => {
    if(!contactForm.checkValidity()){
        return;
    }
    e.preventDefault();
    alert("Form Submitted Successfully!");
    contactForm.reset();
});

//newsletter popup
setTimeout(() => {
    if(!document.querySelector(".modal.show")){
        const newsletterModal = new bootstrap.Modal(document.getElementById("newsletterModal"));
        newsletterModal.show();
    }
}, 5000);

//initial load
renderProducts(products);