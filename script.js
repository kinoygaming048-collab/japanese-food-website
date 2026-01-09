let cart = [];
let total = 0;

// format rupiah
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

// tambah ke cart
function addToCart(nama, harga) {
  const item = cart.find(i => i.nama === nama);

  if (item) {
    item.qty++;
  } else {
    cart.push({ nama, harga, qty: 1 });
  }

  renderCart();
}

// render cart
function renderCart() {
  const cartList = document.getElementById("cart-list");
  const totalEl = document.getElementById("total");

  cartList.innerHTML = "";
  total = 0;

  cart.forEach((item, index) => {
    const subTotal = item.harga * item.qty;
    total += subTotal;

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.nama}</strong><br>
      ${formatRupiah(item.harga)} × ${item.qty} = ${formatRupiah(subTotal)}
      <div class="qty">
        <button onclick="changeQty(${index}, -1)">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${index}, 1)">+</button>
      </div>
    `;
    cartList.appendChild(li);
  });

  totalEl.textContent = formatRupiah(total);
}

// ubah qty
function changeQty(index, delta) {
  cart[index].qty += delta;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  renderCart();
}

// checkout WA
function checkout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  let pesan = "Halo Sushi Tei Pekanbaru,%0A%0ASaya ingin memesan:%0A";

  cart.forEach(item => {
    pesan += `- ${item.nama} (${item.qty}x ${formatRupiah(item.harga)})%0A`;
  });

  pesan += `%0ATotal: ${formatRupiah(total)}`;

  const waUrl = `https://wa.me/6281283487708?text=${pesan}`;
  window.open(waUrl, "_blank");
}

// fade animation
const faders = document.querySelectorAll(".fade");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

faders.forEach(el => observer.observe(el));
