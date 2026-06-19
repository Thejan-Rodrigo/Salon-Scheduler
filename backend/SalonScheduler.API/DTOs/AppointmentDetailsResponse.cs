namespace SalonScheduler.API.DTOs;

public class AppointmentDetailsResponse
{
    public Guid Id { get; set; }

    public string CustomerName { get; set; } = string.Empty;

    public string StaffName { get; set; } = string.Empty;

    public string ServiceName { get; set; } = string.Empty;

    public decimal ServicePrice { get; set; }

    public DateTime AppointmentDate { get; set; }

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }

    public string Status { get; set; } = string.Empty;
}