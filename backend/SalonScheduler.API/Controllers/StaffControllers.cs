using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalonScheduler.API.Data;
using SalonScheduler.API.Models;
using SalonScheduler.API.DTOs;

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

    [HttpGet("{staffId}/availability")]
    public async Task<IActionResult> GetAvailability(
        Guid staffId,
        DateTime date)
    {
        // Working hours
        var workStart = date.Date.AddHours(9);
        var workEnd = date.Date.AddHours(17);

        // Existing appointments
        var appointments = await _context.Appointments
            .Where(a =>
                a.StaffId == staffId &&
                a.StartTime.Date == date.Date &&
                a.Status != "Cancelled")
            .ToListAsync();

        var availableSlots = new List<string>();

        var current = workStart;

        while (current < workEnd)
        {
            var slotEnd = current.AddMinutes(30);

            var overlap = appointments.Any(a =>
                current < a.EndTime &&
                slotEnd > a.StartTime);

            if (!overlap)
            {
                availableSlots.Add(
                    current.ToString("HH:mm"));
            }

            current = current.AddMinutes(30);
        }

        return Ok(new AvailabilityResponse
        {
            AvailableSlots = availableSlots
        });
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