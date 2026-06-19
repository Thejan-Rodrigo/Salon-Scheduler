using Microsoft.AspNetCore.Mvc;
using SalonScheduler.API.Data;
using SalonScheduler.API.DTOs;
using SalonScheduler.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

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

    [HttpGet("{staffId}")]
    public async Task<IActionResult> GetSchedules(Guid staffId)
    {
        var schedules = await _context.StaffSchedules
            .Where(s => s.StaffId == staffId)
            .OrderBy(s => s.DayOfWeek)
            .ToListAsync();

        return Ok(schedules);
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

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSchedule(
        Guid id,
        [FromBody] UpdateStaffScheduleRequest request)
    {
        var schedule = await _context.StaffSchedules
            .FirstOrDefaultAsync(s => s.Id == id);

        if (schedule == null)
        {
            return NotFound("Schedule not found");
        }

        schedule.DayOfWeek = request.DayOfWeek;
        schedule.StartTime = request.StartTime;
        schedule.EndTime = request.EndTime;
        schedule.IsWorkingDay = request.IsWorkingDay;

        await _context.SaveChangesAsync();

        return Ok(schedule);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSchedule(Guid id)
    {
        var schedule = await _context.StaffSchedules
            .FirstOrDefaultAsync(s => s.Id == id);

        if (schedule == null)
        {
            return NotFound("Schedule not found");
        }

        _context.StaffSchedules.Remove(schedule);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Schedule deleted successfully"
        });
    }
}