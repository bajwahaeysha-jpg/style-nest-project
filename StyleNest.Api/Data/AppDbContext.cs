using Microsoft.EntityFrameworkCore;
using StyleNest.Api.Models;

namespace StyleNest.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>()
            .HasIndex(p => p.Slug)
            .IsUnique();

        modelBuilder.Entity<Order>()
            .HasMany(o => o.Items)
            .WithOne(i => i.Order)
            .HasForeignKey(i => i.OrderId);

        // Store decimals with 2 decimal places (SQLite doesn't enforce this itself,
        // but it keeps EF Core's understanding of the column consistent).
        modelBuilder.Entity<Product>().Property(p => p.Price).HasPrecision(10, 2);
        modelBuilder.Entity<Product>().Property(p => p.OldPrice).HasPrecision(10, 2);
        modelBuilder.Entity<Order>().Property(o => o.Subtotal).HasPrecision(10, 2);
        modelBuilder.Entity<Order>().Property(o => o.Shipping).HasPrecision(10, 2);
        modelBuilder.Entity<Order>().Property(o => o.Total).HasPrecision(10, 2);
        modelBuilder.Entity<OrderItem>().Property(i => i.Price).HasPrecision(10, 2);
    }
}
