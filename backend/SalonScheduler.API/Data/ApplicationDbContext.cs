using Microsoft.EntityFrameworkCore;
using SalonScheduler.API.Models;

namespace SalonScheduler.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
}