using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StyleNest.Api.Data;
using StyleNest.Api.Models;

namespace StyleNest.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _db;

    public OrdersController(AppDbContext db)
    {
        _db = db;
    }

    // POST /api/orders
    // Body: { customerName, email, shippingAddress, items: [{ productId, color, size, quantity }] }
    [HttpPost]
    public async Task<ActionResult<OrderConfirmationDto>> Create([FromBody] CreateOrderRequest request)
    {
        if (request.Items == null || request.Items.Count == 0)
        {
            return BadRequest("An order needs at least one item.");
        }

        var order = new Order
        {
            CustomerName = request.CustomerName,
            Email = request.Email,
            ShippingAddress = request.ShippingAddress,
            CreatedAt = DateTime.UtcNow
        };

        decimal subtotal = 0;

        foreach (var itemRequest in request.Items)
        {
            var product = await _db.Products.FindAsync(itemRequest.ProductId);
            if (product == null)
            {
                return BadRequest($"Product {itemRequest.ProductId} does not exist.");
            }
            if (itemRequest.Quantity < 1)
            {
                return BadRequest("Quantity must be at least 1.");
            }

            var lineTotal = product.Price * itemRequest.Quantity;
            subtotal += lineTotal;

            order.Items.Add(new OrderItem
            {
                ProductId = product.Id,
                ProductName = product.Name,
                Price = product.Price, // snapshot the price at the time of order
                Color = itemRequest.Color,
                Size = itemRequest.Size,
                Quantity = itemRequest.Quantity
            });
        }

        order.Subtotal = subtotal;
        order.Shipping = subtotal > 0 ? 5.00m : 0;
        order.Total = order.Subtotal + order.Shipping;

        _db.Orders.Add(order);
        await _db.SaveChangesAsync();

        return Ok(new OrderConfirmationDto
        {
            OrderId = order.Id,
            Subtotal = order.Subtotal,
            Shipping = order.Shipping,
            Total = order.Total,
            CreatedAt = order.CreatedAt
        });
    }

    // GET /api/orders/5
    // Useful for an order confirmation screen, or for the "order history"
    // feature mentioned as a future extension.
    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetById(int id)
    {
        var order = await _db.Orders.Include(o => o.Items).FirstOrDefaultAsync(o => o.Id == id);
        if (order == null) return NotFound();
        return Ok(order);
    }
}
