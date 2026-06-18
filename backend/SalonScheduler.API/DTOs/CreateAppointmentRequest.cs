namespace SalonScheduler.API.DTOs;

public class CreateAppointmentRequest
{
    public Guid ServiceId { get; set; }
    public Guid StaffId { get; set; }
    public DateTime AppointmentDate { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set;}
}