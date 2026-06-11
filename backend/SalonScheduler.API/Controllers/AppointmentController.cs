using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
}