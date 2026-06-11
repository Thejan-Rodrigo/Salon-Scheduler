using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalonScheduler.API.Data;
using SalonScheduler.API.Models;

namespace SalonScheduler.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StaffController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public StaffController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/staff
    [HttpGet]
    public async Task<IActionResult> GetStaff()
    {
        var staff = await _context.Staff.ToListAsync();

        return Ok(staff);
    }

  [HttpPost]
    public async Task<IActionResult> CreateStaff(
        [FromBody] CreateStaffRequest request)
    {
        var staff = new Staff
        {
            Id = Guid.NewGuid(),
            FirstName = request.firstName,
            LastName = request.lastName,
            PhoneNumber = request.email,
            Email = request.email
        };

        _context.Staff.Add(staff);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetStaff),
            new { id = staff.Id },
            staff
        );
    }
}