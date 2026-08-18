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
            return Unauthorized(new
            {
                message = "Your session is invalid or has expired. Please log in again."
            });

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

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAppointment(Guid id)
    {
        var appointment = await _context.Appointments
            .Include(a => a.Customer)
            .Include(a => a.Staff)
            .Include(a => a.Service)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (appointment == null)
        {
            return NotFound(new
            {
                message = "Appointment not found"
            });
        }

        var response = new AppointmentDetailsResponse
        {
            Id = appointment.Id,

            CustomerName =
                $"{appointment.Customer.FirstName} {appointment.Customer.LastName}",

            StaffName =
                $"{appointment.Staff.FirstName} {appointment.Staff.LastName}",

            ServiceName = appointment.Service.Name,

            ServicePrice = appointment.Service.Price,

            AppointmentDate = appointment.AppointmentDate,

            StartTime = appointment.StartTime,

            EndTime = appointment.EndTime,

            Status = appointment.Status
        };

        return Ok(response);
    }

    [HttpGet("today")]
    public async Task<IActionResult> GetTodayAppointments()
    {
        var today = DateTime.Today;

        var appointments = await _context.Appointments
            .Include(a => a.Customer)
            .Include(a => a.Staff)
            .Include(a => a.Service)
            .Where(a => a.StartTime.Date == today)
            .OrderBy(a => a.StartTime)
            .Select(a => new TodayAppointmentResponse
            {
                Id = a.Id,

                CustomerName =
                    a.Customer.FirstName + " " +
                    a.Customer.LastName,

                StaffName =
                    a.Staff.FirstName + " " +
                    a.Staff.LastName,

                ServiceName = a.Service.Name,

                StartTime = a.StartTime,

                EndTime = a.EndTime,

                Status = a.Status
            })
            .ToListAsync();

        return Ok(appointments);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("all")]
    public async Task<IActionResult> GetAllAppointments()
    {
        var appointments = await _context.Appointments
            .Include(a => a.Customer)
            .Include(a => a.Staff)
            .Include(a => a.Service)
            .OrderBy(a => a.StartTime)
            .ToListAsync();

        var result = appointments.Select(a => new AppointmentAdminResponse
        {
            Id = a.Id,

            CustomerName =
                a.Customer.FirstName + " " + a.Customer.LastName,

            StaffName =
                a.Staff.FirstName + " " + a.Staff.LastName,

            ServiceName = a.Service.Name,

            StartTime = a.StartTime,

            EndTime = a.EndTime,

            Status = a.Status
        });

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> BookAppointment(
    [FromBody] CreateAppointmentRequest request)
    {
        var userId = User.Claims.FirstOrDefault(c =>
            c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

        if (userId == null)
        {
            return Unauthorized(new
            {
                message = "Your session is invalid or has expired. Please log in again."
            });
        }

        // Validate Staff ID
        var staffExists = await _context.Staff
            .AnyAsync(s => s.Id == request.StaffId);

        if (!staffExists)
        {
            return BadRequest(new
            {
                message = "Invalid staff ID."
            });
        }

        // Validate Service ID
        var serviceExists = await _context.Services
            .AnyAsync(s => s.Id == request.ServiceId);

        if (!serviceExists)
        {
            return BadRequest(new
            {
                message = "Invalid service ID."
            });
        }

        var appointment = new Appointment
        {
            Id = Guid.NewGuid(),
            CustomerId = Guid.Parse(userId),
            ServiceId = request.ServiceId,
            StaffId = request.StaffId,
            AppointmentDate = request.AppointmentDate,
            StartTime = request.StartTime,
            EndTime = request.EndTime,
            CreatedAt = DateTime.UtcNow,
            Notes = request.Notes,
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

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatus(
        Guid id,
        [FromBody] UpdateAppointmentStatusRequest request)
    {
        var appointment = await _context.Appointments
            .FirstOrDefaultAsync(a => a.Id == id);

        if (appointment == null)
        {
            return NotFound(new
            {
                message = "Appointment not found"
            });
        }

        var validStatuses = new[]
        {
            AppointmentStatus.Pending,
            AppointmentStatus.Confirmed,
            AppointmentStatus.Completed,
            AppointmentStatus.Cancelled
        };

        if (!validStatuses.Contains(request.Status))
        {
            return BadRequest("Invalid status");
        }

        appointment.Status = request.Status;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Appointment status updated successfully",
            appointment.Id,
            appointment.Status
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

        var appointment = await _context.Appointments
            .FirstOrDefaultAsync(a =>
                a.Id == id);

        if (appointment == null)
        {
            return NotFound(new
            {
                message = "Appointment not found"
            });
        }

        appointment.Status = AppointmentStatus.Cancelled;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Appointment cancelled successfully"
        });
    }
}