let cart = [];
let total = 0;

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cart-list");
  const totalEl = document.getElementById("total");

  list.innerHTML = "";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `• ${item.name} - Rp ${item.price.toLocaleString("id-ID")}`;
    list.appendChild(li);
  });

  totalEl.textContent = `Rp ${total.toLocaleString("id-ID")}`;
}

function checkout() {
  if (cart.length === 0) {
    alert("Silakan pilih menu terlebih dahulu 🍣");
    return;
  }

  let message = "Halo Sushi Tei Pekanbaru, saya ingin memesan:%0A";

  cart.forEach(item => {
    message += `- ${item.name} (Rp ${item.price.toLocaleString("id-ID")})%0A`;
  });

  message += `%0ATotal: Rp ${total.toLocaleString("id-ID")}`;

  window.open(
    `https://wa.me/628111992539?text=${message}`,
    "_blank"
  );
}

/* FADE ANIMATION */
window.onload = () => {
  document.querySelectorAll(".fade").forEach((el, i) => {
    setTimeout(() => el.classList.add("show"), i * 200);
  });
};
