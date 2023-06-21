let cartItems = [];

function addToCart(name, price) {
  let cartItem = cartItems.find(item => item.name === name);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cartItem = {
      name: name,
      price: price,
      quantity: 1
    };
    cartItems.push(cartItem);
  }

  updateCartQuantity();
  saveCartItems();
  renderCartItems();
  updateLonelyTextVisibility();
}

function updateCartQuantity() {
  const cartQuantityElement = document.getElementById("cartQuantity");
  if (cartQuantityElement) {
    cartQuantityElement.textContent = cartItems.length;
  }
}

function renderCartItems() {
  const cartItemList = document.getElementById("cartItemList");
  if (cartItemList) {
    cartItemList.innerHTML = "";

    cartItems.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - $${item.price}`;
      cartItemList.appendChild(li);
    });

    updateLonelyTextVisibility(); // Add this line to update the lonely text visibility
  }
}


function toggleCart() {
  renderCartItems();
  const cartOverlay = document.getElementById("cart");
  if (cartOverlay) {
    cartOverlay.classList.toggle("show-cart");
  }
}

function saveCartItems() {
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function loadCartItems() {
  const storedCartItems = sessionStorage.getItem("cartItems");
  if (storedCartItems) {
    cartItems = JSON.parse(storedCartItems);
    updateCartQuantity();
    renderCartItems();
    updateLonelyTextVisibility();
  }
}

function clearCart() {
  cartItems = [];
  saveCartItems();
  updateCartQuantity();
  renderCartItems();
  updateLonelyTextVisibility();
}


function updateLonelyTextVisibility() {
  const lonelyTextElement = document.getElementById("lonelyText");
  if (cartItems.length === 0) {
    lonelyTextElement.style.display = "block";
  } else {
    lonelyTextElement.style.display = "none";
  }
}



loadCartItems();
