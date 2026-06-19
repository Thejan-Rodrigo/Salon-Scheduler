using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalonScheduler.API.Data;
using SalonScheduler.API.DTOs;

namespace SalonScheduler.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class DashboardController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public DashboardController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var today = DateTime.Today;

        var totalAppointments =
            await _context.Appointments.CountAsync();

        var todayAppointments =
            await _context.Appointments.CountAsync(a =>
                a.StartTime.Date == today);

        var completedAppointments =
            await _context.Appointments.CountAsync(a =>
                a.Status == AppointmentStatus.Completed);

        var cancelledAppointments =
            await _context.Appointments.CountAsync(a =>
                a.Status == AppointmentStatus.Cancelled);

        var totalRevenue =
            await _context.Appointments
                .Where(a => a.Status == AppointmentStatus.Completed)
                .Include(a => a.Service)
                .SumAsync(a => a.Service.Price);

        var stats = new DashboardStatsResponse
        {
            TotalAppointments = totalAppointments,
            TodayAppointments = todayAppointments,
            CompletedAppointments = completedAppointments,
            CancelledAppointments = cancelledAppointments,
            TotalRevenue = totalRevenue
        };

        return Ok(stats);
    }
}