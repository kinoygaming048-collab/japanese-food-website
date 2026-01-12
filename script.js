let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartList;
let totalEl;

/* RENDER CART */
function renderCart() {
  cartList.innerHTML = "";
  let total = 0;
  let totalQty = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    totalQty += item.qty;

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="cart-item">
        <span>${item.name}</span>

        <div class="qty-control">
          <button onclick="changeQty(${index}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>

        <strong>Rp ${(item.price * item.qty).toLocaleString("id-ID")}</strong>

        <button class="remove-btn" onclick="removeItem(${index})">❌</button>
      </div>
    `;

    cartList.appendChild(li);
  });

  // CART UTAMA
  document.getElementById("total").innerText =
    "Rp " + total.toLocaleString("id-ID");

  // FLOATING CART
  document.getElementById("floating-total").innerText =
    "Rp " + total.toLocaleString("id-ID");

  document.getElementById("floating-count").innerText =
    totalQty + " item";

  // SIMPAN
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ADD TO CART */
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  renderCart();
}

/* REMOVE ITEM */
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

/* CHANGE QTY */
function changeQty(index, change) {
  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  renderCart();
}

/* CHECKOUT */
function checkout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  let total = 0;
  let message = "Halo Sushi Tei Pekanbaru,%0ASaya ingin memesan:%0A";

  cart.forEach(item => {
    total += item.price * item.qty;
    message += `- ${item.name} x${item.qty} (Rp ${(item.price * item.qty).toLocaleString("id-ID")})%0A`;
  });

  message += `%0ATotal: Rp ${total.toLocaleString("id-ID")}`;

  window.open(
    `https://wa.me/628111992539?text=${message}`,
    "_blank"
  );
}

/* LOAD */
window.onload = function () {
  cartList = document.getElementById("cart-list");
  totalEl = document.getElementById("total");

  renderCart();

  document.querySelectorAll(".fade").forEach((el, i) => {
    setTimeout(() => el.classList.add("show"), i * 120);
  });
};
