namespace SalonScheduler.API.DTOs;

public class CreateStaffScheduleRequest
{
    public Guid StaffId { get; set; }

    public DayOfWeek DayOfWeek { get; set; }

    public TimeSpan StartTime { get; set; }

    public TimeSpan EndTime { get; set; }

    public bool IsWorkingDay { get; set; }
}