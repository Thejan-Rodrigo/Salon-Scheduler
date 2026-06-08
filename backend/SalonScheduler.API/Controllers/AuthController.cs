using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using SalonScheduler.API.Data;
using SalonScheduler.API.DTOs;
using SalonScheduler.API.Models;

namespace SalonScheduler.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AuthController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var existingUser = _context.Users
            .FirstOrDefault(u => u.Email == request.Email);

        if (existingUser != null)
        {
            return BadRequest("Email already exists.");
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Role = "Customer",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            Message = "User registered successfully"
        });
    }
}