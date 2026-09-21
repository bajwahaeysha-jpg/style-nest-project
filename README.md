# Style.Nest

Two pieces:

- **`style-nest/`** \u2014 the storefront (HTML/CSS/JS). Just open
  `index.html` in a browser \u2014 works completely on its own, no setup
  needed. Product data is a hardcoded JS object.

- **`StyleNest.Api/`** \u2014 an ASP.NET Core Web API (C#) with the same
  product data in a real SQLite database, plus an endpoint to place
  orders. See `StyleNest.Api/README.md` to run it.

## How they connect

`style-nest/js/script.js` tries the API first (`http://localhost:5080`)
every time the product detail page or checkout loads. If the API isn't
running, it quietly falls back to its own hardcoded data so the site
never breaks. Run both at once to see the real thing:

1. `cd StyleNest.Api && dotnet restore && dotnet run` (leave this running)
2. Open `style-nest/index.html` in a browser, browse to any product,
   add it to your cart, and hit Checkout on the cart page

With the API running, that Checkout click sends a real `POST
/api/orders` and the order lands in `stylenest.db`. Without it, the
front end still works exactly as before.

## Note on the product data

Because this sandbox couldn't reach NuGet to install packages, the
`.NET` project was written by hand and has **not been built or run
yet**. Run `dotnet restore` locally (with an internet connection) before
`dotnet run` for the first time.
