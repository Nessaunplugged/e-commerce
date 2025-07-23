document.addEventListener("DOMContentLoaded", function () {
  const products = [
    { id: 1, name: "Top", price: 39.99, category: "hot", image: "top 1.jpg" },
    {
      id: 2,
      name: "Stylish top",
      price: 46.99,
      category: "product",
      image: "top 2.jpg",
    },
    {
      id: 3,
      name: "beautiful top",
      price: 23.99,
      category: "popular",
      image: "top 3.jpg",
    },
    {
      id: 4,
      name: "pinterest style top",
      price: 40.99,
      category: "product",
      image: "top 4.jpg",
    },
    {
      id: 5,
      name: "Skirt",
      price: 49.99,
      category: "popular",
      image: "skirt 1.jpg",
    },
    {
      id: 6,
      name: "Skirt",
      price: 40.99,
      category: "product",
      image: "skirt 2.jpg",
    },
    {
      id: 7,
      name: "Skirt",
      price: 50.49,
      category: "product",
      image: "skirt 3.webp",
    },
    {
      id: 8,
      name: "Skirt",
      price: 20.99,
      category: "product",
      image: "skirt 4.webp",
    },
    {
      id: 9,
      name: "Lehenga",
      price: 129.99,
      category: "products",
      image: "lehenga 1.jpg",
    },
    {
      id: 10,
      name: "Lehenga",
      price: 100.99,
      category: "products",
      image: "lehenga 2.jpg",
    },
    {
      id: 11,
      name: "Lehenga",
      price: 120.09,
      category: "products",
      image: "lehenga 3.jpg",
    },
    {
      id: 12,
      name: "Sport Wear",
      price: 59.99,
      category: "sport",
      image: "sport 1.jpg",
    },
    {
      id: 13,
      name: "Sport Wear",
      price: 39.99,
      category: "sport",
      image: "sport 3.jpg",
    },
    {
      id: 14,
      name: "Sport Wear",
      price: 39.99,
      category: "sport",
      image: "sport 4.webp",
    },
    {
      id: 15,
      name: "Sport Wear",
      price: 29.0,
      category: "sport",
      image: "sport 5.webp",
    },
    {
      id: 16,
      name: "coperate Dress",
      price: 79.99,
      category: "work",
      image: "work 1.jpg",
    },
    {
      id: 17,
      name: "coperate Dress",
      price: 79.99,
      category: "work",
      image: "work 2.jpg",
    },
    {
      id: 18,
      name: "Casual Outfit",
      price: 45.99,
      category: "popular",
      image: "casual 1.jpg",
    },
    {
      id: 18,
      name: "Casual Outfit",
      price: 49.99,
      category: "product",
      image: "casual 2.jpg",
    },
    {
      id: 19,
      name: "Evening Gown",
      price: 99.99,
      category: "recent",
      image: "gown 1.jpg",
    },
    {
      id: 20,
      name: "Dinner Gown",
      price: 120.99,
      category: "product",
      image: "gown 2.jpg",
    },
    {
      id: 21,
      name: "Summer Dress",
      price: 55.99,
      category: "hot",
      image: "summer 1.jpg",
    },
  ];

  const productsGrid = document.querySelector(".products-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cartIcon = document.querySelector(".cart-icon");
  const cartModal = document.querySelector(".cart-modal");
  const closeCart = document.querySelector(".close-cart");
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartSubtotal = document.getElementById("cart-subtotal");
  const cartShipping = document.getElementById("cart-shipping");
  const cartTax = document.getElementById("cart-tax");
  const cartTotalPrice = document.getElementById("cart-total-price");
  const cartCount = document.querySelector(".cart-count");
  const checkoutBtn = document.querySelector(".checkout-btn");
  const checkoutModal = document.querySelector(".checkout-modal");
  const closeCheckout = document.querySelector(".close-checkout");
  const checkoutForm = document.querySelector(".checkout-form");
  const subscribeForm = document.querySelector(".subscribe-form");
  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn");
  const loginModal = document.querySelector(".login-modal");
  const registerModal = document.querySelector(".register-modal");
  const closeLogin = document.querySelector(".close-login");
  const closeRegister = document.querySelector(".close-register");
  const loginForm = document.querySelector(".login-form");
  const registerForm = document.querySelector(".register-form");
  const showRegister = document.getElementById("show-register");
  const showLogin = document.getElementById("show-login");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

  function init() {
    renderProducts(products);
    updateCartCount();
    updateAuthButtons();
    setupEventListeners();
  }

  function renderProducts(productsToRender) {
    productsGrid.innerHTML = "";

    productsToRender.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.dataset.category = product.category;

      productCard.innerHTML = `
                <img src="images/${product.image}" alt="${
        product.name
      }" class="product-img">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" data-id="${
                      product.id
                    }">Add to Cart</button>
                </div>
            `;

      productsGrid.appendChild(productCard);
    });
  }

  function filterProducts(category) {
    if (category === "all") {
      renderProducts(products);
    } else {
      const filteredProducts = products.filter(
        (product) => product.category === category
      );
      renderProducts(filteredProducts);
    }
  }

  function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
  }

  function updateAuthButtons() {
    if (currentUser) {
      document.querySelector(".auth-buttons").innerHTML = `
                <span>Welcome, ${currentUser.name}</span>
                <button id="logout-btn">Logout</button>
            `;
      document.getElementById("logout-btn").addEventListener("click", logout);
    } else {
      document.querySelector(".auth-buttons").innerHTML = `
                <button id="login-btn">Login</button>
                <button id="register-btn">Register</button>
            `;

      document
        .getElementById("login-btn")
        .addEventListener("click", () => (loginModal.style.display = "flex"));
      document
        .getElementById("register-btn")
        .addEventListener(
          "click",
          () => (registerModal.style.display = "flex")
        );
    }
  }

  function renderCartItems() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
      cartSubtotal.textContent = "$0.00";
      cartTax.textContent = "$0.00";
      cartTotalPrice.textContent = "$0.00";
      return;
    }

    let subtotal = 0;

    cart.forEach((item) => {
      const product = products.find((p) => p.id === item.id);
      subtotal += product.price * item.quantity;

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";

      cartItem.innerHTML = `
                <img src="images/${product.image}" alt="${
        product.name
      }" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${product.name}</h4>
                    <p class="cart-item-price">$${product.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${
                      product.id
                    }">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${
                      product.id
                    }">+</button>
                </div>
                <i class="fas fa-times remove-item" data-id="${product.id}"></i>
            `;

      cartItemsContainer.appendChild(cartItem);
    });

    const shipping = 5.0;
    const tax = subtotal * 0.1;

    cartSubtotal.textContent = `${subtotal.toFixed(2)}`;
    cartShipping.textContent = `${shipping.toFixed(2)}`;
    cartTax.textContent = `${tax.toFixed(2)}`;
    cartTotalPrice.textContent = `${(subtotal + shipping + tax).toFixed(2)}`;
  }

  function addToCart(productId) {
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }

    updateCart();
  }

  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCart();
  }

  function updateQuantity(productId, change) {
    const item = cart.find((item) => item.id === productId);

    if (item) {
      item.quantity += change;

      if (item.quantity <= 0) {
        removeFromCart(productId);
      } else {
        updateCart();
      }
    }
  }

  function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
  }

  function login(email, password) {
    if (email === "user@example.com" && password === "password") {
      currentUser = {
        name: "Demo User",
        email: email,
      };
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      updateAuthButtons();
      loginModal.style.display = "none";
      alert("Login successful!");
      return true;
    } else {
      alert("Invalid credentials");
      return false;
    }
  }

  function register(name, email, password, confirmPassword) {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false;
    }

    currentUser = {
      name: name,
      email: email,
    };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    updateAuthButtons();
    registerModal.style.display = "none";
    alert("Registration successful! You are now logged in.");
    return true;
  }

  function logout() {
    currentUser = null;
    localStorage.removeItem("currentUser");
    updateAuthButtons();
    alert("You have been logged out");
  }

  function setupEventListeners() {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        filterProducts(button.dataset.filter);
      });
    });

    productsGrid.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart")) {
        const productId = parseInt(e.target.dataset.id);
        addToCart(productId);

        e.target.textContent = "Added!";
        setTimeout(() => {
          e.target.textContent = "Add to Cart";
        }, 1000);
      }
    });

    cartIcon.addEventListener("click", () => {
      renderCartItems();
      cartModal.style.display = "flex";
    });

    closeCart.addEventListener("click", () => {
      cartModal.style.display = "none";
    });

    cartItemsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-item")) {
        const productId = parseInt(e.target.dataset.id);
        removeFromCart(productId);
      }

      if (e.target.classList.contains("minus")) {
        const productId = parseInt(e.target.dataset.id);
        updateQuantity(productId, -1);
      }

      if (e.target.classList.contains("plus")) {
        const productId = parseInt(e.target.dataset.id);
        updateQuantity(productId, 1);
      }
    });

    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty");
        return;
      }

      if (!currentUser) {
        alert("Please login to proceed to checkout");
        loginModal.style.display = "flex";
        cartModal.style.display = "none";
        return;
      }

      cartModal.style.display = "none";
      checkoutModal.style.display = "flex";
    });

    closeCheckout.addEventListener("click", () => {
      checkoutModal.style.display = "none";
    });

    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      alert("Payment successful! Thank you for your purchase.");

      cart = [];
      updateCart();

      checkoutModal.style.display = "none";
    });

    const faqModal = document.querySelector(".faq-modal");
    const openFaq = document.getElementById("open-faq");
    const closeFaq = document.querySelector(".close-faq");
    const faqItems = document.querySelectorAll(".faq-item");

    openFaq.addEventListener("click", (e) => {
      e.preventDefault();
      faqModal.style.display = "flex";
    });

    closeFaq.addEventListener("click", () => {
      faqModal.style.display = "none";
    });

    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      question.addEventListener("click", () => {
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            otherItem.classList.remove("active");
          }
        });

        item.classList.toggle("active");
      });
    });

    window.addEventListener("click", (e) => {
      if (e.target === faqModal) {
        faqModal.style.display = "none";
      }
    });

    subscribeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = e.target.querySelector("input").value;
      alert(`Thank you for subscribing with ${email}!`);
      e.target.reset();
    });

    loginBtn.addEventListener("click", () => {
      loginModal.style.display = "flex";
    });

    registerBtn.addEventListener("click", () => {
      registerModal.style.display = "flex";
    });

    closeLogin.addEventListener("click", () => {
      loginModal.style.display = "none";
    });

    closeRegister.addEventListener("click", () => {
      registerModal.style.display = "none";
    });

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      login(email, password);
    });

    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("register-name").value;
      const email = document.getElementById("register-email").value;
      const password = document.getElementById("register-password").value;
      const confirmPassword = document.getElementById(
        "register-confirm-password"
      ).value;
      register(name, email, password, confirmPassword);
    });

    showRegister.addEventListener("click", (e) => {
      e.preventDefault();
      loginModal.style.display = "none";
      registerModal.style.display = "flex";
    });

    showLogin.addEventListener("click", (e) => {
      e.preventDefault();
      registerModal.style.display = "none";
      loginModal.style.display = "flex";
    });

    window.addEventListener("click", (e) => {
      if (e.target === cartModal) {
        cartModal.style.display = "none";
      }
      if (e.target === checkoutModal) {
        checkoutModal.style.display = "none";
      }
      if (e.target === loginModal) {
        loginModal.style.display = "none";
      }
      if (e.target === registerModal) {
        registerModal.style.display = "none";
      }
    });
  }

  init();

  const originalRenderProducts = renderProducts;
  renderProducts = function (productsToRender) {
    originalRenderProducts(productsToRender);

    document.querySelectorAll(".product-card").forEach((card, index) => {
      const optionsHTML = `
      <div class="product-options">
        <div>
          <h4>Size</h4>
          <div>
            <button class="size-btn active" data-size="S">S</button>
            <button class="size-btn" data-size="M">M</button>
            <button class="size-btn" data-size="L">L</button>
          </div>
        </div>
        <div>
          <h4>Color</h4>
          <div>
            <button class="color-btn active" data-color="pink">Pink</button>
            <button class="color-btn" data-color="White">White</button>
             <button class="color-btn" data-color="Blue">Blue</button>
              <button class="color-btn" data-color="White">Wine</button>
               <button class="color-btn" data-color="White">Black</button>
                <button class="color-btn" data-color="White">Green</button>
          </div>
        </div>
        <button class="add-to-cart-options" data-id="${productsToRender[index].id}">
          Add to Cart
        </button>
      </div>
    `;
      card.insertAdjacentHTML("beforeend", optionsHTML);

      card.querySelectorAll(".size-btn, .color-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          btn.parentNode
            .querySelectorAll(".active")
            .forEach((a) => a.classList.remove("active"));
          btn.classList.add("active");
        });
      });

      card
        .querySelector(".add-to-cart-options")
        .addEventListener("click", function () {
          const size = card.querySelector(".size-btn.active").dataset.size;
          const color = card.querySelector(".color-btn.active").dataset.color;
          const id = this.dataset.id;

          const existing = cart.find(
            (item) => item.id == id && item.size == size && item.color == color
          );
          if (existing) {
            existing.quantity++;
          } else {
            cart.push({
              id: Number(id),
              quantity: 1,
              size,
              color,
            });
          }

          updateCart();
          this.textContent = "Added!";
          setTimeout(() => (this.textContent = "Add to Cart"), 1000);
        });
    });
  };

  const originalRenderCartItems = renderCartItems;
  renderCartItems = function () {
    originalRenderCartItems();

    document.querySelectorAll(".cart-item").forEach((item) => {
      const id = item.querySelector(".remove-item").dataset.id;
      const cartItem = cart.find((i) => i.id == id);
      if (cartItem.size || cartItem.color) {
        const details = item.querySelector(".cart-item-details");
        details.insertAdjacentHTML(
          "beforeend",
          `
        <p class="item-options">${cartItem.size} • ${cartItem.color}</p>
      `
        );
      }
    });
  };

  renderProducts(products);
});
