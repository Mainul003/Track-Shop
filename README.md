# ShopNow — Demo E-commerce Store

A clean, fully functional e-commerce site. No tracking code. Pure HTML/CSS/JS.

## Pages

| File | URL | Description |
|------|-----|-------------|
| `index.html` | `/` | Homepage — hero, categories, featured products, newsletter |
| `products.html` | `/products.html` | All products with category filter & sort |
| `product.html` | `/product.html?id=p01` | Product detail — qty selector, add to cart, buy now |
| `cart.html` | `/cart.html` | Cart — update qty, remove items, clear cart, coupon |
| `checkout.html` | `/checkout.html` | 3-step checkout — contact, shipping, payment |
| `success.html` | `/success.html?order=ORD-XXX` | Order confirmation |
| `auth.html` | `/auth.html` | Sign up / Login / Social auth buttons |
| `search.html` | `/search.html?q=nike` | Search results |

## Products (10 total)

| ID | Product | Category | Price |
|----|---------|----------|-------|
| p01 | Nike Air Max 90 | Footwear | $129.99 |
| p02 | Adidas UltraBoost 22 | Footwear | $179.99 |
| p03 | Levi's 501 Original | Apparel | $69.99 |
| p04 | Apple AirPods Pro | Electronics | $249.99 |
| p05 | Sony WH-1000XM5 | Electronics | $349.99 |
| p06 | Patagonia Fleece Jacket | Apparel | $124.99 |
| p07 | Ray-Ban Aviator Classic | Accessories | $149.99 |
| p08 | Dyson V15 Detect | Home | $699.99 |
| p09 | Yeti Rambler Tumbler | Accessories | $39.99 |
| p10 | Kindle Paperwhite | Electronics | $139.99 |

## Deploy to Cloudflare Pages

1. Push this folder to a GitHub repository
2. Go to https://pages.cloudflare.com/
3. **Create a project** → Connect your GitHub repo
4. Build settings: **none** (Framework preset: None, Build command: empty, Output directory: `/`)
5. Click **Save and Deploy**

## File Structure

```
/
├── index.html        ← Homepage
├── products.html     ← Product listing
├── product.html      ← Product detail
├── cart.html         ← Shopping cart
├── checkout.html     ← Checkout (3 steps)
├── success.html      ← Order confirmation
├── auth.html         ← Sign up / Login
├── search.html       ← Search results
├── _redirects        ← Cloudflare clean URLs
├── css/
│   └── main.css      ← All styles
└── js/
    └── app.js        ← Products, cart logic, shared components
```

## Cart Persistence
Cart is stored in `localStorage` — persists across page refreshes and navigation.

## User Flows

- **Product view**: Home → Products → click product → product detail page
- **Add to cart**: Any product card "Add to Cart" button or product detail page
- **Checkout**: Cart → Checkout (3 steps: contact → shipping → payment) → Success
- **Search**: Nav search bar → search results page  
- **Filter**: Products page filter bar by category
- **Auth**: Sign Up / Login / Social auth (Google, Facebook, Apple) on auth.html
- **Newsletter**: Subscribe form on homepage
