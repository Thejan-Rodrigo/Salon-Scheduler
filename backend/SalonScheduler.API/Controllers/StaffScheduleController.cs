using Microsoft.AspNetCore.Mvc;
using SalonScheduler.API.Data;
using SalonScheduler.API.DTOs;
using SalonScheduler.API.Models;
using Microsoft.AspNetCore.Authorization;

namespace SalonScheduler.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StaffScheduleController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public StaffScheduleController(
        ApplicationDbContext context)
    {
        _context = context;
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> CreateSchedule(
        [FromBody] CreateStaffScheduleRequest request)
    {
        var schedule = new StaffSchedule
        {
            Id = Guid.NewGuid(),
            StaffId = request.StaffId,
            DayOfWeek = request.DayOfWeek,
            StartTime = request.StartTime,
            EndTime = request.EndTime,
            IsWorkingDay = request.IsWorkingDay
        };

        _context.StaffSchedules.Add(schedule);

        await _context.SaveChangesAsync();

        return Ok(schedule);
    }
}