/* =========================================
   Style.Nest — main script
   Plain JavaScript, no framework/build step.
   ========================================= */

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.querySelector(".nav-toggle");
const topbar = document.querySelector(".topbar");

if (navToggle) {
  navToggle.addEventListener("click", function () {
    topbar.classList.toggle("nav-open");
  });
}

/* ---------- Category filter (home / shop pages) ---------- */
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterButtons.forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");

    const category = btn.dataset.filter;

    productCards.forEach(function (card) {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});

/* ---------- Cart helpers (stored in localStorage) ---------- */
function getCart() {
  const data = localStorage.getItem("styleNestCart");
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  localStorage.setItem("styleNestCart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(function (p) {
    return p.name === item.name && p.size === item.size && p.color === item.color;
  });

  if (existing) {
    existing.qty += item.qty;
  } else {
    cart.push(item);
  }

  saveCart(cart);
  showToast(item.name + " added to cart");
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCartPage();
}

function updateCartCount() {
  const countEl = document.querySelector(".cart-count");
  if (!countEl) return;
  const cart = getCart();
  const total = cart.reduce(function (sum, item) {
    return sum + item.qty;
  }, 0);
  countEl.textContent = total;
}

/* ---------- Toast message ---------- */
let toastTimer;
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 2200);
}

/* ---------- Product catalog ----------
   This is the fallback/offline data — used automatically if the .NET
   API (StyleNest.Api) isn't running. The product page reads the "id"
   from the URL (product.html?id=...) and looks it up here, so every
   product card can open its own detail page even with no backend. */
const API_BASE = "http://localhost:5080";
const fallbackProducts = {
  "yellow-puffer-jacket": {
    name: "Yellow Puffer Jacket",
    tag: "NEW ARRIVAL",
    price: 94.99,
    oldPrice: 139.99,
    discount: "32% OFF",
    stars: 5,
    reviews: 142,
    category: "women",
    images: ["assets/images/yellow-1.jpg", "assets/images/yellow-2.jpg", "assets/images/yellow-3.jpg", "assets/images/yellow-4.jpg"],
    description: "A bold, oversized puffer jacket in sunshine yellow. Roomy through the body with a stand-up hood, it's built to be the brightest thing on the street on a grey day.",
    features: ["Water-resistant shell fabric", "Oversized, relaxed fit", "Stand-up hood with zip closure", "Side pockets with snap flaps", "Available in multiple colors"]
  },
  "cobalt-puffer-jacket": {
    name: "Cobalt Puffer Jacket",
    tag: "NEW ARRIVAL",
    price: 109.99,
    oldPrice: 149.99,
    discount: "27% OFF",
    stars: 5,
    reviews: 98,
    category: "men",
    images: ["assets/images/blue-1.jpg", "assets/images/blue-2.jpg", "assets/images/blue-3.jpg"],
    description: "A rich cobalt-blue puffer with a full hood and a clean, structured silhouette — warm enough for winter streets, sharp enough for everyday wear.",
    features: ["Heavyweight insulated fill", "Full drawstring hood", "Ribbed inner cuffs", "Snap and zip front closure", "Available in multiple colors"]
  },
  "summit-green-puffer-jacket": {
    name: "Summit Green Puffer Jacket",
    tag: "BESTSELLER",
    price: 119.99,
    oldPrice: null,
    discount: null,
    stars: 5,
    reviews: 87,
    category: "men",
    images: ["assets/images/green-1.jpg", "assets/images/green-2.jpg", "assets/images/green-3.jpg"],
    description: "A deep forest-green puffer built for cold commutes and outdoor days alike, with a tall protective collar and a hood roomy enough to layer over a beanie.",
    features: ["Windproof, water-resistant shell", "Tall storm collar with hood", "Reinforced side pockets", "Adjustable hood drawstring", "Available in multiple colors"]
  },
  "onyx-puffer-jacket": {
    name: "Onyx Puffer Jacket",
    tag: "TOP RATED",
    price: 104.99,
    oldPrice: 129.99,
    discount: "19% OFF",
    stars: 5,
    reviews: 176,
    category: "women",
    images: ["assets/images/black-1.jpg", "assets/images/black-2.jpg"],
    description: "A sleek, all-black puffer jacket with a soft-lined hood — an easy layer that goes with everything and disappears into any outfit.",
    features: ["Soft-touch matte shell", "Fleece-lined hood", "Slimmer tailored fit", "Interior zip pocket", "Available in multiple colors"]
  },
  "classic-red-hoodie": {
    name: "Classic Red Hoodie",
    tag: "BESTSELLER",
    price: 59.99,
    oldPrice: null,
    discount: null,
    stars: 4,
    reviews: 98,
    images: ["assets/images/product-1.jpg"],
    description: "A relaxed, everyday hoodie in bold red with a soft fleece lining and an adjustable drawstring hood — built for comfort on cool days.",
    features: ["Soft brushed fleece interior", "Adjustable drawstring hood", "Kangaroo front pocket", "Ribbed cuffs and hem", "Machine washable"]
  },
  "forest-green-hoodie": {
    name: "Forest Green Hoodie",
    tag: "BESTSELLER",
    price: 64.99,
    oldPrice: null,
    discount: null,
    stars: 4,
    reviews: 76,
    images: ["assets/images/product-2.jpg"],
    description: "A deep forest-green hoodie with a clean printed graphic — an easy layering piece for everyday wear.",
    features: ["Midweight cotton-blend fabric", "Front graphic print", "Relaxed unisex fit", "Adjustable drawstring hood", "Machine washable"]
  },
  "alpine-blue-hoodie": {
    name: "Alpine Blue Hoodie",
    tag: "TOP RATED",
    price: 54.99,
    oldPrice: null,
    discount: null,
    stars: 5,
    reviews: 112,
    images: ["assets/images/product-3.jpg"],
    description: "A crisp periwinkle-blue hoodie designed for outdoor days — lightweight enough to layer, warm enough to wear alone.",
    features: ["Lightweight fleece blend", "Roomy front pocket", "Adjustable drawstring hood", "Reinforced stitching", "Machine washable"]
  },
  "shadow-hoodie": {
    name: "Shadow Hoodie",
    tag: "NEW ARRIVAL",
    price: 49.99,
    oldPrice: null,
    discount: null,
    stars: 4,
    reviews: 54,
    images: ["assets/images/product-4.jpg"],
    description: "A muted charcoal hoodie with subtle tonal detailing — an easy piece that pairs with almost everything in your closet.",
    features: ["Heavyweight cotton fleece", "Tonal embroidered logo", "Adjustable drawstring hood", "Ribbed cuffs and hem", "Machine washable"]
  },
  "glacier-hoodie": {
    name: "Glacier Hoodie",
    tag: "KIDS FAVORITE",
    price: 39.99,
    oldPrice: null,
    discount: null,
    stars: 4,
    reviews: 41,
    images: ["assets/images/product-6.jpg"],
    description: "A bright, playful hoodie sized for kids who don't want to slow down — soft, durable, and easy to move in.",
    features: ["Soft brushed fleece interior", "Durable double-stitched seams", "Adjustable drawstring hood", "Kangaroo front pocket", "Machine washable"]
  },
  "lagoon-hoodie": {
    name: "Lagoon Hoodie",
    tag: "TOP RATED",
    price: 57.99,
    oldPrice: null,
    discount: null,
    stars: 5,
    reviews: 89,
    images: ["assets/images/product-7.jpg"],
    description: "An oversized teal hoodie dress with a relaxed drape — easy to throw on and just as easy to love.",
    features: ["Oversized relaxed fit", "Soft midweight fleece", "Adjustable drawstring hood", "Dropped shoulder seams", "Machine washable"]
  },
  "skyline-hoodie": {
    name: "Skyline Hoodie",
    tag: "KIDS FAVORITE",
    price: 44.99,
    oldPrice: null,
    discount: null,
    stars: 4,
    reviews: 33,
    images: ["assets/images/product-8.jpg"],
    description: "A light sky-blue hoodie in a soft, breathable fabric — easy to wear from morning to evening.",
    features: ["Lightweight breathable fabric", "Adjustable drawstring hood", "Kangaroo front pocket", "Ribbed cuffs and hem", "Machine washable"]
  }
};

/* "products" is what the rest of the code reads from. It starts out
   as the fallback data above, and gets replaced with real data from
   the API if StyleNest.Api is reachable (see loadProductsFromApi). */
let products = fallbackProducts;

/* Try the real API first; if it's not running (or errors), quietly
   keep using the hardcoded fallback data instead — so this page
   always works, with or without the backend. */
async function loadProductsFromApi() {
  try {
    const res = await fetch(API_BASE + "/api/products");
    if (!res.ok) throw new Error("API responded with " + res.status);
    const data = await res.json();

    const loaded = {};
    data.forEach(function (p) {
      loaded[p.slug] = {
        dbId: p.id, // numeric id the API needs for placing an order
        name: p.name,
        tag: p.tag,
        price: p.price,
        oldPrice: p.oldPrice,
        discount: p.discount,
        stars: p.stars,
        reviews: p.reviews,
        images: p.images,
        description: p.description,
        features: p.features
      };
    });
    products = loaded;
  } catch (err) {
    products = fallbackProducts; // API not running — fall back quietly
  }
}

// Load real product data (with dbIds) on EVERY page, not just product.html,
// so shop-grid "add to cart" buttons can attach a dbId too.
loadProductsFromApi();

/* ---------- Add-to-cart buttons on product grid cards ---------- */
document.querySelectorAll(".add-btn").forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const card = btn.closest(".product-card");
    const match = products[card.dataset.id];
    addToCart({
      name: card.dataset.name,
      price: parseFloat(card.dataset.price),
      image: card.dataset.image,
      color: "Default",
      size: "M",
      qty: 1,
      dbId: match ? match.dbId : null
    });
  });
});

/* ---------- Product detail page ---------- */
const mainImage = document.getElementById("mainImage");

/* Fill the page with whichever product's id is in the URL,
   e.g. product.html?id=classic-red-hoodie.
   Falls back to the first product if no id is given. */
function loadProductPage() {
  const detailAddBtn = document.getElementById("detailAddBtn");
  if (!detailAddBtn) return; // not on the product page

  loadProductsFromApi().then(function () {
    renderProductPage();
  });
}

function renderProductPage() {
  const detailAddBtn = document.getElementById("detailAddBtn");
  if (!detailAddBtn) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "yellow-puffer-jacket";
  const product = products[id] || products["yellow-puffer-jacket"];

  document.title = product.name + " — Style.Nest";
  document.getElementById("prodTag").textContent = product.tag;
  document.getElementById("prodTitle").textContent = product.name;
  document.getElementById("prodStars").textContent = "★".repeat(product.stars) + "☆".repeat(5 - product.stars);
  document.getElementById("prodReviews").textContent = (product.stars + ".0" ) + " (" + product.reviews + " reviews)";
  document.getElementById("prodPrice").textContent = "$" + product.price.toFixed(2);
  document.getElementById("prodDesc").textContent = product.description;
  document.getElementById("prodDescLong").textContent = product.description;
  document.getElementById("reviewTabHeading").textContent = "Reviews (" + product.reviews + ")";
  document.getElementById("reviewTabText").textContent =
    product.stars + " out of 5 based on " + product.reviews + " reviews. Customers most often mention the fit and the fabric quality.";

  const oldPriceEl = document.getElementById("prodOldPrice");
  const discountEl = document.getElementById("prodDiscount");
  if (product.oldPrice) {
    oldPriceEl.textContent = "$" + product.oldPrice.toFixed(2);
    oldPriceEl.style.display = "";
    discountEl.textContent = product.discount;
    discountEl.style.display = "";
  } else {
    oldPriceEl.style.display = "none";
    discountEl.style.display = "none";
  }

  const featuresList = document.getElementById("prodFeatures");
  featuresList.innerHTML = "";
  product.features.forEach(function (line) {
    const li = document.createElement("li");
    li.textContent = line;
    featuresList.appendChild(li);
  });

  const thumbList = document.getElementById("thumbList");
  thumbList.innerHTML = "";
  product.images.forEach(function (src, i) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = product.name;
    if (i === 0) img.classList.add("active");
    thumbList.appendChild(img);
  });
  mainImage.src = product.images[0];

  detailAddBtn.dataset.name = product.name;
  detailAddBtn.dataset.price = product.price;
  detailAddBtn.dataset.dbId = product.dbId || ""; // numeric id, only set when the API is live

  attachThumbEvents();
}

function attachThumbEvents() {
  document.querySelectorAll(".thumb-list img").forEach(function (thumb) {
    thumb.addEventListener("click", function () {
      document.querySelectorAll(".thumb-list img").forEach(function (t) {
        t.classList.remove("active");
      });
      thumb.classList.add("active");
      if (mainImage) mainImage.src = thumb.src;
    });
  });
}

loadProductPage();

document.querySelectorAll(".swatch").forEach(function (swatch) {
  swatch.addEventListener("click", function () {
    document.querySelectorAll(".swatch").forEach(function (s) {
      s.classList.remove("active");
    });
    swatch.classList.add("active");
  });
});

document.querySelectorAll(".size-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".size-btn").forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");
  });
});

/* Quantity stepper */
const qtyDisplay = document.getElementById("qtyValue");
let qty = 1;

const qtyMinus = document.getElementById("qtyMinus");
const qtyPlus = document.getElementById("qtyPlus");

if (qtyMinus) {
  qtyMinus.addEventListener("click", function () {
    if (qty > 1) qty--;
    qtyDisplay.textContent = qty;
  });
}

if (qtyPlus) {
  qtyPlus.addEventListener("click", function () {
    qty++;
    qtyDisplay.textContent = qty;
  });
}

/* Tabs (description / size guide / reviews) */
document.querySelectorAll(".tab-buttons button").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".tab-buttons button").forEach(function (b) {
      b.classList.remove("active");
    });
    document.querySelectorAll(".tab-panel").forEach(function (p) {
      p.classList.remove("active");
    });
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

/* Add to cart on the product detail page */
const detailAddBtn = document.getElementById("detailAddBtn");
if (detailAddBtn) {
  detailAddBtn.addEventListener("click", function () {
    const activeSwatch = document.querySelector(".swatch.active");
    const activeSize = document.querySelector(".size-btn.active");

    addToCart({
      name: detailAddBtn.dataset.name,
      price: parseFloat(detailAddBtn.dataset.price),
      image: mainImage.src,
      color: activeSwatch ? activeSwatch.dataset.color : "Default",
      size: activeSize ? activeSize.textContent : "M",
      qty: qty,
      dbId: detailAddBtn.dataset.dbId || null
    });
  });
}

/* ---------- Cart page rendering ---------- */
function renderCartPage() {
  const tbody = document.getElementById("cartBody");
  if (!tbody) return;

  const cart = getCart();
  const wrapper = document.getElementById("cartWrapper");
  const emptyMsg = document.getElementById("emptyCart");

  if (cart.length === 0) {
    wrapper.style.display = "none";
    emptyMsg.style.display = "block";
    return;
  }

  wrapper.style.display = "block";
  emptyMsg.style.display = "none";
  tbody.innerHTML = "";

  let subtotal = 0;

  cart.forEach(function (item, index) {
    const lineTotal = item.price * item.qty;
    subtotal += lineTotal;

    const row = document.createElement("tr");
    row.innerHTML =
      '<td><div class="cart-product"><img src="' + item.image + '" alt="' + item.name + '">' +
      "<div><div>" + item.name + "</div>" +
      '<div style="color:var(--grey);font-size:12px;">' + item.color + " / " + item.size + "</div>" +
      "</div></div></td>" +
      "<td>$" + item.price.toFixed(2) + "</td>" +
      "<td>" + item.qty + "</td>" +
      "<td>$" + lineTotal.toFixed(2) + "</td>" +
      '<td><button class="remove-btn" data-index="' + index + '">Remove</button></td>';
    tbody.appendChild(row);
  });

  document.getElementById("subtotalValue").textContent = "$" + subtotal.toFixed(2);
  const shipping = subtotal > 0 ? 5 : 0;
  document.getElementById("shippingValue").textContent = "$" + shipping.toFixed(2);
  document.getElementById("totalValue").textContent = "$" + (subtotal + shipping).toFixed(2);

  document.querySelectorAll(".remove-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      removeFromCart(parseInt(btn.dataset.index, 10));
    });
  });
}

/* ---------- Checkout ----------
   If every item in the cart came from the real API (each has a dbId),
   this places a real order with a POST to /api/orders. Otherwise —
   the API isn't running, or the cart has items added before it was —
   it falls back to the old simple behavior so checkout never breaks. */
const checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", async function () {
    const cart = getCart();
    if (cart.length === 0) return;

    const canUseApi = cart.every(function (item) {
      return item.dbId;
    });

    if (!canUseApi) {
      window.location.href = "contact.html";
      return;
    }

    checkoutBtn.disabled = true;
    checkoutBtn.textContent = "Placing order...";

    try {
      const res = await fetch(API_BASE + "/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: "Guest",
          email: "guest@example.com",
          shippingAddress: "Not collected in this demo",
          items: cart.map(function (item) {
            return {
              productId: parseInt(item.dbId, 10),
              color: item.color,
              size: item.size,
              quantity: item.qty
            };
          })
        })
      });

      if (!res.ok) throw new Error("Order failed with status " + res.status);
      const confirmation = await res.json();

      localStorage.removeItem("styleNestCart");
      updateCartCount();

      document.getElementById("cartWrapper").style.display = "none";
      document.getElementById("emptyCart").style.display = "none";
      document.getElementById("orderConfirmed").style.display = "block";
      document.getElementById("orderConfirmedDetail").textContent =
        "Order #" + confirmation.orderId + " — total $" + confirmation.total.toFixed(2);
    } catch (err) {
      // API not reachable after all — fall back rather than leave the user stuck
      window.location.href = "contact.html";
    }
  });
}

/* ---------- Contact form (front-end only, no backend) ---------- */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    showToast("Thanks! Your message has been noted.");
    contactForm.reset();
  });
}

/* ---------- Run on every page load ---------- */
updateCartCount();
renderCartPage();