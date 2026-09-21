namespace StyleNest.Api.Models;

// One row per product in the store. This mirrors the product data
// that used to live as a hardcoded object in the front end's script.js.
public class Product
{
    public int Id { get; set; }

    // URL-friendly id used by the front end, e.g. "yellow-puffer-jacket"
    public string Slug { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;
    public string Tag { get; set; } = string.Empty;          // "NEW ARRIVAL", "BESTSELLER", etc.
    public string Category { get; set; } = string.Empty;      // "men" | "women" | "kids"

    public decimal Price { get; set; }
    public decimal? OldPrice { get; set; }
    public string? Discount { get; set; }                     // "32% OFF" or null

    public int Stars { get; set; }
    public int Reviews { get; set; }

    public string Description { get; set; } = string.Empty;

    // Stored as JSON strings in the database (SQLite has no native array type)
    public string ImagesJson { get; set; } = "[]";
    public string FeaturesJson { get; set; } = "[]";

    public int Stock { get; set; } = 50;
}
