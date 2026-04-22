// Google Analytics
(function() {
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-64VXG3DWLC';
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-64VXG3DWLC');
})();

// ─── PRODUCTS ───────────────────────────────────────────────
const PRODUCTS = [
  { id:'p01', name:'Nike Air Max 90',         cat:'Footwear',    price:129.99, emoji:'👟', badge:'Bestseller', badgeType:'rust',   desc:'The Air Max 90 stays true to its OG running roots with the iconic Waffle outsole, stitched overlays, and classic details. The Max Air cushioning gives you all-day comfort.',  rating:4.8, reviews:2840 },
  { id:'p02', name:'Adidas UltraBoost 22',    cat:'Footwear',    price:179.99, emoji:'🏃', badge:'New',        badgeType:'forest', desc:'Experience incredible energy return with every step. The Primeknit+ upper wraps your foot for a perfect fit while BOOST midsole delivers unmatched cushioning.',           rating:4.7, reviews:1920 },
  { id:'p03', name:"Levi's 501 Original",     cat:'Apparel',     price:69.99,  emoji:'👖', badge:null,         badgeType:null,     desc:'The original jeans since 1873. The 501 Original is the world\'s favourite jeans, a timeless fit that has stood the test of time across generations.',               rating:4.6, reviews:5100 },
  { id:'p04', name:'Apple AirPods Pro',       cat:'Electronics', price:249.99, emoji:'🎧', badge:'Top Rated',  badgeType:'gold',   desc:'AirPods Pro feature up to 2x more Active Noise Cancellation than the previous generation, plus Transparency mode and Personalised Spatial Audio.',               rating:4.9, reviews:8420 },
  { id:'p05', name:'Sony WH-1000XM5',         cat:'Electronics', price:349.99, emoji:'🎵', badge:"Editor's Pick", badgeType:'rust', desc:'Industry-leading noise canceling with eight microphones and two processors. Up to 30-hour battery life with quick charge.',                                       rating:4.8, reviews:3210 },
  { id:'p06', name:'Patagonia Fleece Jacket', cat:'Apparel',     price:124.99, emoji:'🧥', badge:null,         badgeType:null,     desc:'Made from 100% recycled polyester fleece. Lightweight warmth that packs into its own pocket. Built for the outdoors, perfect for the city.',                       rating:4.5, reviews:1480 },
  { id:'p07', name:'Ray-Ban Aviator Classic', cat:'Accessories', price:149.99, emoji:'🕶️', badge:null,         badgeType:null,     desc:'The iconic Aviator sunglasses, first created in 1937 for US pilots. Crystal green lenses cut glare while maintaining natural colour perception.',                  rating:4.7, reviews:2670 },
  { id:'p08', name:'Dyson V15 Detect',        cat:'Home',        price:699.99, emoji:'🌀', badge:'🔥 Hot',     badgeType:'rust',   desc:'The most powerful cordless vacuum. Laser reveals invisible dust on hard floors. Auto-adjusts suction across all floor types.',                                    rating:4.9, reviews:4320 },
  { id:'p09', name:'Yeti Rambler Tumbler',    cat:'Accessories', price:39.99,  emoji:'🥤', badge:null,         badgeType:null,     desc:'Double-wall vacuum insulation keeps your drink cold for 24 hours, or hot for 6. DuraCoat colour that won\'t peel or crack. Dishwasher safe.',                     rating:4.6, reviews:9800 },
  { id:'p10', name:'Kindle Paperwhite',       cat:'Electronics', price:139.99, emoji:'📖', badge:'Sale',       badgeType:'forest', desc:'Our most popular Kindle — now waterproof. 300 ppi glare-free display, 3-month battery life, and 6.8" screen with adjustable warm light.',                        rating:4.8, reviews:6540 },
];

const CATEGORIES = ['Footwear','Electronics','Apparel','Accessories','Home'];
const CAT_ICONS  = { Footwear:'👟', Electronics:'🎧', Apparel:'👕', Accessories:'🕶️', Home:'🏠' };

// ─── UTILITIES ──────────────────────────────────────────────
function fmt(n) { return '$' + Number(n).toFixed(2); }
function stars(r) {
  const full = Math.floor(r), half = r % 1 >= .5;
  return '★'.repeat(full) + (half ? '½' : '');
}
function genId() { return 'ORD-' + Date.now().toString(36).toUpperCase(); }

// ─── CART ────────────────────────────────────────────────────
function cartGet()       { return JSON.parse(localStorage.getItem('shop_cart') || '[]'); }
function cartSave(c)     { localStorage.setItem('shop_cart', JSON.stringify(c)); cartUpdateUI(); }
function cartTotal(c)    { return c.reduce((s,i) => s + i.price * i.qty, 0); }
function cartCount(c)    { return c.reduce((s,i) => s + i.qty, 0); }

function cartAdd(id, qty = 1) {
  const c = cartGet();
  const p = PRODUCTS.find(x => x.id === id);
  const ex = c.find(x => x.id === id);
  if (ex) ex.qty += qty; else c.push({ ...p, qty });
  cartSave(c);
  console.log(p,"Product");
  umerang.track({
    eventType: "Add to Cart",
    customProperties: {
      currency: "USD",
      product_id: p.id,
      product_name: p.name,
      price: p.price,
      quantity: qty
    }
  });
}
function cartRemove(id) {
  cartSave(cartGet().filter(x => x.id !== id));
}
function cartUpdateQty(id, qty) {
  if (qty < 1) { cartRemove(id); return; }
  const c = cartGet();
  const item = c.find(x => x.id === id);
  if (item) { item.qty = qty; cartSave(c); }
}
function cartClear() { cartSave([]); }

// ─── ABANDONED CART ─────────────────────────────────────────
function trackAbandonedCart() {
  const cart = cartGet();
  if (cart.length === 0) return;
  umerang.track({
    eventType: "abandoned_cart",
    customProperties: {
      currency: "USD",
      cart: cartTotal(cart).toFixed(2),
      item: cart.reduce((s, i) => s + i.qty, 0),
      items: cart.map(i => ({
        product: i.id,
        name: i.name,
        price: i.price,
        quantity: i.qty
      }))
    }
  });
}

function cartUpdateUI() {
  const count = cartCount(cartGet());
  document.querySelectorAll('.cart-num').forEach(el => el.textContent = count);
}

// ─── PRODUCT CARD HTML ───────────────────────────────────────
function productCardHTML(p) {
  const badgeHTML = p.badge
    ? `<div class="pc-badge"><span class="badge badge-${p.badgeType}">${p.badge}</span></div>` : '';
  return `
    <div class="product-card" onclick="goProduct('${p.id}')">
      <div class="pc-img">
        ${badgeHTML}
        ${p.emoji}
      </div>
      <div class="pc-body">
        <div class="pc-cat">${p.cat}</div>
        <div class="pc-name">${p.name}</div>
        <div class="pc-stars">${stars(p.rating)} <span>(${p.reviews.toLocaleString()})</span></div>
        <div class="pc-price">${fmt(p.price)}</div>
        <div class="pc-actions">
          <button class="btn btn-ink btn-sm" style="flex:1" onclick="event.stopPropagation();cartAdd('${p.id}');showCartToast('${p.name}')">Add to Cart</button>
          <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();goProduct('${p.id}')">View →</button>
        </div>
      </div>
    </div>`;
}

// ─── TOAST ───────────────────────────────────────────────────
function showCartToast(name) {
  const existing = document.getElementById('cart-toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.id = 'cart-toast';
  t.style.cssText = `
    position:fixed;bottom:28px;left:50%;transform:translateX(-50%);
    background:#1c1917;color:#fff;padding:13px 22px;border-radius:10px;
    font-size:.875rem;font-weight:500;z-index:9999;
    box-shadow:0 8px 32px rgba(0,0,0,.25);
    animation:fadeUp .25s ease;white-space:nowrap;
  `;
  t.innerHTML = `✓ <strong>${name}</strong> added to cart`;
  document.body.appendChild(t);
  const style = document.createElement('style');
  style.textContent = `@keyframes fadeUp{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`;
  document.head.appendChild(style);
  setTimeout(() => t.remove(), 2400);
}

// ─── NAVIGATION ─────────────────────────────────────────────
function goHome()       { window.location.href = 'index.html'; }
function goProducts(cat){ window.location.href = cat ? `products.html?cat=${cat}` : 'products.html'; }
function goProduct(id)  { window.location.href = `product.html?id=${id}`; }
function goCart()       { window.location.href = 'cart.html'; }
function goCheckout()   {
  sessionStorage.setItem('went_to_checkout', 'true');
  window.location.href = 'checkout.html';
}
function goSuccess(id)  { window.location.href = `success.html?order=${id}`; }
function goAuth()       { window.location.href = 'auth.html'; }
function goSearch(q)    { window.location.href = `search.html?q=${encodeURIComponent(q)}`; }

// ─── SHARED NAVBAR ───────────────────────────────────────────
function renderNav(activePage) {
  const pages = [
    { key:'home',     label:'Home',     href:'index.html' },
    { key:'products', label:'Products', href:'products.html' },
    { key:'auth',     label:'Account',  href:'auth.html' },
  ];
  return `
    <nav class="navbar">
      <div class="nav-logo" onclick="goHome()">Shop<em>Now</em></div>
      <div class="nav-links">
        ${pages.map(p => `<a href="${p.href}" class="${p.key===activePage?'active':''}">${p.label}</a>`).join('')}
      </div>
      <div class="nav-right">
        <form class="nav-search-wrap" onsubmit="handleNavSearch(event)">
          <input type="text" id="nav-q" placeholder="Search products…"/>
          <button type="submit">🔍</button>
        </form>
        <button class="cart-btn" onclick="goCart()">
          🛒 Cart <span class="cart-num">0</span>
        </button>
      </div>
    </nav>`;
}

function handleNavSearch(e) {
  e.preventDefault();
  const q = document.getElementById('nav-q').value.trim();
  if (q) goSearch(q);
}

function renderFooter() {
  return `<footer class="footer"><p>© 2025 <strong>ShopNow</strong> — Demo e-commerce store for analytics validation.</p></footer>`;
}

// Init cart count on every page
document.addEventListener('DOMContentLoaded', cartUpdateUI);

// ─── ABANDONED CART LISTENER ────────────────────────────────
// Only runs on cart.html
if (window.location.pathname.includes('cart.html')) {
  window.addEventListener('beforeunload', function () {
    const wentToCheckout = sessionStorage.getItem('went_to_checkout');
    if (!wentToCheckout) {
      trackAbandonedCart();
    }
    sessionStorage.removeItem('went_to_checkout');
  });
}


