using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalonScheduler.API.Data;
using SalonScheduler.API.DTOs;
using SalonScheduler.API.Models;

namespace SalonScheduler.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AppointmentController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AppointmentController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("my")]
    public async Task<IActionResult> GetMyAppointments()
    {
        // 1. Get user id from JWT
        var userId = User.Claims
            .FirstOrDefault(c => c.Type ==
                System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

        if (userId == null)
            return Unauthorized();

        var customerId = Guid.Parse(userId);

        // 2. Get appointments
        var appointments = await _context.Appointments
            .Include(a => a.Service)
            .Include(a => a.Staff)
            .Where(a => a.CustomerId == customerId)
            .ToListAsync();

        // 3. Map to DTO
        var result = appointments.Select(a => new AppointmentResponse
        {
            Id = a.Id,
            ServiceName = a.Service.Name,
            StaffName = a.Staff.FirstName + " " + a.Staff.LastName,
            StartTime = a.StartTime,
            EndTime = a.EndTime,
            Status = a.Status
        });

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> BookAppointment([FromBody] CreateAppointmentRequest request)
    {
        var userId = User.Claims.FirstOrDefault(c => 
            c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

        if (userId == null)
            return Unauthorized();

        var appointment = new Appointment
        {
            Id = Guid.NewGuid(),
            CustomerId = Guid.Parse(userId),
            ServiceId = request.ServiceId,
            AppointmentDate = request.AppointmentDate,
            Status = "Pending"
        };

        _context.Appointments.Add(appointment);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Appointment booked successfully",
            appointment.Id
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> CancelAppointment(Guid id)
    {
        // Get logged-in user id
        var userId = User.Claims
            .FirstOrDefault(c => c.Type ==
                System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

        if (userId == null)
            return Unauthorized();

        var customerId = Guid.Parse(userId);

        // Find appointment
        var appointment = await _context.Appointments
            .FirstOrDefaultAsync(a =>
                a.Id == id &&
                a.CustomerId == customerId);

        if (appointment == null)
        {
            return NotFound("Appointment not found");
        }

        appointment.Status = AppointmentStatus.Cancelled;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Appointment cancelled successfully"
        });
    }
}