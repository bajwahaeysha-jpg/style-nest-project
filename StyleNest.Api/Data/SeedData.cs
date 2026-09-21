using System.Text.Json;
using StyleNest.Api.Models;

namespace StyleNest.Api.Data;

public static class SeedData
{
    // Populates an empty database with the same products the front end
    // used to hardcode in script.js, so the API has real data on first run.
    public static void EnsureSeeded(AppDbContext db)
    {
        if (db.Products.Any()) return; // already seeded

        var products = new List<Product>
        {
            Make("yellow-puffer-jacket", "Yellow Puffer Jacket", "NEW ARRIVAL", "women",
                94.99m, 139.99m, "32% OFF", 5, 142,
                "A bold, oversized puffer jacket in sunshine yellow. Roomy through the body with a stand-up hood, it's built to be the brightest thing on the street on a grey day.",
                new[] { "assets/images/yellow-1.jpg", "assets/images/yellow-2.jpg", "assets/images/yellow-3.jpg", "assets/images/yellow-4.jpg" },
                new[] { "Water-resistant shell fabric", "Oversized, relaxed fit", "Stand-up hood with zip closure", "Side pockets with snap flaps", "Available in multiple colors" }),

            Make("cobalt-puffer-jacket", "Cobalt Puffer Jacket", "NEW ARRIVAL", "men",
                109.99m, 149.99m, "27% OFF", 5, 98,
                "A rich cobalt-blue puffer with a full hood and a clean, structured silhouette \u2014 warm enough for winter streets, sharp enough for everyday wear.",
                new[] { "assets/images/blue-1.jpg", "assets/images/blue-2.jpg", "assets/images/blue-3.jpg" },
                new[] { "Heavyweight insulated fill", "Full drawstring hood", "Ribbed inner cuffs", "Snap and zip front closure", "Available in multiple colors" }),

            Make("summit-green-puffer-jacket", "Summit Green Puffer Jacket", "BESTSELLER", "men",
                119.99m, null, null, 5, 87,
                "A deep forest-green puffer built for cold commutes and outdoor days alike, with a tall protective collar and a hood roomy enough to layer over a beanie.",
                new[] { "assets/images/green-1.jpg", "assets/images/green-2.jpg", "assets/images/green-3.jpg" },
                new[] { "Windproof, water-resistant shell", "Tall storm collar with hood", "Reinforced side pockets", "Adjustable hood drawstring", "Available in multiple colors" }),

            Make("onyx-puffer-jacket", "Onyx Puffer Jacket", "TOP RATED", "women",
                104.99m, 129.99m, "19% OFF", 5, 176,
                "A sleek, all-black puffer jacket with a soft-lined hood \u2014 an easy layer that goes with everything and disappears into any outfit.",
                new[] { "assets/images/black-1.jpg", "assets/images/black-2.jpg" },
                new[] { "Soft-touch matte shell", "Fleece-lined hood", "Slimmer tailored fit", "Interior zip pocket", "Available in multiple colors" }),

            Make("classic-red-hoodie", "Classic Red Hoodie", "BESTSELLER", "men",
                59.99m, null, null, 4, 98,
                "A relaxed, everyday hoodie in bold red with a soft fleece lining and an adjustable drawstring hood \u2014 built for comfort on cool days.",
                new[] { "assets/images/product-1.jpg" },
                new[] { "Soft brushed fleece interior", "Adjustable drawstring hood", "Kangaroo front pocket", "Ribbed cuffs and hem", "Machine washable" }),

            Make("forest-green-hoodie", "Forest Green Hoodie", "BESTSELLER", "women",
                64.99m, null, null, 4, 76,
                "A deep forest-green hoodie with a clean printed graphic \u2014 an easy layering piece for everyday wear.",
                new[] { "assets/images/product-2.jpg" },
                new[] { "Midweight cotton-blend fabric", "Front graphic print", "Relaxed unisex fit", "Adjustable drawstring hood", "Machine washable" }),

            Make("alpine-blue-hoodie", "Alpine Blue Hoodie", "TOP RATED", "men",
                54.99m, null, null, 5, 112,
                "A crisp periwinkle-blue hoodie designed for outdoor days \u2014 lightweight enough to layer, warm enough to wear alone.",
                new[] { "assets/images/product-3.jpg" },
                new[] { "Lightweight fleece blend", "Roomy front pocket", "Adjustable drawstring hood", "Reinforced stitching", "Machine washable" }),

            Make("shadow-hoodie", "Shadow Hoodie", "NEW ARRIVAL", "men",
                49.99m, null, null, 4, 54,
                "A muted charcoal hoodie with subtle tonal detailing \u2014 an easy piece that pairs with almost everything in your closet.",
                new[] { "assets/images/product-4.jpg" },
                new[] { "Heavyweight cotton fleece", "Tonal embroidered logo", "Adjustable drawstring hood", "Ribbed cuffs and hem", "Machine washable" }),

            Make("glacier-hoodie", "Glacier Hoodie", "KIDS FAVORITE", "kids",
                39.99m, null, null, 4, 41,
                "A bright, playful hoodie sized for kids who don't want to slow down \u2014 soft, durable, and easy to move in.",
                new[] { "assets/images/product-6.jpg" },
                new[] { "Soft brushed fleece interior", "Durable double-stitched seams", "Adjustable drawstring hood", "Kangaroo front pocket", "Machine washable" }),

            Make("lagoon-hoodie", "Lagoon Hoodie", "TOP RATED", "women",
                57.99m, null, null, 5, 89,
                "An oversized teal hoodie dress with a relaxed drape \u2014 easy to throw on and just as easy to love.",
                new[] { "assets/images/product-7.jpg" },
                new[] { "Oversized relaxed fit", "Soft midweight fleece", "Adjustable drawstring hood", "Dropped shoulder seams", "Machine washable" }),

            Make("skyline-hoodie", "Skyline Hoodie", "KIDS FAVORITE", "kids",
                44.99m, null, null, 4, 33,
                "A light sky-blue hoodie in a soft, breathable fabric \u2014 easy to wear from morning to evening.",
                new[] { "assets/images/product-8.jpg" },
                new[] { "Lightweight breathable fabric", "Adjustable drawstring hood", "Kangaroo front pocket", "Ribbed cuffs and hem", "Machine washable" }),
        };

        db.Products.AddRange(products);
        db.SaveChanges();
    }

    private static Product Make(
        string slug, string name, string tag, string category,
        decimal price, decimal? oldPrice, string? discount, int stars, int reviews,
        string description, string[] images, string[] features)
    {
        return new Product
        {
            Slug = slug,
            Name = name,
            Tag = tag,
            Category = category,
            Price = price,
            OldPrice = oldPrice,
            Discount = discount,
            Stars = stars,
            Reviews = reviews,
            Description = description,
            ImagesJson = JsonSerializer.Serialize(images),
            FeaturesJson = JsonSerializer.Serialize(features),
            Stock = 50
        };
    }
}
