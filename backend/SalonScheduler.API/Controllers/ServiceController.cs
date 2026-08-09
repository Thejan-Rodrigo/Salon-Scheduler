using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using SalonScheduler.API.Data;
using SalonScheduler.API.Models;
using SalonScheduler.API.DTOs;

namespace SalonScheduler.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServiceController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ServiceController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/service
    [HttpGet]
    public async Task<IActionResult> GetServices()
    {
        var services = await _context.Services.ToListAsync();

        return Ok(services);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetService(Guid id)
    {
        var service = await _context.Services
            .FirstOrDefaultAsync(s => s.Id == id);

        if (service == null)
        {
            return NotFound("Service not found");
        }

        return Ok(service);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> CreateService(
        [FromBody] CreateServiceRequest request)
    {
        var service = new Service
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Price = request.Price,
            DurationMinutes = request.DurationMinutes,
            CreatedAt = DateTime.UtcNow
        };

        _context.Services.Add(service);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetServices),
            new { id = service.Id },
            service
        );
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateService(
        Guid id,
        [FromBody] UpdateServiceRequest request)
    {
        var service = await _context.Services
            .FirstOrDefaultAsync(s => s.Id == id);

        if (service == null)
        {
            return NotFound("Service not found");
        }

        service.Name = request.Name;
        service.Price = request.Price;
        service.DurationMinutes = request.DurationMinutes;

        await _context.SaveChangesAsync();

        return Ok(service);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteService(Guid id)
    {
        var service = await _context.Services
            .FirstOrDefaultAsync(s => s.Id == id);

        if (service == null)
        {
            return NotFound("Service not found");
        }

        service.IsActive = false;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Service deactivated successfully"
        });
    }
}