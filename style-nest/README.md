# Style.Nest

A small front-end eCommerce storefront for jackets and hoodies, built with
plain HTML, CSS and JavaScript — no frameworks, no build step.

## Pages
- `index.html` — home page with hero banner and featured products
- `shop.html` — full product catalog with Men / Women / Kids filters
- `product.html` — product detail page (image gallery, color/size options, quantity)
- `cart.html` — shopping cart (stored in the browser's localStorage)
- `about.html`, `contact.html` — basic info pages

## How it works
- `css/style.css` — all styling, written by hand (no Bootstrap/Tailwind)
- `js/script.js` — all interactivity: mobile nav toggle, category filtering,
  add-to-cart, image gallery, color/size selection, quantity stepper, and
  cart rendering. The cart is saved in `localStorage`, so it's per-browser
  and resets if storage is cleared.
- `assets/images/` — product photos

## Running it
No install or build needed — just open `index.html` in a browser, or serve
the folder with any static file server.

## Notes
- There's no backend, database, or real payment processing — "Checkout"
  and the contact form are front-end only.
- Product images are stand-in stock photos.
