namespace StyleNest.Api.Models;

// What the front end actually receives for a product — images/features
// as real arrays instead of the raw JSON strings stored in the database.
public class ProductDto
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Tag { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal? OldPrice { get; set; }
    public string? Discount { get; set; }
    public int Stars { get; set; }
    public int Reviews { get; set; }
    public string Description { get; set; } = string.Empty;
    public List<string> Images { get; set; } = new();
    public List<string> Features { get; set; } = new();
    public int Stock { get; set; }
}

// What the front end sends when the cart is submitted at checkout.
public class CreateOrderRequest
{
    public string CustomerName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string ShippingAddress { get; set; } = string.Empty;
    public List<CreateOrderItemRequest> Items { get; set; } = new();
}

public class CreateOrderItemRequest
{
    public int ProductId { get; set; }
    public string Color { get; set; } = string.Empty;
    public string Size { get; set; } = string.Empty;
    public int Quantity { get; set; }
}

// What the API sends back after an order is placed.
public class OrderConfirmationDto
{
    public int OrderId { get; set; }
    public decimal Subtotal { get; set; }
    public decimal Shipping { get; set; }
    public decimal Total { get; set; }
    public DateTime CreatedAt { get; set; }
}
