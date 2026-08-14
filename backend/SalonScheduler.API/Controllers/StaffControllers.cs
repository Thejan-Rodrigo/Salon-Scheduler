using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalonScheduler.API.Data;
using SalonScheduler.API.Models;
using SalonScheduler.API.DTOs;
using Microsoft.AspNetCore.Authorization;

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
        var staff = await _context.Staff
        .Where(s => s.IsActive)
        .ToListAsync();

        return Ok(staff);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetStaff(Guid id)
    {
        var staff = await _context.Staff
            .FirstOrDefaultAsync(s => s.Id == id);

        if (staff == null)
        {
            return NotFound(new
            {
                Message = "Staff member not found"
            });
        }

        return Ok(staff);
    }

    [HttpGet("{staffId}/availability")]
    public async Task<IActionResult> GetAvailability(
        Guid staffId,
        DateTime date)
    {
        var schedule = await _context.StaffSchedules
            .FirstOrDefaultAsync(s =>
                s.StaffId == staffId &&
                s.DayOfWeek == date.DayOfWeek &&
                s.IsWorkingDay);

        if (schedule == null)
        {
            return Ok(new AvailabilityResponse
            {
                AvailableSlots = new List<string>()
            });
        }


        // Working hours
        var workStart =
            date.Date.Add(schedule.StartTime);

        var workEnd =
            date.Date.Add(schedule.EndTime);

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

    [HttpGet("{staffId}/appointments")]
    public async Task<IActionResult> GetStaffAppointments(Guid staffId)
    {
        var staffExists = await _context.Staff
            .AnyAsync(s => s.Id == staffId);

        if (!staffExists)
        {
            return NotFound(new
            {
                Message = "Staff member not found"
            });
        }

        var appointments = await _context.Appointments
            .Include(a => a.Customer)
            .Include(a => a.Service)
            .Where(a => a.StaffId == staffId)
            .OrderBy(a => a.StartTime)
            .Select(a => new StaffAppointmentResponse
            {
                Id = a.Id,

                CustomerName =
                    a.Customer.FirstName + " " +
                    a.Customer.LastName,

                ServiceName = a.Service.Name,

                StartTime = a.StartTime,

                EndTime = a.EndTime,

                Status = a.Status
            })
            .ToListAsync();

        return Ok(appointments);
    }

    [Authorize(Roles = "Admin")]
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
            Email = request.email,
            CreatedAt = DateTime.UtcNow
        };

        _context.Staff.Add(staff);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetStaff),
            new { id = staff.Id },
            staff
        );
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateStaff(
        Guid id,
        [FromBody] UpdateStaffRequest request)
    {
        var staff = await _context.Staff
            .FirstOrDefaultAsync(s => s.Id == id);

        if (staff == null)
        {
            return NotFound(new
            {
                Message = "Staff member not found"
            });
        }

        staff.FirstName = request.FirstName;
        staff.LastName = request.LastName;
        staff.Email = request.Email;
        staff.PhoneNumber = request.PhoneNumber;

        await _context.SaveChangesAsync();

        return Ok(staff);
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStaff(Guid id)
    {
        var staff = await _context.Staff
            .FirstOrDefaultAsync(s => s.Id == id);

        if (staff == null)
        {
            return NotFound(new
            {
                Message = "Staff member not found"
            });
        }

        staff.IsActive = false;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Staff member deactivated successfully"
        });
    }
}