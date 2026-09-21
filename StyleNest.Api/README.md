# Style.Nest API

A small ASP.NET Core Web API backing the Style.Nest storefront: products
and orders, stored in a real SQLite database via Entity Framework Core.

## Requirements
- [.NET 8 SDK](https://dotnet.microsoft.com/download) installed locally
- Internet access the first time, so NuGet can download the packages
  (this project was written by hand in a sandbox with no NuGet access,
  so it has not been built/run yet — do that first on your own machine)

## Running it

```bash
cd StyleNest.Api
dotnet restore
dotnet run
```

On first run, it creates `stylenest.db` (a SQLite file, right in this
folder) and seeds it with the same 11 products the front end used to
hardcode. Open **http://localhost:5080/swagger** to see and try every
endpoint from the browser.

## Endpoints

| Method | Route | What it does |
|---|---|---|
| GET | `/api/products` | All products |
| GET | `/api/products?category=men` | Products filtered by category (`men`, `women`, `kids`) |
| GET | `/api/products/{slug}` | One product, e.g. `/api/products/yellow-puffer-jacket` |
| POST | `/api/orders` | Place an order (see body shape below) |
| GET | `/api/orders/{id}` | Look up a placed order |

**POST /api/orders** body:
```json
{
  "customerName": "Ayesha",
  "email": "ayesha@example.com",
  "shippingAddress": "123 Example St",
  "items": [
    { "productId": 1, "color": "Yellow", "size": "M", "quantity": 1 }
  ]
}
```
`productId` is the numeric `id` from `/api/products` (not the slug).

## Project structure

```
StyleNest.Api/
  Models/         Product, Order, OrderItem, and the request/response DTOs
  Data/           AppDbContext (EF Core) and SeedData (the 11 starter products)
  Controllers/    ProductsController, OrdersController
  Program.cs      wires everything together, enables CORS + Swagger
```

## Connecting it to the front end

The front end's `js/script.js` currently has a hardcoded `products`
object. To use this API instead, replace that object with a `fetch`
call to `http://localhost:5080/api/products` when each page loads, and
change the cart's "Checkout" button to `POST` to `/api/orders` instead
of just linking to the contact page. A version of `script.js` that does
exactly this — with a fallback to the old hardcoded data if the API
isn't running — is included in this zip under `style-nest/js/script.js`.

## Extending it further
- **Order history** — add `GET /api/orders?email=...` to look up a
  customer's past orders
- **Admin panel** — add `POST`/`PUT`/`DELETE` endpoints on
  `ProductsController` (currently read-only) plus a simple login, so
  products can be managed without editing the database directly
