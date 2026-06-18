namespace SalonScheduler.API.Models;

public class StaffSchedule
{
    public Guid Id { get; set; }

    public Guid StaffId { get; set; }

    public Staff Staff { get; set; } = null!;

    public DayOfWeek DayOfWeek { get; set; }

    public TimeSpan StartTime { get; set; }

    public TimeSpan EndTime { get; set; }

    public bool IsWorkingDay { get; set; } = true;
}