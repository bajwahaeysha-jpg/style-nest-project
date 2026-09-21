using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StyleNest.Api.Data;
using StyleNest.Api.Models;

namespace StyleNest.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ProductsController(AppDbContext db)
    {
        _db = db;
    }

    // GET /api/products
    // GET /api/products?category=men
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetAll([FromQuery] string? category)
    {
        var query = _db.Products.AsQueryable();

        if (!string.IsNullOrWhiteSpace(category) && category.ToLower() != "all")
        {
            query = query.Where(p => p.Category == category.ToLower());
        }

        var products = await query.ToListAsync();
        return Ok(products.Select(ToDto));
    }

    // GET /api/products/yellow-puffer-jacket
    [HttpGet("{slug}")]
    public async Task<ActionResult<ProductDto>> GetBySlug(string slug)
    {
        var product = await _db.Products.FirstOrDefaultAsync(p => p.Slug == slug);
        if (product == null) return NotFound();
        return Ok(ToDto(product));
    }

    private static ProductDto ToDto(Product p) => new()
    {
        Id = p.Id,
        Slug = p.Slug,
        Name = p.Name,
        Tag = p.Tag,
        Category = p.Category,
        Price = p.Price,
        OldPrice = p.OldPrice,
        Discount = p.Discount,
        Stars = p.Stars,
        Reviews = p.Reviews,
        Description = p.Description,
        Images = JsonSerializer.Deserialize<List<string>>(p.ImagesJson) ?? new(),
        Features = JsonSerializer.Deserialize<List<string>>(p.FeaturesJson) ?? new(),
        Stock = p.Stock
    };
}
